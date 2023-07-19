/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';
import { useLocalStorageState } from '@woocommerce/base-hooks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	productsReplacementUnsubscribe,
	MIGRATION_STATUS_LS_KEY,
} from '../../migration-products-to-product-collection';

const FormattedNotice = ( { notice }: { notice: string } ) => {
	const strongText = 'Product Collection';
	const [ before, after ] = notice.split( strongText );

	return (
		<>
			{ before }
			<strong>{ strongText }</strong>
			{ after }
		</>
	);
};

type UpgradeNoticeState = 'notseen' | 'seeing' | 'seen' | 'reverted';
type UpgradeNotice = {
	state: UpgradeNoticeState;
	clientId?: string;
};
type UpgradeNoticeProps = {
	clientId: string;
	isSelected: boolean;
	revertMigration: () => void;
};
const initialUpgradeNoticeState = { status: 'notseen' };
const UpgradeNotice = ( {
	clientId,
	isSelected,
	revertMigration,
}: UpgradeNoticeProps ) => {
	const [ upgradeNoticeState, setUpgradeNoticeState ] =
		useLocalStorageState< UpgradeNoticeState >(
			MIGRATION_STATUS_LS_KEY,
			initialUpgradeNoticeState
		);

	const { status, clientId: statusClientId } = upgradeNoticeState;
	const notice = __(
		'Products (Beta) block was upgraded to Product Collection, an updated version with new features and simplified settings.',
		'woo-gutenberg-products-block'
	);

	const buttonLabel = __(
		'Revert to Products (Beta)',
		'woo-gutenberg-products-block'
	);

	useEffect( () => {
		if ( status === 'notseen' && isSelected ) {
			setUpgradeNoticeState( {
				status: 'seeing',
				clientId,
			} );
			return;
		}

		if (
			status === 'seeing' &&
			clientId === statusClientId &&
			! isSelected
		) {
			setUpgradeNoticeState( {
				status: 'seen',
				clientId,
			} );
			return;
		}

		if ( status === 'seen' ) {
			return;
		}

		if ( status === 'reverted' ) {
			if ( productsReplacementUnsubscribe ) {
				console.info(
					'Unsubscribed and disallow further Products block migration'
				);
				productsReplacementUnsubscribe();
			}
			revertMigration();
		}
	}, [
		statusClientId,
		clientId,
		isSelected,
		status,
		upgradeNoticeState,
		setUpgradeNoticeState,
		revertMigration,
	] );

	const handleRemove = () => {
		setUpgradeNoticeState( {
			status: 'seen',
			clientId,
		} );
	};

	const handleClick = () => {
		setUpgradeNoticeState( {
			status: 'reverted',
			clientId,
		} );
	};

	return status === 'notseen' || status === 'seeing' ? (
		<Notice onRemove={ handleRemove }>
			<FormattedNotice notice={ notice } />
			<br />
			<br />
			<Button variant="link" onClick={ handleClick }>
				{ buttonLabel }
			</Button>
		</Notice>
	) : null;
};

export default UpgradeNotice;

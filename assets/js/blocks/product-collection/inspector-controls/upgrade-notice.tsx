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
import { productsReplacementUnsubscribe } from '../../migration-products-to-product-collection';

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
	id?: string;
};
type UpgradeNoticeProps = {
	clientId: string;
	isSelected: boolean;
	revertMigration: () => void;
};
const initialUpgradeNoticeState = { state: 'notseen' };
const UpgradeNotice = ( {
	clientId,
	isSelected,
	revertMigration,
}: UpgradeNoticeProps ) => {
	const [ upgradeNoticeState, setUpgradeNoticeState ] =
		useLocalStorageState< UpgradeNoticeState >(
			`wc-blocks_upgraded-products-to-product-collection`,
			initialUpgradeNoticeState
		);

	const { state, id } = upgradeNoticeState;
	const notice = __(
		'Products (Beta) block was upgraded to Product Collection, an updated version with new features and simplified settings.',
		'woo-gutenberg-products-block'
	);

	const buttonLabel = __(
		'Revert to Products (Beta)',
		'woo-gutenberg-products-block'
	);

	useEffect( () => {
		if ( state === 'notseen' && isSelected ) {
			setUpgradeNoticeState( {
				state: 'seeing',
				id: clientId,
			} );
			return;
		}

		if ( state === 'seeing' && clientId === id && ! isSelected ) {
			setUpgradeNoticeState( {
				state: 'seen',
				id: clientId,
			} );
			return;
		}

		if ( state === 'seen' ) {
			return;
		}

		if ( state === 'reverted' ) {
			if ( productsReplacementUnsubscribe ) {
				console.info(
					'Unsubscribed and disallow further Products block migration'
				);
				productsReplacementUnsubscribe();
			}
			revertMigration();
		}
	}, [
		id,
		clientId,
		isSelected,
		state,
		upgradeNoticeState,
		setUpgradeNoticeState,
		revertMigration,
	] );

	const handleRemove = () => {
		setUpgradeNoticeState( {
			state: 'seen',
			id: clientId,
		} );
	};

	const handleClick = () => {
		setUpgradeNoticeState( {
			state: 'reverted',
			id: clientId,
		} );
	};

	return state === 'notseen' || state === 'seeing' ? (
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

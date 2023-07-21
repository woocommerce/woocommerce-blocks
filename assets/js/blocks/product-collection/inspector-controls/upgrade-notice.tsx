/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';
import { useLocalStorageState } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import {
	MIGRATION_STATUS_LS_KEY,
	INITIAL_STATUS_LS_VALUE,
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

type UpgradeNoticeProps = {
	revertMigration: () => void;
};

const UpgradeNotice = ( { revertMigration }: UpgradeNoticeProps ) => {
	const [ upgradeNoticeStatus, setUpgradeNoticeStatus ] =
		useLocalStorageState(
			MIGRATION_STATUS_LS_KEY,
			INITIAL_STATUS_LS_VALUE
		);
	const { status } = upgradeNoticeStatus;

	const notice = __(
		'Products (Beta) block was upgraded to Product Collection, an updated version with new features and simplified settings.',
		'woo-gutenberg-products-block'
	);

	const buttonLabel = __(
		'Revert to Products (Beta)',
		'woo-gutenberg-products-block'
	);

	const handleRemove = () => {
		setUpgradeNoticeStatus( {
			status: 'seen',
		} );
	};

	const handleRevert = () => {
		revertMigration();
	};

	return status === 'notseen' ? (
		<Notice onRemove={ handleRemove }>
			<FormattedNotice notice={ notice } />
			<br />
			<br />
			<Button variant="link" onClick={ handleRevert }>
				{ buttonLabel }
			</Button>
		</Notice>
	) : null;
};

export default UpgradeNotice;

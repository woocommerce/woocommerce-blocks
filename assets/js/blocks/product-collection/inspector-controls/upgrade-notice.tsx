/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, Button } from '@wordpress/components';
import { useLocalStorageState } from '@woocommerce/base-hooks';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	MIGRATION_STATUS_LS_KEY,
	INITIAL_STATUS_LS_VALUE,
} from '../../migration-products-to-product-collection';

const notice = createInterpolateElement(
	__(
		'Products (Beta) block was upgraded to <strongText />, an updated version with new features and simplified settings.',
		'woo-gutenberg-products-block'
	),
	{
		strongText: (
			<strong>
				{ __( `Product Collection`, 'woo-gutenberg-products-block' ) }
			</strong>
		),
	}
);

const buttonLabel = __(
	'Revert to Products (Beta)',
	'woo-gutenberg-products-block'
);

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
			<>{ notice } </>
			<br />
			<br />
			<Button variant="link" onClick={ handleRevert }>
				{ buttonLabel }
			</Button>
		</Notice>
	) : null;
};

export default UpgradeNotice;

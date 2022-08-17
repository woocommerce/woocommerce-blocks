/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Warning } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const UpdateFilterHeadingsPrompt = ( { onClick } ) => {
	const actions = [
		<Button key="upgrade" onClick={ onClick } variant="primary">
			{ __( 'Upgrade block', 'woo-gutenberg-products-block' ) }
		</Button>,
	];

	return (
		<Warning
			actions={ actions }
			className="wc-block-components-filter-update-heading"
		>
			{ __(
				'This block is outdated. Please upgrade to the latest version!',
				'woo-gutenberg-products-block'
			) }
		</Warning>
	);
};

export default UpdateFilterHeadingsPrompt;

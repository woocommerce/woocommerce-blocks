/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Warning } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const UpdateFilterHeadingsPrompt = ( { onClick } ) => {
	const actions = [
		<Button key="update" onClick={ onClick } variant="primary">
			{ __( 'Update block', 'woo-gutenberg-products-block' ) }
		</Button>,
	];

	return (
		<Warning actions={ actions }>
			{ __(
				'This block has been updated!',
				'woo-gutenberg-products-block'
			) }
		</Warning>
	);
};

export default UpdateFilterHeadingsPrompt;

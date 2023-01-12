/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

export const BlockSettings = () => {
	return (
		<InspectorControls key="inspector">
			<PanelBody
				title={ __(
					'Display settings',
					'woo-gutenberg-products-block'
				) }
			/>
		</InspectorControls>
	);
};

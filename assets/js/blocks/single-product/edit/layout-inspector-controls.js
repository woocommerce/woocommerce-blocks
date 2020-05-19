/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, IconButton } from '@wordpress/components';
import { Icon, restore } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import SharedProductControl from './shared-product-control';

/**
 * Inspector controls shown when editing the layout.
 */
const LayoutInspectorControls = ( { attributes, setAttributes, onReset } ) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Product', 'woo-gutenberg-products-block' ) }
				initialOpen={ false }
			>
				<SharedProductControl
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
				initialOpen={ true }
			>
				<IconButton
					icon={ <Icon srcElement={ restore } /> }
					label={ __(
						'Reset layout to default',
						'woo-gutenberg-products-block'
					) }
					onClick={ onReset }
				>
					{ __( 'Reset layout', 'woo-gutenberg-products-block' ) }
				</IconButton>
			</PanelBody>
		</InspectorControls>
	);
};

export default LayoutInspectorControls;

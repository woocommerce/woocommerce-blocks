/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	Disabled,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import { gridBlockPreview } from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import { Props } from './types';
import { ProductsByAttributeInspectorControls } from './inspector-controls';
import { ProductsByAttributeEditMode } from './edit-mode';

/**
 * Component to handle edit mode of "Products by Attribute".
 */
const ProductsByAttributeBlock = ( props: Props ): JSX.Element => {
	const { attributes, name, setAttributes } = props;
	const { editMode } = attributes;

	if ( attributes.isPreview ) {
		return gridBlockPreview;
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit selected attribute',
								'woo-gutenberg-products-block'
							),
							onClick: () =>
								setAttributes( { editMode: ! editMode } ),
							isActive: editMode,
						},
					] }
				/>
			</BlockControls>
			<ProductsByAttributeInspectorControls { ...props } />
			{ editMode ? (
				<ProductsByAttributeEditMode { ...props } />
			) : (
				<Disabled>
					<ServerSideRender
						block={ name }
						attributes={ attributes }
					/>
				</Disabled>
			) }
		</>
	);
};

export default withSpokenMessages( ProductsByAttributeBlock );

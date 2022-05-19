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
import { HandpickedProductsInspectorControls } from './inspector-controls';
import { HandpickedProductsEditMode } from './edit-mode';

const ProductsBlock = ( props: Props ): JSX.Element => {
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
								'Edit selected products',
								'woo-gutenberg-products-block'
							),
							onClick: () =>
								setAttributes( { editMode: ! editMode } ),
							isActive: editMode,
						},
					] }
				/>
			</BlockControls>
			<HandpickedProductsInspectorControls { ...props } />
			{ editMode ? (
				<HandpickedProductsEditMode { ...props } />
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

export default withSpokenMessages( ProductsBlock );

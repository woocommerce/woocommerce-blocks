/**
 * External dependencies
 */
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import { Props } from './types';
import { ProductsByAttributeInspectorControls } from './inspector-controls';
import { ProductsByAttributeEditMode } from './edit-mode';
import { ProductsByAttributeBlock } from './block';

export const Edit = ( props: Props ): JSX.Element => {
	const blockProps = useBlockProps();

	const { attributes, setAttributes } = props;
	const { editMode } = attributes;

	return (
		<div { ...blockProps }>
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
					<ProductsByAttributeBlock { ...props } />
				</Disabled>
			) }
		</div>
	);
};

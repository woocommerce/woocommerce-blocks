/**
 * External dependencies
 */
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled, ToolbarGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
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

	const [ isEditing, setIsEditing ] = useState( false );

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
							onClick: () => setIsEditing( ! isEditing ),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
			<ProductsByAttributeInspectorControls { ...props } />
			{ isEditing ? (
				<ProductsByAttributeEditMode
					isEditing={ isEditing }
					setIsEditing={ setIsEditing }
					{ ...props }
				/>
			) : (
				<Disabled>
					<ProductsByAttributeBlock { ...props } />
				</Disabled>
			) }
		</div>
	);
};

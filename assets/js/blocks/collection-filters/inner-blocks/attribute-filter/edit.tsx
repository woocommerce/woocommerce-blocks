/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { getSetting } from '@woocommerce/settings';
import { useCollection } from '@woocommerce/base-context/hooks';
import { AttributeSetting, AttributeTerm } from '@woocommerce/types';
import {
	Disabled,
	Button,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { EditProps } from './types';
import {
	NoAttributesPlaceholder,
	AttributesPlaceholder,
} from './components/placeholder';
import { AttributeSelectControls } from './components/attribute-select-controls';
import { getAttributeFromId } from './utils';
import { Inspector } from './components/inspector-controls';
import { AttributeCheckboxList } from './components/attribute-checkbox-list';
import { AttributeDropdown } from './components/attribute-dropdown';
import './style.scss';

const ATTRIBUTES = getSetting< AttributeSetting[] >( 'attributes', [] );

const Edit = ( props: EditProps ) => {
	const {
		attributes: blockAttributes,
		setAttributes,
		debouncedSpeak,
	} = props;

	const { attributeId, queryType, isPreview, displayStyle, showCounts } =
		blockAttributes;

	const attributeObject = getAttributeFromId( attributeId );

	const [ isEditing, setIsEditing ] = useState(
		! attributeId && ! isPreview
	);

	const { results: attributeTerms } = useCollection< AttributeTerm >( {
		namespace: '/wc/store/v1',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeObject?.id || 0 ],
		shouldSelect: blockAttributes.attributeId > 0,
		query: { orderby: 'menu_order' },
	} );

	const blockProps = useBlockProps();

	useEffect( () => {
		setAttributes( {
			queryParam: {
				calculate_attribute_counts: [
					{
						taxonomy: attributeObject?.taxonomy || '',
						queryType,
					},
				],
			},
		} );
	}, [ queryType, setAttributes, attributeObject?.taxonomy ] );

	const Toolbar = () => (
		<BlockControls>
			<ToolbarGroup
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit', 'woo-gutenberg-products-block' ),
						onClick: () => setIsEditing( ! isEditing ),
						isActive: isEditing,
					},
				] }
			/>
		</BlockControls>
	);

	const AttributeSelectPlaceholder = () => (
		<AttributesPlaceholder>
			<div className="wc-block-attribute-filter__selection">
				<AttributeSelectControls
					isCompact={ false }
					attributeId={ attributeId }
					setAttributes={ setAttributes }
				/>
				<Button
					isPrimary
					onClick={ () => {
						setIsEditing( false );
						debouncedSpeak(
							__(
								'Now displaying a preview of the Filter Products by Attribute block.',
								'woo-gutenberg-products-block'
							)
						);
					} }
				>
					{ __( 'Done', 'woo-gutenberg-products-block' ) }
				</Button>
			</div>
		</AttributesPlaceholder>
	);

	// Block rendering starts.
	if ( Object.keys( ATTRIBUTES ).length === 0 )
		return <NoAttributesPlaceholder />;

	return (
		<div { ...blockProps }>
			<Toolbar />
			<Inspector { ...props } />
			{ isEditing ? (
				<AttributeSelectPlaceholder />
			) : (
				<Disabled>
					{ displayStyle === 'dropdown' ? (
						<AttributeDropdown
							attributeObject={ attributeObject }
						/>
					) : (
						<AttributeCheckboxList
							showCounts={ showCounts }
							attributeTerms={ attributeTerms }
						/>
					) }{ ' ' }
				</Disabled>
			) }
		</div>
	);
};

export default withSpokenMessages( Edit );

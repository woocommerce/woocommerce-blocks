/**
 * External dependencies
 */
import { sort } from 'fast-sort';
import { __, sprintf, _n } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { Icon, category, external } from '@wordpress/icons';
import { SearchListControl } from '@woocommerce/editor-components/search-list-control';
import { getAdminLink, getSetting } from '@woocommerce/settings';
import BlockTitle from '@woocommerce/editor-components/block-title';
import classnames from 'classnames';
import { SearchListItem } from '@woocommerce/editor-components/search-list-control/types';
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';
import {
	AttributeSetting,
	AttributeQuery,
	AttributeTerm,
	isAttributeQueryCollection,
	isBoolean,
	isString,
	objectHasProp,
} from '@woocommerce/types';
import {
	Placeholder,
	Disabled,
	PanelBody,
	ToggleControl,
	Button,
	ToolbarGroup,
	Notice,
	withSpokenMessages,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';
import { UpgradeNotice } from '../filter-wrapper/upgrade';
import type { EditProps } from './types';
import {
	NoAttributesPlaceholder,
	AttributesPlaceholder,
} from './components/placeholder';
import { AttributeSelectControls } from './components/attribute-select-controls';
import { getAttributeFromId } from './utils';
import { Inspector } from './components/inspector-controls';

const ATTRIBUTES = getSetting< AttributeSetting[] >( 'attributes', [] );

const Edit = ( {
	attributes: blockAttributes,
	setAttributes,
	debouncedSpeak,
}: EditProps ) => {
	const { attributeId, queryType, isPreview } = blockAttributes;

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

	if ( Object.keys( ATTRIBUTES ).length === 0 )
		return <NoAttributesPlaceholder />;

	if ( isEditing )
		return (
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

	return (
		<div { ...blockProps }>
			<Toolbar />
			<Inspector
				attributes={ blockAttributes }
				setAttributes={ setAttributes }
			/>
			Collection Attribute Filter
		</div>
	);
};

export default withSpokenMessages( Edit );

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import { Icon, category } from '@wordpress/icons';
import GridContentControl from '@woocommerce/editor-components/grid-content-control';
import GridLayoutControl from '@woocommerce/editor-components/grid-layout-control';
import ProductAttributeTermControl from '@woocommerce/editor-components/product-attribute-term-control';
import ProductOrderbyControl from '@woocommerce/editor-components/product-orderby-control';
import ProductStockControl from '@woocommerce/editor-components/product-stock-control';
import { gridBlockPreview } from '@woocommerce/resource-previews';
import { getSetting } from '@woocommerce/settings';

/**
 * Component to handle edit mode of "Products by Attribute".
 */
const ProductsByAttributeBlock = ( props: Props ): JSX.Element => {
	const getInspectorControls = () => {
		const { setAttributes } = props;
		const {
			attributes,
			attrOperator,
			columns,
			contentVisibility,
			orderby,
			rows,
			alignButtons,
			stockStatus,
		} = props.attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridLayoutControl
						columns={ columns }
						rows={ rows }
						alignButtons={ alignButtons }
						setAttributes={ setAttributes }
						minColumns={ getSetting( 'min_columns', 1 ) }
						maxColumns={ getSetting( 'max_columns', 6 ) }
						minRows={ getSetting( 'min_rows', 1 ) }
						maxRows={ getSetting( 'max_rows', 6 ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridContentControl
						settings={ contentVisibility }
						onChange={ ( value ) =>
							setAttributes( { contentVisibility: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Filter by Product Attribute',
						'woo-gutenberg-products-block'
					) }
					initialOpen={ false }
				>
					<ProductAttributeTermControl
						selected={ attributes }
						onChange={ ( value = [] ) => {
							const result = value.map(
								( { id, attr_slug: attributeSlug } ) => ( {
									id,
									attr_slug: attributeSlug,
								} )
							);
							setAttributes( { attributes: result } );
						} }
						operator={ attrOperator }
						onOperatorChange={ ( value = 'any' ) =>
							setAttributes( { attrOperator: value } )
						}
						isCompact={ true }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Order By', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductOrderbyControl
						setAttributes={ setAttributes }
						value={ orderby }
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Filter by stock status',
						'woo-gutenberg-products-block'
					) }
					initialOpen={ false }
				>
					<ProductStockControl
						setAttributes={ setAttributes }
						value={ stockStatus }
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const renderEditMode = () => {
		const { debouncedSpeak, setAttributes } = props;
		const blockAttributes = props.attributes;
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__(
					'Showing Products by Attribute block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <Icon icon={ category } /> }
				label={ __(
					'Products by Attribute',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-products-grid wc-block-products-by-attribute"
			>
				{ __(
					'Display a grid of products from your selected attributes.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-products-by-attribute__selection">
					<ProductAttributeTermControl
						selected={ blockAttributes.attributes }
						onChange={ ( value = [] ) => {
							const result = value.map(
								( { id, attr_slug: attributeSlug } ) => ( {
									id,
									attr_slug: attributeSlug,
								} )
							);
							setAttributes( { attributes: result } );
						} }
						operator={ blockAttributes.attrOperator }
						onOperatorChange={ ( value = 'any' ) =>
							setAttributes( { attrOperator: value } )
						}
					/>
					<Button isPrimary onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	};

	const render = () => {
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
				{ getInspectorControls() }
				{ editMode ? (
					renderEditMode()
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

	return render();
};

interface Attributes {
	align?: string;
	attributes: Array< string >;
	attrOperator: string;
	columns: number;
	editMode: boolean;
	contentVisibility: {
		image: boolean;
		title: boolean;
		price: boolean;
		rating: boolean;
		button: boolean;
	};
	orderby: string;
	rows: number;
	alignButtons: boolean;
	isPreview: boolean;
	stockStatus: Array< string >;
}

interface Props {
	/**
	 * The attributes for this block
	 */
	attributes: Attributes;
	/**
	 * The register block name.
	 */
	name: string;
	/**
	 * A callback to update attributes
	 */
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	// from withSpokenMessages
	debouncedSpeak: ( message: string ) => void;
}

export default withSpokenMessages( ProductsByAttributeBlock );

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
	RangeControl,
	ToolbarGroup,
	withSpokenMessages,
	ToggleControl,
} from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';
import GridContentControl from '@woocommerce/editor-components/grid-content-control';
import ProductsControl from '@woocommerce/editor-components/products-control';
import ProductOrderbyControl from '@woocommerce/editor-components/product-orderby-control';
import { gridBlockPreview } from '@woocommerce/resource-previews';
import { Icon, stack } from '@wordpress/icons';

const ProductsBlock = ( props: Props ): JSX.Element => {
	const getInspectorControls = () => {
		const { attributes, setAttributes } = props;
		const {
			columns,
			contentVisibility,
			orderby,
			alignButtons,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<RangeControl
						label={ __(
							'Columns',
							'woo-gutenberg-products-block'
						) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ getSetting( 'min_columns', 1 ) }
						max={ getSetting( 'max_columns', 6 ) }
					/>
					<ToggleControl
						label={ __(
							'Align Buttons',
							'woo-gutenberg-products-block'
						) }
						help={
							alignButtons
								? __(
										'Buttons are aligned vertically.',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Buttons follow content.',
										'woo-gutenberg-products-block'
								  )
						}
						checked={ alignButtons }
						onChange={ () =>
							setAttributes( { alignButtons: ! alignButtons } )
						}
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
					title={ __( 'Order By', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductOrderbyControl
						setAttributes={ setAttributes }
						value={ orderby }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Products', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductsControl
						selected={ attributes.products }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { products: ids } );
						} }
						isCompact={ true }
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const renderEditMode = () => {
		const { attributes, debouncedSpeak, setAttributes } = props;
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__(
					'Showing Hand-picked Products block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <Icon icon={ stack } /> }
				label={ __(
					'Hand-picked Products',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-products-grid wc-block-handpicked-products"
			>
				{ __(
					'Display a selection of hand-picked products in a grid.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-handpicked-products__selection">
					<ProductsControl
						selected={ attributes.products }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { products: ids } );
						} }
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
	products: Array< number >;
	alignButtons: boolean;
	isPreview: boolean;
}
/**
 * Component to handle edit mode of "Hand-picked Products".
 */
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

export default withSpokenMessages( ProductsBlock );

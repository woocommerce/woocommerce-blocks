/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { BlockControls, InspectorControls, PanelColorSettings, withColors } from '@wordpress/editor';
import {
	Button,
	PanelBody,
	Placeholder,
	RangeControl,
	Spinner,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { IconStar } from '../../components/icons';
import ProductControl from '../../components/product-control';

// Copied from core/cover, updated for product.
function backgroundImageStyles( { images = [] } ) {
	if ( images.length ) {
		const url = images[ 0 ].src;
		return { backgroundImage: `url(${ url })` };
	}
	return {};
}

function dimRatioToClass( ratio ) {
	return ratio === 0 || ratio === 50 ?
		null :
		`has-background-dim-${ 10 * Math.round( ratio / 10 ) }`;
}

/**
 * Component to handle edit mode of "Featured Product".
 */
class FeaturedProduct extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			product: false,
			loaded: false,
		};

		this.debouncedGetProduct = debounce( this.getProduct.bind( this ), 200 );
	}

	componentDidMount() {
		this.getProduct();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.attributes.productId !== this.props.attributes.productId ) {
			this.debouncedGetProduct();
		}
	}

	getProduct() {
		const { productId } = this.props.attributes;
		if ( ! productId ) {
			// We've removed the selected product, or no product is selected yet.
			this.setState( { product: false, loaded: true } );
			return;
		}
		apiFetch( {
			path: `/wc-pb/v3/products/${ productId }`,
		} )
			.then( ( product ) => {
				this.setState( { product, loaded: true } );
			} )
			.catch( () => {
				this.setState( { product: false, loaded: true } );
			} );
	}

	getInspectorControls() {
		const { attributes, setAttributes, overlayColor, setOverlayColor } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Product', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Overlay', 'woo-gutenberg-products-block' ) }
					initialOpen={ true }
					colorSettings={ [ {
						value: overlayColor.color,
						onChange: setOverlayColor,
						label: __( 'Overlay Color', 'woo-gutenberg-products-block' ),
					} ] }
				>
					<RangeControl
						label={ __( 'Background Opacity', 'woo-gutenberg-products-block' ) }
						value={ attributes.dimRatio }
						onChange={ ( ratio ) => setAttributes( { dimRatio: ratio } ) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				</PanelColorSettings>
			</InspectorControls>
		);
	}

	renderEditMode() {
		const { attributes, debouncedSpeak, setAttributes } = this.props;
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__(
					'Showing Featured Product block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <IconStar /> }
				label={ __( 'Featured Product', 'woo-gutenberg-products-block' ) }
				className="wc-block-featured-product"
			>
				{ __(
					'Visually highlight a product and encourage prompt action',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-handpicked-products__selection">
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	render() {
		const { attributes, setAttributes, overlayColor } = this.props;
		const { dimRatio, editMode } = attributes;
		const { loaded, product } = this.state;
		const classes = classnames(
			'wc-block-featured-product',
			{
				'is-loading': ! product && ! loaded,
				'is-not-found': ! product && loaded,
				'has-background-dim': dimRatio !== 0,
			},
			dimRatioToClass( dimRatio ),
		);

		const style = !! product ? backgroundImageStyles( product ) : {};
		if ( overlayColor.color ) {
			style.backgroundColor = overlayColor.color;
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={ [
							{
								icon: 'edit',
								title: __( 'Edit' ),
								onClick: () => setAttributes( { editMode: ! editMode } ),
								isActive: editMode,
							},
						] }
					/>
				</BlockControls>
				{ ! attributes.editMode && this.getInspectorControls() }
				{ editMode ? (
					this.renderEditMode()
				) : (
					<Fragment>
						{ !! product ? (
							<div className={ classes } style={ style }>
								<h2 className="wc-block-featured-product__title">{ product.name }</h2>
								<div
									className="wc-block-featured-product__description"
									dangerouslySetInnerHTML={ { __html: '<p>Black cotton top with matching striped skirt. <\/p>\n' } }
								/>
								<div
									className="wc-block-featured-product__price"
									dangerouslySetInnerHTML={ { __html: product.price_html } }
								/>
							</div>
						) : (
							<Placeholder
								className="wc-block-featured-product"
								icon={ <IconStar /> }
								label={ __( 'Featured Product', 'woo-gutenberg-products-block' ) }
							>
								{ ! loaded ? (
									<Spinner />
								) : (
									__( 'No product is selected.', 'woo-gutenberg-products-block' )
								) }
							</Placeholder>
						) }
					</Fragment>
				) }
			</Fragment>
		);
	}
}

FeaturedProduct.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
	// from withColors
	overlayColor: PropTypes.object,
	setOverlayColor: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
};

export default compose( [
	withColors( { overlayColor: 'background-color' } ),
	withSpokenMessages,
] )( FeaturedProduct );

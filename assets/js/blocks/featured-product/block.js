/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	withColors,
} from '@wordpress/editor';
import {
	Button,
	FocalPointPicker,
	IconButton,
	PanelBody,
	Placeholder,
	RangeControl,
	ResizableBox,
	Spinner,
	ToggleControl,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { MIN_HEIGHT } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import ProductControl from '../../components/product-control';
import ApiErrorPlaceholder from '../../components/api-error-placeholder';
import {
	dimRatioToClass,
	getBackgroundImageStyles,
} from './utils';
import {
	getImageSrcFromProduct,
	getImageIdFromProduct,
} from '../../utils/products';
import { withProduct } from '../../hocs';

/**
 * Component to handle edit mode of "Featured Product".
 */
const FeaturedProduct = ( { attributes, debouncedSpeak, error, getProduct, isLoading, isSelected, overlayColor, product, setAttributes, setOverlayColor } ) => {
	const renderApiError = () => (
		<ApiErrorPlaceholder
			className="wc-block-featured-product-error"
			error={ error }
			isLoading={ isLoading }
			onRetry={ getProduct }
		/>
	);

	const renderEditMode = () => {
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
			<Fragment>
				{ getBlockControls() }
				<Placeholder
					icon="star-filled"
					label={ __( 'Featured Product', 'woo-gutenberg-products-block' ) }
					className="wc-block-featured-product"
				>
					{ __(
						'Visually highlight a product or variation and encourage prompt action',
						'woo-gutenberg-products-block'
					) }
					<div className="wc-block-featured-product__selection">
						<ProductControl
							selected={ attributes.productId || 0 }
							onChange={ ( value = [] ) => {
								const id = value[ 0 ] ? value[ 0 ].id : 0;
								setAttributes( { productId: id, mediaId: 0, mediaSrc: '' } );
							} }
						/>
						<Button isDefault onClick={ onDone }>
							{ __( 'Done', 'woo-gutenberg-products-block' ) }
						</Button>
					</div>
				</Placeholder>
			</Fragment>
		);
	};

	const getBlockControls = () => {
		const { contentAlign, editMode } = attributes;
		const mediaId = attributes.mediaId || getImageIdFromProduct( product );

		return (
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { contentAlign: nextAlign } );
					} }
				/>
				<MediaUploadCheck>
					<Toolbar>
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( { mediaId: media.id, mediaSrc: media.url } );
							} }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit media' ) }
									icon="format-image"
									onClick={ open }
									disabled={ ! product }
								/>
							) }
						/>
					</Toolbar>
				</MediaUploadCheck>
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
		);
	};

	const getInspectorControls = () => {
		const url = attributes.mediaSrc || getImageSrcFromProduct( product );
		const { focalPoint = { x: 0.5, y: 0.5 } } = attributes;
		// FocalPointPicker was introduced in Gutenberg 5.0 (WordPress 5.2),
		// so we need to check if it exists before using it.
		const focalPointPickerExists = typeof FocalPointPicker === 'function';

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Show description', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showDesc }
						onChange={ () => setAttributes( { showDesc: ! attributes.showDesc } ) }
					/>
					<ToggleControl
						label={ __( 'Show price', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showPrice }
						onChange={ () => setAttributes( { showPrice: ! attributes.showPrice } ) }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Overlay', 'woo-gutenberg-products-block' ) }
					colorSettings={ [
						{
							value: overlayColor.color,
							onChange: setOverlayColor,
							label: __( 'Overlay Color', 'woo-gutenberg-products-block' ),
						},
					] }
				>
					{ !! url && (
						<Fragment>
							<RangeControl
								label={ __( 'Background Opacity', 'woo-gutenberg-products-block' ) }
								value={ attributes.dimRatio }
								onChange={ ( ratio ) => setAttributes( { dimRatio: ratio } ) }
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>
							{ focalPointPickerExists &&
								<FocalPointPicker
									label={ __( 'Focal Point Picker' ) }
									url={ url }
									value={ focalPoint }
									onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
								/>
							}
						</Fragment>
					) }
				</PanelColorSettings>
			</InspectorControls>
		);
	};

	const renderProduct = () => {
		const {
			className,
			contentAlign,
			dimRatio,
			focalPoint,
			height,
			showDesc,
			showPrice,
		} = attributes;
		const classes = classnames(
			'wc-block-featured-product',
			{
				'is-selected': isSelected,
				'is-loading': ! product && isLoading,
				'is-not-found': ! product && ! isLoading,
				'has-background-dim': dimRatio !== 0,
			},
			dimRatioToClass( dimRatio ),
			contentAlign !== 'center' && `has-${ contentAlign }-content`,
			className,
		);

		const style = getBackgroundImageStyles( attributes.mediaSrc || product );

		if ( overlayColor.color ) {
			style.backgroundColor = overlayColor.color;
		}
		if ( focalPoint ) {
			style.backgroundPosition = `${ focalPoint.x * 100 }% ${ focalPoint.y *
				100 }%`;
		}

		const onResizeStop = ( event, direction, elt ) => {
			setAttributes( { height: parseInt( elt.style.height ) } );
		};

		return (
			<ResizableBox
				className={ classes }
				size={ { height } }
				minHeight={ MIN_HEIGHT }
				enable={ { bottom: true } }
				onResizeStop={ onResizeStop }
				style={ style }
			>
				<div className="wc-block-featured-product__wrapper">
					<h2
						className="wc-block-featured-product__title"
						dangerouslySetInnerHTML={ {
							__html: product.name,
						} }
					/>
					{ ! isEmpty( product.variation ) && (
						<h3
							className="wc-block-featured-product__variation"
							dangerouslySetInnerHTML={ {
								__html: product.variation,
							} }
						/>
					) }
					{ showDesc && (
						<div
							className="wc-block-featured-product__description"
							dangerouslySetInnerHTML={ {
								__html: product.description,
							} }
						/>
					) }
					{ showPrice && (
						<div
							className="wc-block-featured-product__price"
							dangerouslySetInnerHTML={ { __html: product.price_html } }
						/>
					) }
					<div className="wc-block-featured-product__link">
						<InnerBlocks
							template={ [
								[
									'core/button',
									{
										text: __(
											'Shop now',
											'woo-gutenberg-products-block'
										),
										url: product.permalink,
										align: 'center',
									},
								],
							] }
							templateLock="all"
						/>
					</div>
				</div>
			</ResizableBox>
		);
	};

	const renderNoProduct = () => (
		<Placeholder
			className="wc-block-featured-product"
			icon="star-filled"
			label={ __( 'Featured Product', 'woo-gutenberg-products-block' ) }
		>
			{ isLoading ? (
				<Spinner />
			) : (
				__( 'No product is selected.', 'woo-gutenberg-products-block' )
			) }
		</Placeholder>
	);

	const { editMode } = attributes;

	if ( error ) {
		return renderApiError();
	}

	if ( editMode ) {
		return renderEditMode();
	}

	return (
		<Fragment>
			{ getBlockControls() }
			{ getInspectorControls() }
			{ product ? (
				renderProduct()
			) : (
				renderNoProduct()
			) }
		</Fragment>
	);
};

FeaturedProduct.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * Whether this block is currently active.
	 */
	isSelected: PropTypes.bool.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes.
	 */
	setAttributes: PropTypes.func.isRequired,
	// from withProduct
	error: PropTypes.object,
	getProduct: PropTypes.func,
	isLoading: PropTypes.bool,
	product: PropTypes.shape( {
		name: PropTypes.node,
		variation: PropTypes.node,
		description: PropTypes.node,
		price_html: PropTypes.node,
		permalink: PropTypes.string,
	} ),
	// from withColors
	overlayColor: PropTypes.object,
	setOverlayColor: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
};

export default compose( [
	withProduct,
	withColors( { overlayColor: 'background-color' } ),
	withSpokenMessages,
] )( FeaturedProduct );

/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	MediaReplaceFlow,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {
	Button,
	Placeholder,
	Spinner,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import ProductControl from '@woocommerce/editor-components/product-control';
import ErrorPlaceholder from '@woocommerce/editor-components/error-placeholder';
import TextToolbarButton from '@woocommerce/editor-components/text-toolbar-button';
import { withProduct } from '@woocommerce/block-hocs';
import { crop, Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { ConstrainedResizable } from '../constrained-resizable';
import { ImageEditor } from '../image-editor';
import { InspectorControls } from '../inspector-controls';
import { useSetup } from '../use-setup';
import { calculateBackgroundImagePosition, dimRatioToClass } from '../utils';
import { CallToAction } from '../call-to-action';

/**
 * Component to handle edit mode of "Featured Product".
 *
 * @param {Object}            props                  Incoming props for the component.
 * @param {Object}            props.attributes       Incoming block attributes.
 * @param {function(any):any} props.debouncedSpeak   Function for delayed speak.
 * @param {string}            props.error            Error message.
 * @param {function(any):any} props.getProduct       Function for getting the product.
 * @param {boolean}           props.isLoading        Whether product is loading or not.
 * @param {boolean}           props.isSelected       Whether block is selected or not.
 * @param {Object}            props.product          Product object.
 * @param {function(any):any} props.setAttributes    Setter for attributes.
 * @param {function():any}    props.triggerUrlUpdate Function for triggering a url update for product.
 */
const FeaturedProduct = ( {
	attributes,
	debouncedSpeak,
	error,
	getProduct,
	isLoading,
	isSelected,
	product,
	setAttributes,
	triggerUrlUpdate = () => void null,
} ) => {
	const { mediaId, mediaSrc } = attributes;

	const {
		backgroundImageId,
		backgroundImageSize,
		backgroundImageSrc,
		isEditingImage,
		onResize,
		setBackgroundImageSize,
		setGradient,
		setIsEditingImage,
	} = useSetup( {
		isSelected,
		mediaId,
		mediaSrc,
		metadata,
		setAttributes,
		item: product,
	} );

	const renderApiError = () => (
		<ErrorPlaceholder
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
			<>
				{ getBlockControls() }
				<Placeholder
					icon={ <Icon icon={ starEmpty } /> }
					label={ __(
						'Featured Product',
						'woo-gutenberg-products-block'
					) }
					className="wc-block-featured-product"
				>
					{ __(
						'Visually highlight a product or variation and encourage prompt action',
						'woo-gutenberg-products-block'
					) }
					<div className="wc-block-featured-product__selection">
						<ProductControl
							selected={ attributes.productId || 0 }
							showVariations
							onChange={ ( value = [] ) => {
								const id = value[ 0 ] ? value[ 0 ].id : 0;
								setAttributes( {
									productId: id,
									mediaId: 0,
									mediaSrc: '',
								} );
								triggerUrlUpdate();
							} }
						/>
						<Button isPrimary onClick={ onDone }>
							{ __( 'Done', 'woo-gutenberg-products-block' ) }
						</Button>
					</div>
				</Placeholder>
			</>
		);
	};

	const getBlockControls = () => {
		const { contentAlign, editMode } = attributes;

		return (
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { contentAlign: nextAlign } );
					} }
				/>
				<ToolbarGroup>
					{ backgroundImageSrc && ! isEditingImage && (
						<ToolbarButton
							onClick={ () => setIsEditingImage( true ) }
							icon={ crop }
							label={ __(
								'Edit product image',
								'woo-gutenberg-products-block'
							) }
						/>
					) }
					<MediaReplaceFlow
						mediaId={ backgroundImageId }
						mediaURL={ mediaSrc }
						accept="image/*"
						onSelect={ ( media ) => {
							setAttributes( {
								mediaId: media.id,
								mediaSrc: media.url,
							} );
						} }
						allowedTypes={ [ 'image' ] }
					/>
					{ backgroundImageId && mediaSrc ? (
						<TextToolbarButton
							onClick={ () =>
								setAttributes( { mediaId: 0, mediaSrc: '' } )
							}
						>
							{ __( 'Reset', 'woo-gutenberg-products-block' ) }
						</TextToolbarButton>
					) : null }
				</ToolbarGroup>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit selected product',
								'woo-gutenberg-products-block'
							),
							onClick: () =>
								setAttributes( { editMode: ! editMode } ),
							isActive: editMode,
						},
					] }
				/>
			</BlockControls>
		);
	};

	const renderInspectorControls = () => {
		const {
			alt,
			dimRatio,
			focalPoint,
			imageFit,
			overlayColor,
			overlayGradient,
			showDesc,
			showPrice,
		} = attributes;

		return (
			<InspectorControls
				alt={ alt }
				backgroundImageSrc={ backgroundImageSrc }
				contentPanel={
					<ToggleControl
						label={ __(
							'Show price',
							'woo-gutenberg-products-block'
						) }
						checked={ showPrice }
						onChange={ () =>
							setAttributes( {
								showPrice: ! showPrice,
							} )
						}
					/>
				}
				dimRatio={ dimRatio }
				focalPoint={ focalPoint }
				imageFit={ imageFit }
				overlayColor={ overlayColor }
				overlayGradient={ overlayGradient }
				setAttributes={ setAttributes }
				setGradient={ setGradient }
				showDesc={ showDesc }
			/>
		);
	};

	const renderProduct = () => {
		const {
			contentAlign,
			dimRatio,
			focalPoint,
			imageFit,
			minHeight,
			overlayColor,
			overlayGradient,
			showDesc,
			showPrice,
			style,
		} = attributes;

		const classes = classnames(
			'wc-block-featured-product',
			dimRatioToClass( dimRatio ),
			{
				'is-selected': isSelected && attributes.productId !== 'preview',
				'is-loading': ! product && isLoading,
				'is-not-found': ! product && ! isLoading,
				'has-background-dim': dimRatio !== 0,
			},
			contentAlign !== 'center' && `has-${ contentAlign }-content`
		);

		const containerStyle = {
			borderRadius: style?.border?.radius,
		};

		const wrapperStyle = {
			...getSpacingClassesAndStyles( attributes ).style,
			minHeight,
		};

		const backgroundImageStyle = {
			...calculateBackgroundImagePosition( focalPoint ),
			objectFit: imageFit,
		};

		const overlayStyle = {
			background: overlayGradient,
			backgroundColor: overlayColor,
		};

		return (
			<>
				<ConstrainedResizable
					enable={ { bottom: true } }
					onResize={ onResize }
					showHandle={ isSelected }
					style={ { minHeight } }
				/>
				<div className={ classes } style={ containerStyle }>
					<div
						className="wc-block-featured-product__wrapper"
						style={ wrapperStyle }
					>
						<div
							className="background-dim__overlay"
							style={ overlayStyle }
						/>
						<img
							alt={ product.short_description }
							className="wc-block-featured-product__background-image"
							src={ backgroundImageSrc }
							style={ backgroundImageStyle }
							onLoad={ ( e ) => {
								setBackgroundImageSize( {
									height: e.target?.naturalHeight,
									width: e.target?.naturalWidth,
								} );
							} }
						/>
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
									__html: product.short_description,
								} }
							/>
						) }
						{ showPrice && (
							<div
								className="wc-block-featured-product__price"
								dangerouslySetInnerHTML={ {
									__html: product.price_html,
								} }
							/>
						) }
						<div className="wc-block-featured-product__link">
							{ renderButton() }
						</div>
					</div>
				</div>
			</>
		);
	};

	const renderButton = () => {
		const { productId, linkText } = attributes;

		return (
			<CallToAction
				itemId={ productId }
				linkText={ linkText }
				permalink={ product.permalink }
			/>
		);
	};

	const renderNoProduct = () => (
		<Placeholder
			className="wc-block-featured-product"
			icon={ <Icon icon={ starEmpty } /> }
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

	if ( isEditingImage ) {
		return (
			<ImageEditor
				backgroundImageId={ backgroundImageId }
				backgroundImageSize={ backgroundImageSize }
				backgroundImageSrc={ backgroundImageSrc }
				isEditingImage={ isEditingImage }
				setAttributes={ setAttributes }
				setIsEditingImage={ setIsEditingImage }
			/>
		);
	}

	return (
		<>
			{ getBlockControls() }
			{ renderInspectorControls() }
			{ product ? renderProduct() : renderNoProduct() }
		</>
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
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
	triggerUrlUpdate: PropTypes.func,
};

export default compose( [
	withProduct,
	withSpokenMessages,
	withSelect( ( select, { clientId }, { dispatch } ) => {
		const Block = select( 'core/block-editor' ).getBlock( clientId );
		const buttonBlockId = Block?.innerBlocks[ 0 ]?.clientId || '';
		const currentButtonAttributes =
			Block?.innerBlocks[ 0 ]?.attributes || {};
		const updateBlockAttributes = ( attributes ) => {
			if ( buttonBlockId ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					buttonBlockId,
					attributes
				);
			}
		};
		return { updateBlockAttributes, currentButtonAttributes };
	} ),
	createHigherOrderComponent( ( ProductComponent ) => {
		class WrappedComponent extends Component {
			state = {
				doUrlUpdate: false,
			};
			componentDidUpdate() {
				const {
					attributes,
					updateBlockAttributes,
					currentButtonAttributes,
					product,
				} = this.props;
				if (
					this.state.doUrlUpdate &&
					! attributes.editMode &&
					product?.permalink &&
					currentButtonAttributes?.url &&
					product.permalink !== currentButtonAttributes.url
				) {
					updateBlockAttributes( {
						...currentButtonAttributes,
						url: product.permalink,
					} );
					this.setState( { doUrlUpdate: false } );
				}
			}
			triggerUrlUpdate = () => {
				this.setState( { doUrlUpdate: true } );
			};
			render() {
				return (
					<ProductComponent
						triggerUrlUpdate={ this.triggerUrlUpdate }
						{ ...this.props }
					/>
				);
			}
		}
		return WrappedComponent;
	}, 'withUpdateButtonAttributes' ),
] )( FeaturedProduct );

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	MediaReplaceFlow,
	PanelColorSettings,
	withColors,
	RichText,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {
	Button,
	FocalPointPicker,
	PanelBody,
	Placeholder,
	RangeControl,
	ResizableBox,
	Spinner,
	ToggleControl,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { getSetting } from '@woocommerce/settings';
import ProductControl from '@woocommerce/editor-components/product-control';
import ErrorPlaceholder from '@woocommerce/editor-components/error-placeholder';
import { withProduct } from '@woocommerce/block-hocs';
import { Icon, star } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import { dimRatioToClass, getBackgroundImageStyles } from './utils';
import {
	getImageSrcFromProduct,
	getImageIdFromProduct,
} from '../../utils/products';

/**
 * Component to handle edit mode of "Featured Product".
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.attributes Incoming block attributes.
 * @param {function(any):any} props.debouncedSpeak Function for delayed speak.
 * @param {string} props.error Error message.
 * @param {function(any):any} props.getProduct Function for getting the product.
 * @param {boolean} props.isLoading Whether product is loading or not.
 * @param {boolean} props.isSelected Whether block is selected or not.
 * @param {Object} props.overlayColor Overlay color object.
 * @param {Object} props.product Product object.
 * @param {function(any):any} props.setAttributes Setter for attributes.
 * @param {function(any):any} props.setOverlayColor Setter for overlay color.
 * @param {function():any} props.triggerUrlUpdate Function for triggering a url update for product.
 */
const FeaturedProduct = ( {
	attributes,
	debouncedSpeak,
	error,
	getProduct,
	isLoading,
	isSelected,
	overlayColor,
	product,
	setAttributes,
	setOverlayColor,
	triggerUrlUpdate = () => void null,
} ) => {
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
					icon={ <Icon srcElement={ star } /> }
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
		const { contentAlign, editMode, mediaSrc } = attributes;
		const mediaId = attributes.mediaId || getImageIdFromProduct( product );

		return (
			<BlockControls>
				<AlignmentToolbar
					value={ contentAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { contentAlign: nextAlign } );
					} }
				/>
				<MediaReplaceFlow
					mediaId={ mediaId }
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

				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit' ),
							onClick: () =>
								setAttributes( { editMode: ! editMode } ),
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
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<ToggleControl
						label={ __(
							'Show description',
							'woo-gutenberg-products-block'
						) }
						checked={ attributes.showDesc }
						onChange={
							// prettier-ignore
							() => setAttributes( { showDesc: ! attributes.showDesc } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show price',
							'woo-gutenberg-products-block'
						) }
						checked={ attributes.showPrice }
						onChange={
							// prettier-ignore
							() => setAttributes( { showPrice: ! attributes.showPrice } )
						}
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Overlay', 'woo-gutenberg-products-block' ) }
					colorSettings={ [
						{
							value: overlayColor.color,
							onChange: setOverlayColor,
							label: __(
								'Overlay Color',
								'woo-gutenberg-products-block'
							),
						},
					] }
				>
					{ !! url && (
						<>
							<RangeControl
								label={ __(
									'Background Opacity',
									'woo-gutenberg-products-block'
								) }
								value={ attributes.dimRatio }
								onChange={ ( ratio ) =>
									setAttributes( { dimRatio: ratio } )
								}
								min={ 0 }
								max={ 100 }
								step={ 10 }
							/>
							{ focalPointPickerExists && (
								<FocalPointPicker
									label={ __( 'Focal Point Picker' ) }
									url={ url }
									value={ focalPoint }
									onChange={ ( value ) =>
										setAttributes( { focalPoint: value } )
									}
								/>
							) }
						</>
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
				'is-selected': isSelected && attributes.productId !== 'preview',
				'is-loading': ! product && isLoading,
				'is-not-found': ! product && ! isLoading,
				'has-background-dim': dimRatio !== 0,
			},
			dimRatioToClass( dimRatio ),
			contentAlign !== 'center' && `has-${ contentAlign }-content`,
			className
		);

		const style = getBackgroundImageStyles(
			attributes.mediaSrc || product
		);

		if ( overlayColor.color ) {
			style.backgroundColor = overlayColor.color;
		}
		if ( focalPoint ) {
			const bgPosX = focalPoint.x * 100;
			const bgPosY = focalPoint.y * 100;
			style.backgroundPosition = `${ bgPosX }% ${ bgPosY }%`;
		}

		const onResizeStop = ( event, direction, elt ) => {
			setAttributes( { height: parseInt( elt.style.height, 10 ) } );
		};

		return (
			<ResizableBox
				className={ classes }
				size={ { height } }
				minHeight={ getSetting( 'min_height', 500 ) }
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
			</ResizableBox>
		);
	};

	const renderButton = () => {
		const buttonClasses = classnames(
			'wp-block-button__link',
			'is-style-fill'
		);
		const buttonStyle = {
			backgroundColor: 'vivid-green-cyan',
			borderRadius: '5px',
		};
		const wrapperStyle = {
			width: '100%',
		};
		return attributes.productId === 'preview' ? (
			<div className="wp-block-button aligncenter" style={ wrapperStyle }>
				<RichText.Content
					tagName="a"
					className={ buttonClasses }
					href={ product.permalink }
					title={ attributes.linkText }
					style={ buttonStyle }
					value={ attributes.linkText }
					target={ product.permalink }
				/>
			</div>
		) : (
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
		);
	};

	const renderNoProduct = () => (
		<Placeholder
			className="wc-block-featured-product"
			icon={ <Icon srcElement={ star } /> }
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
		<>
			{ getBlockControls() }
			{ getInspectorControls() }
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
	// from withColors
	overlayColor: PropTypes.object,
	setOverlayColor: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
	triggerUrlUpdate: PropTypes.func,
};

export default compose( [
	withProduct,
	withColors( { overlayColor: 'background-color' } ),
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

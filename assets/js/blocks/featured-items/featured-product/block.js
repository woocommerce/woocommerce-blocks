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
	ToolbarButton,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import TextToolbarButton from '@woocommerce/editor-components/text-toolbar-button';
import { withProduct } from '@woocommerce/block-hocs';
import { crop, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { ConstrainedResizable } from '../constrained-resizable';
import { withImageEditor } from '../image-editor';
import { withInspectorControls } from '../inspector-controls';
import { useSetup } from '../use-setup';
import { calculateBackgroundImagePosition, dimRatioToClass } from '../utils';
import { CallToAction } from '../call-to-action';
import { withEditMode } from '../with-edit-mode';
import { withApiError } from '../with-api-error';
import { useBackgroundImage } from '../use-background-image';
import { withFeaturedItem } from '../with-featured-item';

/**
 * @template A
 * @typedef {import("react").Dispatch< A >} Dispatch
 */

/**
 * @template S
 * @typedef {import("react").SetStateAction< S >} SetStateAction
 */

const GENERIC_CONFIG = {
	icon: starEmpty,
	label: __( 'Featured Product', 'woo-gutenberg-products-block' ),
};

const CONTENT_CONFIG = {
	...GENERIC_CONFIG,
	emptyMessage: __(
		'No product is selected.',
		'woo-gutenberg-products-block'
	),
};

const EDIT_MODE_CONFIG = {
	...GENERIC_CONFIG,
	description: __(
		'Visually highlight a product or variation and encourage prompt action',
		'woo-gutenberg-products-block'
	),
	editLabel: __(
		'Showing Featured Product block preview.',
		'woo-gutenberg-products-block'
	),
};

/**
 * Component to handle edit mode of "Featured Product".
 *
 * @param {Object}            props                  Incoming props for the component.
 * @param {Object}            props.attributes       Incoming block attributes.
 * @param {boolean}           props.isLoading        Whether product is loading or not.
 * @param {boolean}           props.isSelected       Whether block is selected or not.
 * @param {string}            props.name             The block name.
 * @param {Object}            props.product          Product object.
 * @param {function(any):any} props.setAttributes    Setter for attributes.
 * @param {[boolean, Dispatch<SetStateAction<boolean>>]} props.useEditingImage Getter and setter for editing image state.
 */
const FeaturedProduct = ( {
	attributes,
	isLoading,
	isSelected,
	name,
	product,
	setAttributes,
	useEditingImage,
} ) => {
	const { mediaId, mediaSrc } = attributes;
	const [ isEditingImage, setIsEditingImage ] = useEditingImage;
	const { backgroundImageId, backgroundImageSrc } = useBackgroundImage( {
		mediaId,
		mediaSrc,
		blockName: name,
		item: product,
	} );

	const {
		// backgroundImageSize,
		onResize,
		setBackgroundImageSize,
	} = useSetup( {
		setAttributes,
	} );

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

	return (
		<>
			{ getBlockControls() }
			{ renderProduct() }
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
	withFeaturedItem( CONTENT_CONFIG ),
	withEditMode( EDIT_MODE_CONFIG ),
	withApiError,
	withImageEditor,
	withInspectorControls,
] )( FeaturedProduct );

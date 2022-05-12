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
import {
	Placeholder,
	Spinner,
	ToolbarButton,
	ToolbarGroup,
	withSpokenMessages,
} from '@wordpress/components';
import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import PropTypes from 'prop-types';
import { folderStarred } from '@woocommerce/icons';
import { crop, Icon } from '@wordpress/icons';
import ErrorPlaceholder from '@woocommerce/editor-components/error-placeholder';
import TextToolbarButton from '@woocommerce/editor-components/text-toolbar-button';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { dimRatioToClass } from './utils';
import { ConstrainedResizable } from '../constrained-resizable';
import { ImageEditor } from '../image-editor';
import { InspectorControls } from '../inspector-controls';
import { withCategory } from '../../../hocs';
import { calculateBackgroundImagePosition } from '../utils';
import { CallToAction } from '../call-to-action';
import { useSetup } from '../use-setup';
import { withEditMode } from '../with-edit-mode';

const EDIT_MODE_CONFIG = {
	description: __(
		'Visually highlight a product category and encourage prompt action.',
		'woo-gutenberg-products-block'
	),
	editLabel: __(
		'Showing Featured Product block preview.',
		'woo-gutenberg-products-block'
	),
	icon: folderStarred,
	label: __( 'Featured Category', 'woo-gutenberg-products-block' ),
};

/**
 * Component to handle edit mode of "Featured Category".
 *
 * @param {Object}            props                  Incoming props for the component.
 * @param {Object}            props.attributes       Incoming block attributes.
 * @param {boolean}           props.isSelected       Whether block is selected or not.
 * @param {function(any):any} props.setAttributes    Function for setting new attributes.
 * @param {string}            props.error            Error message
 * @param {function(any):any} props.getCategory      Function for getting category details.
 * @param {boolean}           props.isLoading        Whether loading or not.
 * @param {Object}            props.category         The product category object.
 */
const FeaturedCategory = ( {
	attributes,
	isSelected,
	setAttributes,
	error,
	getCategory,
	isLoading,
	category,
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
		item: category,
	} );

	const renderApiError = () => (
		<ErrorPlaceholder
			className="wc-block-featured-category-error"
			error={ error }
			isLoading={ isLoading }
			onRetry={ getCategory }
		/>
	);

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
								'Edit category image',
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
								'Edit selected category',
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
		} = attributes;

		return (
			<InspectorControls
				alt={ alt }
				backgroundImageSrc={ backgroundImageSrc }
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

	const renderButton = () => {
		const { categoryId, linkText } = attributes;

		return (
			<CallToAction
				itemId={ categoryId }
				linkText={ linkText }
				permalink={ category.permalink }
			/>
		);
	};

	const renderCategory = () => {
		const {
			contentAlign,
			dimRatio,
			focalPoint,
			imageFit,
			minHeight,
			overlayColor,
			overlayGradient,
			showDesc,
			style,
		} = attributes;

		const classes = classnames(
			'wc-block-featured-category',
			{
				'is-selected':
					isSelected && attributes.categoryId !== 'preview',
				'is-loading': ! category && isLoading,
				'is-not-found': ! category && ! isLoading,
				'has-background-dim': dimRatio !== 0,
			},
			dimRatioToClass( dimRatio ),
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
						className="wc-block-featured-category__wrapper"
						style={ wrapperStyle }
					>
						<div
							className="background-dim__overlay"
							style={ overlayStyle }
						/>
						{ backgroundImageSrc && (
							<img
								alt={ category.description }
								className="wc-block-featured-category__background-image"
								src={ backgroundImageSrc }
								style={ backgroundImageStyle }
								onLoad={ ( e ) => {
									setBackgroundImageSize( {
										height: e.target?.naturalHeight,
										width: e.target?.naturalWidth,
									} );
								} }
							/>
						) }
						<h2
							className="wc-block-featured-category__title"
							dangerouslySetInnerHTML={ {
								__html: category.name,
							} }
						/>
						{ showDesc && (
							<div
								className="wc-block-featured-category__description"
								dangerouslySetInnerHTML={ {
									__html: category.description,
								} }
							/>
						) }
						<div className="wc-block-featured-category__link">
							{ renderButton() }
						</div>
					</div>
				</div>
			</>
		);
	};

	const renderNoCategory = () => (
		<Placeholder
			className="wc-block-featured-category"
			icon={ <Icon icon={ folderStarred } /> }
			label={ __( 'Featured Category', 'woo-gutenberg-products-block' ) }
		>
			{ isLoading ? (
				<Spinner />
			) : (
				__(
					'No product category is selected.',
					'woo-gutenberg-products-block'
				)
			) }
		</Placeholder>
	);

	if ( error ) {
		return renderApiError();
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
			{ category ? renderCategory() : renderNoCategory() }
		</>
	);
};

FeaturedCategory.propTypes = {
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
	// from withCategory
	error: PropTypes.object,
	getCategory: PropTypes.func,
	isLoading: PropTypes.bool,
	category: PropTypes.shape( {
		name: PropTypes.node,
		description: PropTypes.node,
		permalink: PropTypes.string,
	} ),
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
	triggerUrlUpdate: PropTypes.func,
};

export default compose( [
	withCategory,
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
					category,
				} = this.props;
				if (
					this.state.doUrlUpdate &&
					! attributes.editMode &&
					category?.permalink &&
					currentButtonAttributes?.url &&
					category.permalink !== currentButtonAttributes.url
				) {
					updateBlockAttributes( {
						...currentButtonAttributes,
						url: category.permalink,
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
	withEditMode( EDIT_MODE_CONFIG ),
] )( FeaturedCategory );

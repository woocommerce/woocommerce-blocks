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
import { withSelect } from '@wordpress/data';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import PropTypes from 'prop-types';
import { getSetting } from '@woocommerce/settings';
import { Icon, folderStarred } from '@woocommerce/icons';
import ProductCategoryControl from '@woocommerce/editor-components/product-category-control';
import ErrorPlaceholder from '@woocommerce/editor-components/error-placeholder';

/**
 * Internal dependencies
 */
import {
	dimRatioToClass,
	getBackgroundImageStyles,
	getCategoryImageId,
	getCategoryImageSrc,
} from './utils';
import { withCategory } from '../../hocs';

/**
 * Component to handle edit mode of "Featured Category".
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.attributes Incoming block attributes.
 * @param {boolean} props.isSelected Whether block is selected or not.
 * @param {function(any):any} props.setAttributes Function for setting new attributes.
 * @param {string} props.error Error message
 * @param {function(any):any} props.getCategory Function for getting category details.
 * @param {boolean} props.isLoading Whether loading or not.
 * @param {Object} props.category The product category object.
 * @param {Object} props.overlayColor Overlay color object for content.
 * @param {function(any):any} props.setOverlayColor Setter for overlay color.
 * @param {function(any):any} props.debouncedSpeak Function for delayed speak.
 * @param {function(any):any} props.triggerUrlUpdate Function to update Shop now button Url.
 */
const FeaturedCategory = ( {
	attributes,
	isSelected,
	setAttributes,
	error,
	getCategory,
	isLoading,
	category,
	overlayColor,
	setOverlayColor,
	debouncedSpeak,
	triggerUrlUpdate = () => void null,
} ) => {
	const renderApiError = () => (
		<ErrorPlaceholder
			className="wc-block-featured-category-error"
			error={ error }
			isLoading={ isLoading }
			onRetry={ getCategory }
		/>
	);

	const getBlockControls = () => {
		const { contentAlign, mediaSrc } = attributes;
		const mediaId = attributes.mediaId || getCategoryImageId( category );

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
		const url = attributes.mediaSrc || getCategoryImageSrc( category );
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
						onChange={ () =>
							setAttributes( { showDesc: ! attributes.showDesc } )
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
			<Placeholder
				icon={ <Icon srcElement={ folderStarred } /> }
				label={ __(
					'Featured Category',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-featured-category"
			>
				{ __(
					'Visually highlight a product category and encourage prompt action.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-featured-category__selection">
					<ProductCategoryControl
						selected={ [ attributes.categoryId ] }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( {
								categoryId: id,
								mediaId: 0,
								mediaSrc: '',
							} );
							triggerUrlUpdate();
						} }
						isSingle
					/>
					<Button isPrimary onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
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
		return attributes.categoryId === 'preview' ? (
			<div className="wp-block-button aligncenter" style={ wrapperStyle }>
				<RichText.Content
					tagName="a"
					className={ buttonClasses }
					href={ category.permalink }
					title={ attributes.linkText }
					style={ buttonStyle }
					value={ attributes.linkText }
					target={ category.permalink }
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
							url: category.permalink,
							align: 'center',
						},
					],
				] }
				templateLock="all"
			/>
		);
	};

	const renderCategory = () => {
		const {
			className,
			contentAlign,
			dimRatio,
			focalPoint,
			height,
			showDesc,
		} = attributes;
		const classes = classnames(
			'wc-block-featured-category',
			{
				'is-selected': isSelected && attributes.productId !== 'preview',
				'is-loading': ! category && isLoading,
				'is-not-found': ! category && ! isLoading,
				'has-background-dim': dimRatio !== 0,
			},
			dimRatioToClass( dimRatio ),
			contentAlign !== 'center' && `has-${ contentAlign }-content`,
			className
		);
		const mediaSrc = attributes.mediaSrc || getCategoryImageSrc( category );
		const style = !! category ? getBackgroundImageStyles( mediaSrc ) : {};
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
				<div className="wc-block-featured-category__wrapper">
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
			</ResizableBox>
		);
	};

	const renderNoCategory = () => (
		<Placeholder
			className="wc-block-featured-category"
			icon={ <Icon srcElement={ folderStarred } /> }
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
	// from withColors
	overlayColor: PropTypes.object,
	setOverlayColor: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
	triggerUrlUpdate: PropTypes.func,
};

export default compose( [
	withCategory,
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
] )( FeaturedCategory );

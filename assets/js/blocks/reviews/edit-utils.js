/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from 'wordpress-element';
import {
	Notice,
	ToggleControl,
	ToolbarGroup,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { getAdminLink } from '@woocommerce/settings';
import {
	REVIEW_RATINGS_ENABLED,
	SHOW_AVATARS,
} from '@woocommerce/block-settings';
import ToggleButtonControl from '@woocommerce/editor-components/toggle-button-control';

export const getBlockControls = ( editMode, setAttributes ) => (
	<BlockControls>
		<ToolbarGroup
			controls={ [
				{
					icon: 'edit',
					title: __( 'Edit', 'woo-gutenberg-products-block' ),
					onClick: () => setAttributes( { editMode: ! editMode } ),
					isActive: editMode,
				},
			] }
		/>
	</BlockControls>
);

export const getSharedReviewContentControls = ( attributes, setAttributes ) => {
	return (
		<>
			<ToggleControl
				label={ __( 'Product rating', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showReviewRating }
				onChange={ () =>
					setAttributes( {
						showReviewRating: ! attributes.showReviewRating,
					} )
				}
			/>
			{ attributes.showReviewRating && ! REVIEW_RATINGS_ENABLED && (
				<Notice
					className="wc-block-base-control-notice"
					isDismissible={ false }
				>
					{ createInterpolateElement(
						__(
							'Product rating is disabled in your <a>store settings</a>.',
							'woo-gutenberg-products-block'
						),
						{
							a: (
								// eslint-disable-next-line jsx-a11y/anchor-has-content
								<a
									href={ getAdminLink(
										'admin.php?page=wc-settings&tab=products'
									) }
									target="_blank"
									rel="noopener noreferrer"
								/>
							),
						}
					) }
				</Notice>
			) }
			<ToggleControl
				label={ __( 'Reviewer name', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showReviewerName }
				onChange={ () =>
					setAttributes( {
						showReviewerName: ! attributes.showReviewerName,
					} )
				}
			/>
			<ToggleControl
				label={ __( 'Image', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showReviewImage }
				onChange={ () =>
					setAttributes( {
						showReviewImage: ! attributes.showReviewImage,
					} )
				}
			/>
			<ToggleControl
				label={ __( 'Review date', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showReviewDate }
				onChange={ () =>
					setAttributes( {
						showReviewDate: ! attributes.showReviewDate,
					} )
				}
			/>
			<ToggleControl
				label={ __( 'Review content', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showReviewContent }
				onChange={ () =>
					setAttributes( {
						showReviewContent: ! attributes.showReviewContent,
					} )
				}
			/>
			{ attributes.showReviewImage && (
				<>
					<ToggleButtonControl
						label={ __(
							'Review image',
							'woo-gutenberg-products-block'
						) }
						value={ attributes.imageType }
						options={ [
							{
								label: __(
									'Reviewer photo',
									'woo-gutenberg-products-block'
								),
								value: 'reviewer',
							},
							{
								label: __(
									'Product',
									'woo-gutenberg-products-block'
								),
								value: 'product',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { imageType: value } )
						}
					/>
					{ attributes.imageType === 'reviewer' && ! SHOW_AVATARS && (
						<Notice
							className="wc-block-base-control-notice"
							isDismissible={ false }
						>
							{ createInterpolateElement(
								__(
									'Reviewer photo is disabled in your <a>site settings</a>.',
									'woo-gutenberg-products-block'
								),
								{
									a: (
										// eslint-disable-next-line jsx-a11y/anchor-has-content
										<a
											href={ getAdminLink(
												'options-discussion.php'
											) }
											target="_blank"
											rel="noopener noreferrer"
										/>
									),
								}
							) }
						</Notice>
					) }
				</>
			) }
		</>
	);
};

export const getSharedReviewListControls = ( attributes, setAttributes ) => {
	const minPerPage = 1;
	const maxPerPage = 20;

	return (
		<>
			<ToggleControl
				label={ __( 'Order by', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showOrderby }
				onChange={ () =>
					setAttributes( { showOrderby: ! attributes.showOrderby } )
				}
			/>
			<SelectControl
				label={ __(
					'Order Product Reviews by',
					'woo-gutenberg-products-block'
				) }
				value={ attributes.orderby }
				options={ [
					{ label: 'Most recent', value: 'most-recent' },
					{ label: 'Highest Rating', value: 'highest-rating' },
					{ label: 'Lowest Rating', value: 'lowest-rating' },
				] }
				onChange={ ( orderby ) => setAttributes( { orderby } ) }
			/>
			<RangeControl
				label={ __(
					'Starting Number of Reviews',
					'woo-gutenberg-products-block'
				) }
				value={ attributes.reviewsOnPageLoad }
				onChange={ ( reviewsOnPageLoad ) =>
					setAttributes( { reviewsOnPageLoad } )
				}
				max={ maxPerPage }
				min={ minPerPage }
			/>
			<ToggleControl
				label={ __( 'Load more', 'woo-gutenberg-products-block' ) }
				checked={ attributes.showLoadMore }
				onChange={ () =>
					setAttributes( { showLoadMore: ! attributes.showLoadMore } )
				}
			/>
			{ attributes.showLoadMore && (
				<RangeControl
					label={ __(
						'Load More Reviews',
						'woo-gutenberg-products-block'
					) }
					value={ attributes.reviewsOnLoadMore }
					onChange={ ( reviewsOnLoadMore ) =>
						setAttributes( { reviewsOnLoadMore } )
					}
					max={ maxPerPage }
					min={ minPerPage }
				/>
			) }
		</>
	);
};

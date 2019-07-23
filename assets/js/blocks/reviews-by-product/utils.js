/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { format } from '@wordpress/date';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import renderTemplate from '../../utils/render-template';

const render = ( args ) => {
	const {
		avatarUrls,
		className,
		dateCreated,
		id,
		i,
		isLoading,
		text,
		showAvatar,
		showProductRating,
		showReviewerName,
		showReviewDate,
		rating,
		reviewer,
	} = applyFilters( 'woocommerce-blocks-review-data-before', args );
	const classes = classNames( className, {
		'has-avatar': showAvatar,
		'has-date': showReviewDate,
		'has-name': showReviewerName,
		'has-rating': showProductRating,
		'is-loading': isLoading,
	} );
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};
	const placeholders = {
		review: renderTemplate( 'review-avatar', (
			<span
				className="wc-block-reviews-by-product__text"
				dangerouslySetInnerHTML={ {
					// `text` is the `review` parameter returned by the `reviews` endpoint.
					// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
					// so using it inside `dangerouslySetInnerHTML` is safe.
					__html: text || '',
				} }
			/>
		), { text } ),
		avatar: showAvatar ? renderTemplate( 'review-avatar', (
			isLoading ? (
				<div className="wc-block-reviews-by-product__avatar" width="48" height="48" />
			) : (
				<img alt="" src={ '{{ avatarUrl48 }}' } srcSet={ '{{ avatarUrl96 }} 2x' } className="wc-block-reviews-by-product__avatar" width="48" height="48" />
			)
		), { avatarUrl48: avatarUrls[ '48' ], avatarUrl96: avatarUrls[ '96' ] } ) : null,
		rating: showProductRating ? renderTemplate( 'review-rating', (
			<div className="wc-block-reviews-by-product__rating">
				<div className="wc-block-reviews-by-product__rating__stars" role="img">
					{ Number.isFinite( rating ) && (
						<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
					) }
				</div>
			</div>
		), { rating } ) : null,
		reviewer: showReviewerName ? renderTemplate( 'review-reviewer', (
			<strong className="wc-block-reviews-by-product__author">{ '{{ reviewer }}' }</strong>
		), { reviewer } ) : null,
		date: showReviewDate ? renderTemplate( 'review-date', (
			<time className="wc-block-reviews-by-product__published-date" dateTime={ '{{ dateCreated }}' }>{ '{{ formattedDate }}' }</time>
		), { dateCreated, formattedDate: format( 'F j, Y', dateCreated ) } ) : null,
	};

	return renderTemplate( 'review', (
		<li id={ id || i } className={ classes } key={ id || i } aria-hidden={ isLoading }>
			{ '{{ review }}' }
			{ ( showAvatar || showReviewerName || showProductRating || showReviewDate ) && (
				<div className="wc-block-reviews-by-product__info">
					{ '{{ avatar }}' }
					{ ( showReviewerName || showProductRating ) && (
						<div className="wc-block-reviews-by-product__meta">
							{ '{{ reviewer }}' }
							{ '{{ rating }}' }
						</div>
					) }
					{ '{{ date }}' }
				</div>
			) }
		</li>
	), placeholders );
};

/**
 * Render a review for the Reviews by Product block
 *
 * @param {Object} attributes Block attributes
 * @param {Object} review Object containing review data.
 *
 * @return {Object} React JSx nodes of the block
 */
export function renderReview( attributes, review = {}, i = 0 ) {
	const { showAvatar, showProductRating, showReviewDate, showReviewerName } = attributes;
	const { id = null, date_created: dateCreated, rating, review: text = '', reviewer = '', reviewer_avatar_urls: avatarUrls = {} } = review;
	const isLoading = ! Object.keys( review ).length > 0;

	const className = 'wc-block-reviews-by-product__item';

	return render( {
		avatarUrls,
		className,
		dateCreated,
		id,
		i,
		isLoading,
		text,
		showAvatar,
		showProductRating,
		showReviewerName,
		showReviewDate,
		rating,
		reviewer,
	} );
}

/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { useStyleProps } from '@woocommerce/base-hooks';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import { isNumber, ProductResponseItem } from '@woocommerce/types';

const getRatingCount = ( product: ProductResponseItem ) => {
	const count = isNumber( product.review_count )
		? product.review_count
		: parseInt( product.review_count, 10 );

	return Number.isFinite( count ) && count > 0 ? count : 0;
};

const ReviewsCount = ( props: { reviews: number } ): JSX.Element => {
	const { reviews } = props;

	const reviewsCount = sprintf(
		/* translators: %s is referring to the total of reviews for a product */
		_n(
			'(%s customer review)',
			'(%s customer reviews)',
			reviews,
			'woo-gutenberg-products-block'
		),
		reviews
	);

	return (
		<span className="wc-block-components-product-rating__reviews_count">
			{ reviewsCount }
		</span>
	);
};

type ProductRatingProps = {
	className?: string;
	textAlign?: string;
	isDescendentOfSingleProductBlock: boolean;
	isDescendentOfQueryLoop: boolean;
	postId: number;
	productId: number;
	shouldDisplayMockedReviewsWhenProductHasNoReviews: boolean;
};

export const Block = ( props: ProductRatingProps ): JSX.Element | undefined => {
	const {
		textAlign,
		isDescendentOfSingleProductBlock,
		shouldDisplayMockedReviewsWhenProductHasNoReviews,
	} = props;
	const styleProps = useStyleProps( props );
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const reviews = getRatingCount( product );

	const className = classnames(
		styleProps.className,
		'wc-block-components-product-rating',
		{
			[ `${ parentClassName }__product-rating` ]: parentClassName,
			[ `has-text-align-${ textAlign }` ]: textAlign,
		}
	);

	if ( reviews || shouldDisplayMockedReviewsWhenProductHasNoReviews ) {
		return (
			<div className={ className } style={ styleProps.style }>
				<div className="wc-block-components-product-rating__container">
					{ reviews && isDescendentOfSingleProductBlock ? (
						<ReviewsCount reviews={ reviews } />
					) : (
						__(
							'(X customer reviews)',
							'woo-gutenberg-products-block'
						)
					) }
				</div>
			</div>
		);
	}
};

export default withProductDataContext( Block );

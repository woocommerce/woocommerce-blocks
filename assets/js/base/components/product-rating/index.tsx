/**
 * External dependencies
 */
import classNames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

const Rating = ( {
	className,
	key,
	rating,
	ratedProductsCount,
	onClick,
}: RatingProps ): JSX.Element => {
	const ratingClassName = classNames(
		'wc-block-components-product-rating',
		className
	);

	const starStyle = {
		width: ( rating / 5 ) * 100 + '%',
	};

	const ratingText = sprintf(
		/* translators: %f is referring to the average rating value */
		__( 'Rated %f out of 5', 'woo-gutenberg-products-block' ),
		rating
	);

	const ratingHTML = {
		__html: sprintf(
			/* translators: %1$s is referring to the rating value */
			_n(
				'Rated %1$s out of 5',
				'Rated %1$s out of 5',
				ratedProductsCount,
				'woo-gutenberg-products-block'
			),
			sprintf( '<strong class="rating">%f</strong>', rating )
		),
	};

	return (
		<div
			className={ ratingClassName }
			onClick={ onClick }
			role="button"
			tabIndex={ key }
			onKeyDown={ onClick }
		>
			<div
				className={ 'wc-block-components-product-rating__stars' }
				role="img"
				aria-label={ ratingText }
			>
				<span
					style={ starStyle }
					dangerouslySetInnerHTML={ ratingHTML }
				/>
			</div>
			{ ratedProductsCount ? `(${ ratedProductsCount })` : null }
		</div>
	);
};
interface RatingProps {
	className: string;
	key: 0 | 1 | 2 | 3 | 4 | 5;
	rating: 0 | 1 | 2 | 3 | 4 | 5;
	ratedProductsCount: number;
	onClick: () => void;
}

export default Rating;

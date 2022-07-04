/**
 * External dependencies
 */
import classNames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useProductDataContext } from '@woocommerce/shared-context';
import { Fragment } from '@wordpress/element';
import { useStoreEvents } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import './style.scss';

/** @typedef {import('react')} React */

const Rating = ( {
	averageRating,
	className,
	parentClassName,
	productCount,
	ratingCount,
	showProductLink = true,
	...props
}: RatingProps ): JSX.Element => {
	const ratingClassName = classNames(
		'wc-block-components-product-rating',
		className
	);

	const starStyle = {
		width: ( averageRating / 5 ) * 100 + '%',
	};

	const ratingText = sprintf(
		/* translators: %f is referring to the average rating value */
		__( 'Rated %f out of 5', 'woo-gutenberg-products-block' ),
		averageRating
	);

	const { dispatchStoreEvent } = useStoreEvents();

	const { product } = useProductDataContext();

	const ratingHTML = {
		__html: sprintf(
			/* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */
			_n(
				'Rated %1$s out of 5 based on %2$s customer rating',
				'Rated %1$s out of 5 based on %2$s customer ratings',
				ratingCount,
				'woo-gutenberg-products-block'
			),
			sprintf( '<strong class="rating">%f</strong>', averageRating ),
			sprintf( '<span class="rating">%d</span>', ratingCount )
		),
	};

	if ( ! product.id ) {
		return (
			<div className={ ratingClassName } { ...props }>
				<div
					className={ classNames(
						'wc-block-components-product-rating__stars',
						`${ parentClassName }__product-rating__stars`
					) }
					role="img"
					aria-label={ ratingText }
				>
					<span
						style={ starStyle }
						dangerouslySetInnerHTML={ ratingHTML }
					/>
				</div>
				{ productCount ? `(${ productCount })` : null }
			</div>
		);
	}

	const ParentComponent = showProductLink ? 'a' : Fragment;

	const anchorLabel = sprintf(
		/* translators: %s is referring to the product name */
		__( 'Link to %s', 'woo-gutenberg-products-block' ),
		product.name
	);

	const anchorProps = {
		href: product.permalink,
		...{ 'aria-label': anchorLabel },
		onClick: () => {
			dispatchStoreEvent( 'product-view-link', {
				product,
			} );
		},
	};

	return (
		<ParentComponent { ...( showProductLink && anchorProps ) }>
			<div className={ ratingClassName } { ...props }>
				<div
					className={ classNames(
						'wc-block-components-product-rating__stars',
						`${ parentClassName }__product-rating__stars`
					) }
					role="img"
					aria-label={ ratingText }
				>
					<span
						style={ starStyle }
						dangerouslySetInnerHTML={ ratingHTML }
					/>
				</div>
				{ productCount ? `(${ productCount })` : null }
			</div>
		</ParentComponent>
	);
};

interface RatingProps {
	averageRating: 0 | 1 | 2 | 3 | 4 | 5;
	className?: string;
	parentClassName?: string;
	productCount?: number;
	ratingCount: number;
	showProductLink: boolean;
}

export default Rating;

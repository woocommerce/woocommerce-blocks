/**
 * External dependencies.
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import ProductLink from './product-link';
import ProductTitle from './product-title';
import ProductPrice from './product-price';
import ProductButton from './product-button';
import ProductImage from './product-image';
import ProductRating from './product-rating';
import ProductSaleBadge from './product-sale-badge';

const ProductGridItem = ( { attributes, product = {} } ) => {
	const { contentVisibility } = attributes;
	const { button, price, rating, title, image } = contentVisibility;
	const isLoading = ! Object.keys( product ).length > 0;
	const classes = classNames(
		'wc-block-grid__product',
		{
			'is-loading': isLoading,
		},
	);
	return (
		<li className={ classes } aria-hidden={ isLoading }>
			<ProductLink product={ product } className="wc-block-grid__product-link">
				{ image && (
					<ProductImage product={ product } className="wc-block-grid__product-image" />
				) }
				{ title && (
					<ProductTitle product={ product } className="wc-block-grid__product-title" />
				) }
			</ProductLink>
			{ price && (
				<ProductSaleBadge product={ product } className="wc-block-grid__product-onsale" />
			) }
			{ price && (
				<ProductPrice product={ product } className="wc-block-grid__product-price" />
			) }
			{ rating && (
				<ProductRating product={ product } className="wc-block-grid__product-rating" />
			) }
			{ button && (
				<ProductButton product={ product } className="wc-block-grid__product-add-to-cart" />
			) }
		</li>
	);
};

ProductGridItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default ProductGridItem;

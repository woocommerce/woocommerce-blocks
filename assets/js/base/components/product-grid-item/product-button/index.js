/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ProductButton = ( { className, product = {} } ) => {
	const classes = classnames(
		className,
		'wp-block-button',
	);
	const linkClasses = classnames(
		'wp-block-button__link',
		'add_to_cart_button',
		{
			ajax_add_to_cart: true === product.add_to_cart.ajax,
		}
	);

	return (
		<div className={ classes }>
			<a
				href={ product.add_to_cart.url }
				aria-label={ product.add_to_cart.description }
				className={ linkClasses }
				rel="nofollow"
				data-quantity="1"
				data-product_id={ product.id }
				data-product_sku={ product.sku }
			>
				{ product.add_to_cart.text }
			</a>
		</div>
	);
};

ProductButton.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductButton;

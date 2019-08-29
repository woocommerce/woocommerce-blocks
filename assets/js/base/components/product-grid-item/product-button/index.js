/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { Component } from 'react';

class ProductButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	}

	state = {
		buttonText: '',
		addingToCart: false,
	}

	componentDidMount = () => {
		const { product } = this.props;

		if ( product ) {
			// We've removed all selected categories, or no categories have been selected yet.
			this.setState( { buttonText: product.add_to_cart.text } );
		}
	}

	onAddToCart = () => {
		const { product } = this.props;

		this.setState( { addingToCart: true } );

		return apiFetch( {
			method: 'POST',
			path: '/wc/blocks/cart/add',
			data: {
				product_id: product.id,
				quantity: 1,
			},
			cache: 'no-store',
		} ).then( ( response ) => {
			console.log( response );

			const newQuantity = response.quantity;

			this.setState( {
				buttonText: sprintf( __( '%d in cart', 'woo-gutenberg-products-block' ), newQuantity ),
				addingToCart: false,
			} );
		} );
	}

	render = () => {
		const { product, className } = this.props;
		const { addingToCart, buttonText } = this.state;

		const classes = classnames(
			className,
			'wp-block-button',
			{
				loading: addingToCart,
			}
		);

		const linkClasses = classnames(
			'wp-block-button__link',
			'add_to_cart_button',
			{
				ajax_add_to_cart: true === product.add_to_cart.supports_ajax,
			}
		);

		return (
			<div className={ classes }>
				<button
					onClick={ this.onAddToCart }
					aria-label={ product.add_to_cart.description }
					className={ linkClasses }
					rel="nofollow"
					data-quantity="1"
					data-product_id={ product.id }
					data-product_sku={ product.sku }
				>
					{ buttonText }
				</button>
			</div>
		);
	}
};

export default ProductButton;

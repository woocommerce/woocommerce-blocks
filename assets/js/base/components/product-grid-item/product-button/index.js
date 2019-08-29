/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { Component } from 'react';
import { addQueryArgs } from '@wordpress/url';

class ProductButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	}

	state = {
		buttonText: '',
		addingToCart: false,
		addedToCart: false,
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
			const newQuantity = response.quantity;

			this.setState( {
				buttonText: sprintf( __( '%d in cart', 'woo-gutenberg-products-block' ), newQuantity ),
				addingToCart: false,
				addedToCart: true,
			} );
		} ).catch( ( response ) => {
			if ( response.code ) {
				return document.location.href = addQueryArgs( product.permalink, { wc_error: response.message } );
			}

			document.location.href = product.permalink;
		} );
	}

	render = () => {
		const { product, className } = this.props;
		const { addingToCart, addedToCart, buttonText } = this.state;

		const allowAddToCart = ! product.has_options && product.is_purchasable && product.is_in_stock;

		const wrapperClasses = classnames(
			className,
			'wp-block-button',
		);

		const buttonClasses = classnames(
			'wp-block-button__link',
			'add_to_cart_button',
			{
				loading: addingToCart,
				added: addedToCart,
			}
		);

		return (
			<div className={ wrapperClasses }>
				{ allowAddToCart ? (
					<button
						onClick={ this.onAddToCart }
						aria-label={ product.add_to_cart.description }
						className={ buttonClasses }
						disabled={ addingToCart }
					>
						{ buttonText }
					</button>
				) : (
					<a
						href={ product.permalink }
						aria-label={ product.add_to_cart.description }
						className={ buttonClasses }
						rel="nofollow"
					>
						{ buttonText }
					</a>
				) }
			</div>
		);
	}
}

export default ProductButton;

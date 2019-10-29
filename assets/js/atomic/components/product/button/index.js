/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';
import {
	useMemo,
	useCallback,
	useState,
	useEffect,
	useRef,
} from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import { useCollection } from '@woocommerce/base-hooks';
import { COLLECTIONS_STORE_KEY as STORE_KEY } from '@woocommerce/block-data';

const ProductButton = ( { product, className } ) => {
	const {
		id,
		permalink,
		addToCart: productCartDetails,
		hasOptions,
		isPurchasable,
		isInStock,
	} = product;
	const { results: cartResults, isLoading: cartIsLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'cart/items',
	} );
	const currentCartResults = useRef( null );
	const { __experimentalPersistItemToCollection } = useDispatch( STORE_KEY );
	const { cartQuantity, addedToCart } = useMemo( () => {
		const productItem = find( cartResults, { id } );
		return productItem
			? {
					cartQuantity: productItem.quantity,
					addedToCart: true,
			  }
			: {
					cartQuantity: 0,
					addedToCart: false,
			  };
	}, [ cartResults, id ] );
	const [ addingToCart, setAddingToCart ] = useState( false );
	const addToCart = useCallback( () => {
		setAddingToCart( true );
		// exclude this item from the cartResults for adding to the new
		// collection (so it's updated correctly!)
		const collection = cartResults.filter( ( cartItem ) => {
			return cartItem.id !== id;
		} );
		__experimentalPersistItemToCollection(
			'/wc/store',
			'cart/items',
			collection,
			{ id, quantity: 1 }
		);
	}, [ id, cartResults ] );
	useEffect( () => {
		if ( currentCartResults.current !== cartResults ) {
			if ( addingToCart ) {
				setAddingToCart( false );
			}
			currentCartResults.current = cartResults;
		}
	}, [ cartResults, addingToCart ] );
	const getButtonText = useCallback( () => {
		if ( Number.isFinite( cartQuantity ) && cartQuantity !== 0 ) {
			return sprintf(
				__( '%d in cart', 'woo-gutenberg-products-block' ),
				cartQuantity
			);
		}
		return productCartDetails.text;
	}, [ cartQuantity, productCartDetails ] );
	const wrapperClasses = classnames(
		className,
		'wc-block-grid__product-add-to-cart',
		'wp-block-button'
	);

	const buttonClasses = classnames(
		'wp-block-button__link',
		'add_to_cart_button',
		{
			loading: addingToCart,
			added: addedToCart,
		}
	);

	if ( Object.keys( product ).length === 0 || cartIsLoading ) {
		return (
			<div className={ wrapperClasses }>
				<button className={ buttonClasses } disabled={ true } />
			</div>
		);
	}
	const allowAddToCart = ! hasOptions && isPurchasable && isInStock;
	return (
		<div className={ wrapperClasses }>
			{ allowAddToCart ? (
				<button
					onClick={ addToCart }
					aria-label={ productCartDetails.description }
					className={ buttonClasses }
					disabled={ addingToCart }
				>
					{ getButtonText() }
				</button>
			) : (
				<a
					href={ permalink }
					aria-label={ productCartDetails.description }
					className={ buttonClasses }
					rel="nofollow"
				>
					{ getButtonText() }
				</a>
			) }
		</div>
	);
};

ProductButton.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductButton;

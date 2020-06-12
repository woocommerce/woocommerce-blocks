/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import './style.scss';
import { AddToCartFormContextProvider } from './context';
import VariationPicker from './variation-picker';
import GroupedProducts from './grouped-products';
import AddToCartButton from './add-to-cart-button';

/**
 * Product Add to Form Block Component.
 *
 * @param {Object} props                     Incoming props.
 * @param {string} [props.className]         CSS Class name for the component.
 * @param {boolean} [props.showFormElements] Should form elements be shown?
 * @param {Object} [props.product]           Optional product object. Product from context will be
 *                                           used if this is not provided.
 * @return {*} The component.
 */
const Block = ( { className, showFormElements, ...props } ) => {
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product || {};

	// Get data from the product to determine what to show.
	const {
		is_in_stock: isInStock = true,
		type: productType = 'simple',
	} = product;

	// If the product is out of stock we do not show the add to cart form at all.
	if ( ! isInStock ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-product-add-to-cart'
			) }
		>
			<AddToCartFormContextProvider
				product={ product }
				showFormElements={ showFormElements }
			>
				{ productType === 'variable' && (
					<VariationPicker product={ product } />
				) }
				{ productType === 'grouped' && (
					<GroupedProducts product={ product } />
				) }
				<AddToCartButton product={ product } />
			</AddToCartFormContextProvider>
		</div>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;

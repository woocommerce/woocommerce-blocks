/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Product Add to Form Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {*}      children          Child blocks.
 * @param {string} [props.className] CSS Class name for the component.
 * @param {Object} [props.product]   Optional product object. Product from context will be used if
 *                                   this is not provided.
 * @return {*} The component.
 */
const Block = ( { className, children, ...props } ) => {
	const { parentClassName } = useInnerBlockLayoutContext();
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product;

	if ( ! product ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-product-add-to-cart-form',
				`${ parentClassName }__product-add-to-cart-form`
			) }
		>
			{ children }
		</div>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;

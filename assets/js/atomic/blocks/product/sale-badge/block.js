/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import Label from '@woocommerce/base-components/label';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';

/**
 * Product Sale Badge Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @param {string} [props.align]     Alignment of the badge.
 * @param {Object} [props.product]   Optional product object. Product from context will be used if
 *                                   this is not provided.
 * @return {*} The component.
 */
const ProductSaleBadge = ( { className, align, ...props } ) => {
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product;
	const { parentClassName } = useInnerBlockLayoutContext();

	if ( ! product || ! product.on_sale ) {
		return null;
	}

	const alignClass =
		typeof align === 'string'
			? `${ parentClassName }__product-onsale--align${ align }`
			: '';

	return (
		<div
			className={ classnames(
				'wc-block-component__sale-badge',
				className,
				alignClass,
				`${ parentClassName }__product-onsale`
			) }
		>
			<Label
				label={ __( 'Sale', 'woo-gutenberg-products-block' ) }
				screenReaderLabel={ __(
					'Product on sale',
					'woo-gutenberg-products-block'
				) }
			/>
		</div>
	);
};

ProductSaleBadge.propTypes = {
	className: PropTypes.string,
	align: PropTypes.string,
	product: PropTypes.object,
};

export default ProductSaleBadge;

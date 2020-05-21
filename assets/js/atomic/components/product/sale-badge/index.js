/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useInnerBlockConfigurationContext } from '@woocommerce/shared-context';
import Label from '@woocommerce/base-components/label';

const ProductSaleBadge = ( { className, product, align } ) => {
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const componentClass = `${ layoutStyleClassPrefix }__product-onsale`;

	if ( ! product || ! product.on_sale ) {
		return null;
	}

	const alignClass =
		typeof align === 'string' ? `${ componentClass }--align${ align }` : '';

	return (
		<div className={ classnames( className, alignClass, componentClass ) }>
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

export default ProductSaleBadge;

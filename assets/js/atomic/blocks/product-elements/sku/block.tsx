/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import { HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';
import { Attributes } from './types';

type Props = Attributes & HTMLAttributes< HTMLDivElement >;
/**
 * Product SKU Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @return {*} The component.
 */
const Block = ( props: Props ): JSX.Element | null => {
	const { className } = props;
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const sku = product.sku;

	if ( ! sku ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-product-sku',
				{
					[ `${ parentClassName }__product-sku` ]: parentClassName,
				}
			) }
		>
			{ __( 'SKU:', 'woo-gutenberg-products-block' ) }{ ' ' }
			<strong>{ sku }</strong>
		</div>
	);
};

export default withProductDataContext( Block );

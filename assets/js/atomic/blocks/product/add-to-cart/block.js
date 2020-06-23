/**
 * External dependencies
 */
import classnames from 'classnames';
import { AddToCartFormContextProvider } from '@woocommerce/base-context';
import { useProductDataContext } from '@woocommerce/shared-context';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';
import { AddToCartButton } from './shared';
import {
	SimpleProductForm,
	VariableProductForm,
	ExternalProductForm,
	GroupedProductForm,
} from './product-types';

/**
 * Product Add to Form Block Component.
 *
 * @param {Object} props                     Incoming props.
 * @param {string} [props.className]         CSS Class name for the component.
 * @param {boolean} [props.showFormElements] Should form elements be shown?
 * @return {*} The component.
 */
const Block = ( { className, showFormElements } ) => {
	const { product } = useProductDataContext( [
		'id',
		'type',
		'quantity_limit',
		'is_purchasable',
		'is_in_stock',
		'variations',
		'attributes',
	] );

	const componentClass = classnames(
		className,
		'wc-block-components-product-add-to-cart',
		{
			'wc-block-components-product-add-to-cart--placeholder': isEmpty(
				product
			),
		}
	);

	return (
		<AddToCartFormContextProvider
			productId={ product.id || 0 }
			isPurchasable={ product.is_purchasable || true }
			isInStock={ product.is_in_stock || true }
			quantityLimit={ product.quantity_limit || 99 }
			showFormElements={ showFormElements }
		>
			<div className={ componentClass }>
				<>
					{ showFormElements ? (
						<AddToCartForm
							productType={ product.type || 'simple' }
							variations={ product.variations }
							attributes={ product.attributes }
						/>
					) : (
						<AddToCartButton />
					) }
				</>
			</div>
		</AddToCartFormContextProvider>
	);
};

const AddToCartForm = ( { productType, variations, attributes } ) => {
	if ( productType === 'variable' ) {
		return (
			<VariableProductForm
				variations={ variations }
				attributes={ attributes }
			/>
		);
	}
	if ( productType === 'grouped' ) {
		return <GroupedProductForm />;
	}
	if ( productType === 'external' ) {
		return <ExternalProductForm />;
	}
	if ( productType === 'simple' || productType === 'variation' ) {
		return <SimpleProductForm />;
	}
	return null;
};

export default Block;

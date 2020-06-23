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
	const { product } = useProductDataContext( [ 'type' ] );

	const componentClass = classnames(
		className,
		'wc-block-components-product-add-to-cart',
		{
			'wc-block-components-product-add-to-cart--placeholder': isEmpty(
				product
			),
		}
	);

	const FormComponentName = getFormComponentNameFromType(
		product.type || 'simple'
	);

	return (
		<AddToCartFormContextProvider showFormElements={ showFormElements }>
			<div className={ componentClass }>
				<>
					{ showFormElements ? (
						<FormComponentName product={ product } />
					) : (
						<AddToCartButton />
					) }
				</>
			</div>
		</AddToCartFormContextProvider>
	);
};

const getFormComponentNameFromType = ( productType ) => {
	if ( productType === 'variable' ) {
		return VariableProductForm;
	}
	if ( productType === 'grouped' ) {
		return GroupedProductForm;
	}
	if ( productType === 'external' ) {
		return ExternalProductForm;
	}
	return SimpleProductForm;
};

export default Block;

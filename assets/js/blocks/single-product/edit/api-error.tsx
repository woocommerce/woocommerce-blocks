/**
 * External dependencies
 */
import ErrorPlaceholder, {
	ErrorObject,
} from '@woocommerce/editor-components/error-placeholder';

interface ApiErrorProps {
	error: ErrorObject;
	isLoading: boolean;
	getProduct: () => void;
}

/**
 * Shown when there is an API error getting a product.
 *
 * @param {Object}            props            Incoming props for the component.
 * @param {string}            props.error
 * @param {boolean}           props.isLoading
 * @param {function(any):any} props.getProduct
 */
const ApiError = ( { error, isLoading, getProduct }: ApiErrorProps ) => (
	<ErrorPlaceholder
		className="wc-block-single-product-error"
		error={ error }
		isLoading={ isLoading }
		onRetry={ getProduct }
	/>
);

export default ApiError;

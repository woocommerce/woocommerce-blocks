/**
 * External dependencies
 */
import type { ProductResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ErrorObject } from '~/editor-components/error-placeholder';

export interface WithInjectedProductVariations {
	error: ErrorObject | null;
	/**
	 * The id of the currently expanded product
	 */
	expandedProduct: number | null;
	variations: Record< number, ProductResponseItem[] >;
	variationsLoading: boolean;
}

export interface WithInjectedSearchedProducts {
	error: ErrorObject | null;
	isLoading: boolean;
	onSearch: ( ( search: string ) => void ) | null;
	products: ProductResponseItem[];
	selected: number[];
}

export interface WithInjectedInstanceId {
	instanceId: string | number;
}

/**
 * External dependencies
 */
import { ErrorObject } from '@woocommerce/editor-components/error-placeholder';
import { renderItemArgs } from '@woocommerce/editor-components/search-list-control/types';

export interface ReviewsByProductEditorProps {
	attributes: {
		editMode: boolean;
		categoryIds: number[];
		showProductName: boolean;
		productId: number[];
	};
	setAttributes: ( attributes: {
		editMode?: boolean;
		categoryIds?: number[];
		showProductName?: boolean;
		productId?: number[];
	} ) => void;
	debouncedSpeak: ( message: string ) => void;
}

export interface SearchListItemProps extends renderItemArgs {
	name: string;
	reviewCount: number;
}

export interface NoReviewsPlaceholderProps {
	error?: string | ErrorObject;
	getProduct: () => void;
	isLoading?: boolean;
	product?: {
		name: string;
	};
}

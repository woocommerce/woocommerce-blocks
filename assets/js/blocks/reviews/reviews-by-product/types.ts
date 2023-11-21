/**
 * External dependencies
 */
import { ErrorObject } from '@woocommerce/editor-components/error-placeholder';
import { renderItemArgs } from '@woocommerce/editor-components/search-list-control/types';
import { BlockEditProps } from '@wordpress/blocks';

interface ReviewByProductAttributes {
	editMode: boolean;
	productId: number;
}

export interface ReviewsByProductEditorProps
	extends BlockEditProps< ReviewByProductAttributes > {
	attributes: ReviewByProductAttributes;
	debouncedSpeak: ( message: string ) => void;
}

export interface NoReviewsPlaceholderProps {
	error: ErrorObject;
	getProduct: () => void;
	isLoading: boolean;
	product?: {
		name: string;
	};
}

export interface SearchListItemProps extends renderItemArgs {
	name: string;
	reviewCount: number;
}

/**
 * External dependencies
 */
import { ChangeEventHandler } from 'react';

export type Attributes = {
	columns: number;
	rows: number;
	alignButtons?: string;
	align?: string;
	contentVisibility?: {
		orderBy: string;
	};
	orderby?: string;
	order?: string;
};

interface GenerateQueryProps {
	sortValue: string;
	currentPage: number;
	attributes: Attributes;
}

export type Query = {
	catalog_visibility: 'catalog';
	per_page: number;
	page: number;
} & Partial< ReturnType< GetSortArgs > >;

export type TotalQuery = Pick< Query, 'catalog_visibility' >;

export type GenerateQuery = ( props: GenerateQueryProps ) => Query;

export type GetSortArgs = (
	orderName: string
) =>
	| {
			orderby: string;
			order: string;
	  }
	| undefined;

export type AreQueryTotalsDifferent = (
	next: {
		totalQuery: TotalQuery;
		totalProducts: number;
	},
	current?: {
		totalQuery?: TotalQuery;
	}
) => boolean;

export interface ProductListProps {
	attributes: Attributes;
	currentPage: number;
	onPageChange: ( page: number ) => void;
	onSortChange: ChangeEventHandler;
	sortValue: string;
	scrollToTop: ( opts: { focusableSelector: string } ) => void;
}

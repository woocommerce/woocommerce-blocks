export interface Attributes {
	headingLevel: number;
	showProductLink: boolean;
	linkTarget?: string;
	productId: number;
	align: string;
}

export interface Props {
	align: string;
	color: string;
	customColor: string;
	fontSize: string;
	customFontSize: string;
}

// TODO: Move this Context interface to assets/js/types/type-defs/contexts.ts
export interface Context {
	query: object;
	queryId: number;
	productId: number;
}

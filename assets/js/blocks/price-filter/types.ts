interface Attributes {
	showFilterButton: boolean;
	showInputFields: boolean;
	inlineInput: boolean;
	heading: string;
	headingLevel: number;
	className?: string;
}
export interface PriceFilterBlockProps {
	attributes: Attributes;
	isEditor: boolean;
}

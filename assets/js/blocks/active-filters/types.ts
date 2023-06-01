export interface Attributes {
	heading: string;
	headingLevel: number;
	displayStyle: string;
	className?: string;
}

export interface ActiveFiltersBlockProps {
	/**
	 * The attributes for this block.
	 */
	attributes: Attributes;
	/**
	 * Whether it's in the editor or frontend display.
	 */
	isEditor: boolean;
}

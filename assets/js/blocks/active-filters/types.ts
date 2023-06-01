export interface ActiveFiltersBlockProps {
	/**
	 * The attributes for this block.
	 */
	heading: string;
	headingLevel: number;
	displayStyle: string;
	className?: string;
	/**
	 * Whether it's in the editor or frontend display.
	 */
	isEditor?: boolean;
}

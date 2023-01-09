export interface Attributes {
	className?: string;
	displayStyle: DisplayStyle;
}

export enum DisplayStyle {
	ICON_AND_TEXT = 'icon_and_text',
	TEXT_ONLY = 'text_only',
	ICON_ONLY = 'icon_only',
}

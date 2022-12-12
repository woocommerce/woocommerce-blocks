export interface Attributes {
	className?: string;
	customerAccountDisplayStyle: string;
	customerAccountIconStyle: string;
}

export enum CustomerAccountDisplayValue {
	ICON_AND_TEXT = 'icon_and_text',
	TEXT_ONLY = 'text_only',
	ICON_ONLY = 'icon_only',
}

export enum CustomerAccountIconValue {
	DEFAULT = 'default',
	ALT = 'alt',
}

export interface Attributes {
	className?: string;
	showCounts: boolean;
	isPreview?: boolean;
	displayStyle: string;
	selectType: string;
}

export interface DisplayOption {
	value: string;
	name: string;
	label: JSX.Element;
	textLabel: string;
}

export type Current = {
	slug: string;
	name: string;
};

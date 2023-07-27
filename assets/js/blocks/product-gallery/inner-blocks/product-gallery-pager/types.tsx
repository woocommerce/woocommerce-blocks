export enum PagerDisplayModes {
	DIGITS = 'digits',
	DOTS = 'dots',
	OFF = 'off',
}

export interface BlockAttributes {
	pagerDisplayMode: PagerDisplayModes;
}

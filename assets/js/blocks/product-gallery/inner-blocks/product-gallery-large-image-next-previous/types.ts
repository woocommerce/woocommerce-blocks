export enum NextPreviousButtonSettingValues {
	off = 'off',
	insideTheImage = 'insideTheImage',
	outsideTheImage = 'outsideTheImage',
}

export type BlockAttributes = {
	buttonPosition: NextPreviousButtonSettingValues;
};

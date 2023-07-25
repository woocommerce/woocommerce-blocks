export interface BlockAttributes {
	thumbnailsPosition: string;
	thumbnailsNumberOfThumbnails: number;
	clientId: string;
}

export interface Context {
	context: {
		thumbnailsPosition: string;
		thumbnailsNumberOfThumbnails: number;
		clientId: string;
	};
}

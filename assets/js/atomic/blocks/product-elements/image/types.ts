export interface BlockAttributes {
	productId: number;
	showProductLink: boolean;
	showSaleBadge: boolean;
	saleBadgeAlign: 'left' | 'center' | 'right';
	imageSizing: 'full-size' | 'cropped';
	isDescendentOfQueryLoop: boolean;
}

export type StockStatus = 'instock' | 'outofstock' | 'onbackorder';

export type stockStatusOptions = {
	[ key in StockStatus ]: string;
};

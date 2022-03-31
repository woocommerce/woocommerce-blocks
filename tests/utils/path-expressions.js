export const getProductNamePathExpression = ( productTitle ) =>
	`a[contains(text(), "${ productTitle }")]`;

export const getQtyItemPathExpression = ( args ) =>
	'div[@class="wc-block-cart-item__quantity" and div[@class="wc-block-components-quantity-selector" and ' +
	getQtyInputPathExpression( args ) +
	']]';

export const getQtyInputPathExpression = ( args = {} ) => {
	let qtyValue = '';

	if ( args.qty ) {
		qtyValue = ` and @value="${ args.qty }"`;
	}

	return (
		'input[contains(@class, "wc-block-components-quantity-selector__input")' +
		qtyValue +
		']'
	);
};

export const getQtyPlusButtonPathExpression = () => {
	return 'button[contains(@class, "wc-block-components-quantity-selector__button--plus")]';
};

export const getQtyMinusButtonPathExpression = () => {
	return 'button[contains(@class, "wc-block-components-quantity-selector__button--minus")]';
};

export const getCartItemPathExpression = ( productTitle, args ) =>
	'//div[@class="wc-block-cart-item__wrap" and ' +
	getProductNamePathExpression( productTitle ) +
	' and ' +
	getQtyItemPathExpression( args ) +
	']';

export const getOrderDetailsDiscountPathExpression = ( amount ) => {
	return `//tr[th[contains(text(), "Discount:")] and //span[contains(text(), "${ amount }")]]`;
};

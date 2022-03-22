export const getProductNameExpression = ( productTitle ) =>
	`a[contains(text(), "${ productTitle }")]`;

export const getQtyItemExpression = ( args ) =>
	'div[@class="wc-block-cart-item__quantity" and div[@class="wc-block-components-quantity-selector" and ' +
	getQtyInputExpression( args ) +
	']]';

export const getQtyInputExpression = ( args = {} ) => {
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

export const getQtyPlusButtonExpression = () => {
	return 'button[contains(@class, "wc-block-components-quantity-selector__button--plus")]';
};

export const getQtyMinusButtonExpression = () => {
	return 'button[contains(@class, "wc-block-components-quantity-selector__button--minus")]';
};

export const getCartItemExpression = ( productTitle, args ) =>
	'//div[@class="wc-block-cart-item__wrap" and ' +
	getProductNameExpression( productTitle ) +
	' and ' +
	getQtyItemExpression( args ) +
	']';

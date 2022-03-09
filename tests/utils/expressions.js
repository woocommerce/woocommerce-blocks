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

export const getCartItemExpression = ( productTitle, args ) =>
	'//tr[contains(@class, "wc-block-cart-items__row") and ' +
	'td[@class="wc-block-cart-item__product" and div[@class="wc-block-cart-item__wrap" and ' +
	getProductNameExpression( productTitle ) +
	' and ' +
	getQtyItemExpression( args ) +
	']]]';

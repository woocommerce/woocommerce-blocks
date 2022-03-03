describe( 'Shopper → Cart → Adjust and remove product', () => {
	// prettier-ignore
	it( 'can adjust product quantity and remove product', function () {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/cart-block' ).wait( 1000 );
		cy.get( '.wc-block-components-quantity-selector__input' ).should( 'have.value', 1 ).wait( 1000 );
		cy.get( '.wc-block-components-quantity-selector__button--plus' ).click();
		cy.get( '.wc-block-components-quantity-selector__input' ).should( 'have.value', 2 ).wait( 1000 );
		cy.get( '.wc-block-components-quantity-selector__button--minus' ).click();
		cy.get( '.wc-block-components-quantity-selector__input' ).should( 'have.value', 1 ).wait( 1000 );
		cy.get( '.wc-block-cart-item__remove-link' ).click();
		cy.contains( 'Your cart is currently empty!' );
	} );
} );

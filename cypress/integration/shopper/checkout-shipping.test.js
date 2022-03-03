describe( 'Shopper → Checkout → Shipping options', () => {
	before( () => {
		cy.fixture( 'user.json' ).then( ( user ) => {
			cy.login( user );
		} );
	} );

	it( 'can use flat rate shipping', () => {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
		cy.contains( 'Flat rate shipping' ).click();
		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
		cy.contains( 'Flat rate shipping' );
	} );

	it( 'can use free shipping', () => {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
		cy.contains( 'Free shipping' ).click();
		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
		cy.contains( 'Free shipping' );
	} );
} );

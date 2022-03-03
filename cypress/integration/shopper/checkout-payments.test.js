describe( 'Shopper → Checkout → Payment options', () => {
	before( () => {
		cy.fixture( 'user.json' ).then( ( user ) => {
			cy.login( user );
		} );
	} );

	it( 'can use direct bank transfer', () => {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
		cy.contains( 'Direct bank transfer' ).click();
		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
		cy.contains( 'Direct bank transfer instructions' );
	} );

	it( 'can use cash on delivery', () => {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
		cy.contains( 'Cash on delivery' ).click();
		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
		cy.contains( 'Cash on delivery instructions' );
	} );

	it( 'can use check payments', () => {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
		cy.contains( 'Check payments' ).click();
		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
		cy.contains( 'Check payments instructions' );
	} );
} );

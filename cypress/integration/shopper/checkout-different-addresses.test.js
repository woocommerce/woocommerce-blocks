describe( 'Shopper → Checkout → Billing and shipping addresses', () => {
	before( function () {
		cy.fixture( 'user' ).then( ( user ) => {
			this.user = user;
			cy.login( user );
		} );
	} );

	// prettier-ignore
	it( 'can have different billing and shipping addresses', function() {
		cy.visit( '/shop' );
		cy.contains( 'Beanie with Logo' ).click();
		cy.contains( 'Add to cart' ).click();
		cy.visit( '/checkout-block' );
        cy.contains( 'Free shipping' ).click().wait( 1000 );
		cy.contains( 'Use same address for billing' ).click()

        cy.get( '#email' ).clear().type( this.user.billing.email );
        cy.get( '#shipping-first_name' ).clear().type( this.user.shipping.firstname );
		cy.get( '#shipping-last_name' ).clear().type( this.user.shipping.lastname );
		cy.get( '#shipping-company' ).clear().type( this.user.shipping.company );
		cy.get( '#shipping-address_1' ).clear().type( this.user.shipping.addressfirstline );
		cy.get( '#shipping-address_2' ).clear().type( this.user.shipping.addresssecondline );
		cy.get( '#shipping-country' ).clear().type( this.user.shipping.country );
		cy.get( '#shipping-city' ).clear().type( this.user.shipping.city );
		cy.get( '#shipping-state' ).clear().type( this.user.shipping.state );
		cy.get( '#shipping-postcode' ).clear().type( this.user.shipping.postcode );
        cy.get( '#shipping-phone' ).clear().type( this.user.shipping.phone );
        cy.get( '#billing-first_name' ).clear().type( this.user.billing.firstname )
        cy.get( '#billing-last_name' ).clear().type( this.user.billing.lastname );
        cy.get( '#billing-company' ).clear().type( this.user.billing.company );
        cy.get( '#billing-address_1' ).clear().type( this.user.billing.addressfirstline );
        cy.get( '#billing-address_2' ).clear().type( this.user.billing.addresssecondline );
        cy.get( '#billing-country' ).clear().type( this.user.billing.country );
        cy.get( '#billing-city' ).clear().type( this.user.billing.city );
        cy.get( '#billing-state' ).clear().type( this.user.billing.state );
        cy.get( '#billing-postcode' ).clear().type( this.user.billing.postcode );
        cy.get( '#phone' ).clear().type( this.user.billing.phone );

		cy.contains( 'Place Order' ).click();
		cy.contains( 'Order received' );
        cy.contains( this.user.billing.email );
		cy.contains( this.user.shipping.firstname );
		cy.contains( this.user.shipping.lastname );
		cy.contains( this.user.shipping.company );
		// cy.contains( this.user.shipping.country );
		cy.contains( this.user.shipping.addressfirstline );
		cy.contains( this.user.shipping.addresssecondline );
		cy.contains( this.user.shipping.postcode );
		cy.contains( this.user.billing.firstname );
		cy.contains( this.user.billing.lastname );
		cy.contains( this.user.billing.company );
		// cy.contains( this.user.billing.country );
		cy.contains( this.user.billing.addressfirstline );
		cy.contains( this.user.billing.addresssecondline );
		cy.contains( this.user.billing.city );
		cy.contains( this.user.billing.state );
		cy.contains( this.user.billing.postcode );
		cy.contains( this.user.billing.phone );
	} );
} );

Cypress.Commands.add( 'login', ( user ) => {
	cy.visit( '/wp-login.php' ).wait( 500 );
	cy.get( '#user_login' ).clear().type( user.username );
	cy.get( '#user_pass' ).clear().type( user.password );
	cy.get( '#wp-submit' ).click();
} );

Cypress.Commands.add( 'logout', () => {
	cy.visit( '/wp-login.php?action=logout' ).wait( 500 );
} );

// Whitelist WordPress cookies to remain logged in.
Cypress.Cookies.defaults( {
	preserve: /wordpress_.*/,
} );

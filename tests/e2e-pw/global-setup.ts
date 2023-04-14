/**
 * External dependencies
 */
import { chromium, expect } from '@playwright/test';
import fs from 'fs';

/**
 * Internal dependencies
 */
import { admin, customer } from './test-data/data/data';

module.exports = async ( config ) => {
	const { stateDir, baseURL, userAgent } = config.projects[ 0 ].use;

	console.log( `State Dir: ${ stateDir }` ); // eslint-disable-line no-console
	console.log( `Base URL: ${ baseURL }` ); // eslint-disable-line no-console

	// used throughout tests for authentication
	process.env.ADMINSTATE = `${ stateDir }adminState.json`;
	process.env.CUSTOMERSTATE = `${ stateDir }customerState.json`;

	// Clear out the previous save states
	try {
		fs.unlinkSync( process.env.ADMINSTATE );
		console.log( 'Admin state file deleted successfully.' ); // eslint-disable-line no-console
	} catch ( err ) {
		if ( err.code === 'ENOENT' ) {
			console.log( 'Admin state file does not exist.' ); // eslint-disable-line no-console
		} else {
			console.log( 'Admin state file could not be deleted: ' + err ); // eslint-disable-line no-console
		}
	}
	try {
		fs.unlinkSync( process.env.CUSTOMERSTATE );
		console.log( 'Customer state file deleted successfully.' ); // eslint-disable-line no-console
	} catch ( err ) {
		if ( err.code === 'ENOENT' ) {
			console.log( 'Customer state file does not exist.' ); // eslint-disable-line no-console
		} else {
			console.log( 'Customer state file could not be deleted: ' + err ); // eslint-disable-line no-console
		}
	}

	// Pre-requisites
	let adminLoggedIn = false;
	let customerLoggedIn = false;

	// Specify user agent when running against an external test site to avoid getting HTTP 406 NOT ACCEPTABLE errors.
	const contextOptions = { baseURL, userAgent };

	// Create browser, browserContext, and page for customer and admin users
	const browser = await chromium.launch();
	const adminContext = await browser.newContext( contextOptions );
	const customerContext = await browser.newContext( contextOptions );
	const adminPage = await adminContext.newPage();
	const customerPage = await customerContext.newPage();

	// Sign in as admin user and save state
	const adminRetries = 5;
	for ( let i = 0; i < adminRetries; i++ ) {
		try {
			console.log( 'Trying to log-in as admin...' ); // eslint-disable-line no-console
			await adminPage.goto( `/wp-admin` );
			await adminPage.fill( 'input[name="log"]', admin.username );
			await adminPage.fill( 'input[name="pwd"]', admin.password );
			await adminPage.click( 'text=Log In' );
			await adminPage.waitForLoadState( 'networkidle' );
			await adminPage.goto( `/wp-admin` );
			await adminPage.waitForLoadState( 'domcontentloaded' );

			await expect( adminPage.locator( 'div.wrap > h1' ) ).toHaveText(
				'Dashboard'
			);
			await adminPage
				.context()
				.storageState( { path: process.env.ADMINSTATE } );
			console.log( 'Logged-in as admin successfully.' ); // eslint-disable-line no-console
			adminLoggedIn = true;
			break;
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.log(
				`Admin log-in failed, Retrying... ${ i }/${ adminRetries }`
			);
			console.log( e ); // eslint-disable-line no-console
		}
	}

	if ( ! adminLoggedIn ) {
		// eslint-disable-next-line no-console
		console.error(
			'Cannot proceed e2e test, as admin login failed. Please check if the test site has been setup correctly.'
		);

		process.exit( 1 );
	}

	// Sign in as customer user and save state
	const customerRetries = 5;
	for ( let i = 0; i < customerRetries; i++ ) {
		try {
			console.log( 'Trying to log-in as customer...' ); // eslint-disable-line no-console
			await customerPage.goto( `/wp-admin` );
			await customerPage.fill( 'input[name="log"]', customer.username );
			await customerPage.fill( 'input[name="pwd"]', customer.password );
			await customerPage.click( 'text=Log In' );

			await customerPage.goto( `/my-account` );
			await expect(
				customerPage.locator(
					'.woocommerce-MyAccount-navigation-link--customer-logout'
				)
			).toBeVisible();
			await expect(
				customerPage.locator(
					'div.woocommerce-MyAccount-content > p >> nth=0'
				)
			).toContainText( 'Hello' );

			await customerPage
				.context()
				.storageState( { path: process.env.CUSTOMERSTATE } );
			console.log( 'Logged-in as customer successfully.' ); // eslint-disable-line no-console
			customerLoggedIn = true;
			break;
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.log(
				`Customer log-in failed. Retrying... ${ i }/${ customerRetries }`
			);
			console.log( e ); // eslint-disable-line no-console
		}
	}

	if ( ! customerLoggedIn ) {
		// eslint-disable-next-line no-console
		console.error(
			'Cannot proceed e2e test, as customer login failed. Please check if the test site has been setup correctly.'
		);
		process.exit( 1 );
	}

	await adminContext.close();
	await customerContext.close();
	await browser.close();
};

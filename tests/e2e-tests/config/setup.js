/**
 * External dependencies
 */
import { setup as setupPuppeteer } from 'jest-environment-puppeteer';
/**
 * Internal dependencies
 */
import {
	setupSettings,
	createTaxes,
	createCoupons,
	createProducts,
	createShippingMethods,
	enablePaymentGateways,
} from './fixture-loaders';

module.exports = async ( globalConfig ) => {
	await setupPuppeteer( globalConfig );
	Promise.all( [
		setupSettings(),
		createTaxes(),
		createCoupons(),
		createProducts(),
		createShippingMethods(),
		enablePaymentGateways(),
	] ).then( ( results ) => {
		const [ , taxes, coupons, products, shippingMethods ] = results;
		global.wc = {
			taxes,
			coupons,
			products,
			shippingMethods,
		};
	} );
};

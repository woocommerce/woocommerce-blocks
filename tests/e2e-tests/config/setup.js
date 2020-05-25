/* eslint-disable no-console */
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
	createShippingZones,
	enablePaymentGateways,
} from '../fixtures/fixture-loaders';

module.exports = async ( globalConfig ) => {
	// we need to load puppeteer global setup here.
	await setupPuppeteer( globalConfig );

	/**
	 * Promise.all will return an array of all promises resolved values.
	 * Some functions like setupSettings and enablePaymentGateways resolve
	 * to server data so we ignore the values here.
	 */
	return Promise.all( [
		setupSettings(),
		createTaxes(),
		createCoupons(),
		createProducts(),
		createShippingZones(),
		enablePaymentGateways(),
	] )
		.then( ( results ) => {
			const [ , taxes, coupons, products, shippingZones ] = results;
			global.wc = {
				taxes,
				coupons,
				products,
				shippingZones,
			};
		} )
		.catch( console.log );
};

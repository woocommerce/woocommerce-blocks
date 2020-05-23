/**
 * Internal dependencies
 */
const {
	setupSettings,
	createTaxes,
	createCoupons,
	createProducts,
	createShippingMethods,
	enablePaymentGateways,
} = require( './fixture-loaders' );
const { setup: setupPuppeteer } = require( 'jest-environment-puppeteer' );

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

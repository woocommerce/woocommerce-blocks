/**
 * Internal dependencies
 */
const {
	deleteTaxes,
	deleteCoupons,
	deleteProducts,
	deleteShippingZones,
} = require( './fixture-loaders' );
const { teardown: teardownPuppeteer } = require( 'jest-environment-puppeteer' );
module.exports = async ( globalConfig ) => {
	await teardownPuppeteer( globalConfig );
	const { taxes, coupons, products, shippingMethods } = global.wc;
	Promise.all( [
		deleteTaxes( taxes ),
		deleteCoupons( coupons ),
		deleteProducts( products ),
		deleteShippingZones( shippingMethods ),
	] );
};

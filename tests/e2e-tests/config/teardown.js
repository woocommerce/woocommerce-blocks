/**
 * Internal dependencies
 */
const {
	deleteTaxes,
	deleteCoupons,
	deleteProducts,
	deleteShippingZone,
} = require( './fixture-loaders' );
const { teardown: teardownPuppeteer } = require( 'jest-environment-puppeteer' );
module.exports = async ( globalConfig ) => {
	await teardownPuppeteer( globalConfig );
	const { taxes, coupons, products, shippingMethod } = global.wc;
	Promise.all( [
		deleteTaxes( taxes ),
		deleteCoupons( coupons ),
		deleteProducts( products ),
		deleteShippingZone( shippingMethod ),
	] );
};

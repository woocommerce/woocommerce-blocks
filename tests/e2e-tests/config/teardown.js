/**
 * External dependencies
 */
import { teardown as teardownPuppeteer } from 'jest-environment-puppeteer';

/**
 * Internal dependencies
 */
import {
	deleteTaxes,
	deleteCoupons,
	deleteProducts,
	deleteShippingZones,
} from './fixture-loaders';

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

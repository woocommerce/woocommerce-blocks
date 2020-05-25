/**
 * External dependencies
 */
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

require( 'dotenv' ).config();

/**
 * ConsumerKey and ConsumerSecret are not used, we use basic auth, but
 * not providing them will throw an error.
 */
const WooCommerce = new WooCommerceRestApi( {
	url: `${ process.env.WORDPRESS_BASE_URL }:${ process.env.WORDPRESS_PORT }/`,
	consumerKey: 'consumer_key', // Your consumer key
	consumerSecret: 'consumer_secret', // Your consumer secret
	version: 'wc/v3',
	axiosConfig: {
		auth: {
			username: process.env.WORDPRESS_LOGIN,
			password: process.env.WORDPRESS_PASSWORD,
		},
	},
} );

/**
 * prepare some store settings.
 *
 * @return {Promise} return a promise that resolves to the created data or
 * reject if the request failed.
 */
const setupSettings = () =>
	WooCommerce.post( 'settings/general/batch', {
		update: [
			{
				id: 'woocommerce_store_address',
				value: '60 29th Street #343',
			},
			{
				id: 'woocommerce_store_city',
				value: 'San Francisco',
			},
			{
				id: 'woocommerce_store_country',
				value: 'US:CA',
			},
			{
				id: 'woocommerce_store_postcode',
				value: '94110',
			},
			{
				id: 'woocommerce_allowed_countries',
				value: 'specific',
			},
			{
				id: 'woocommerce_specific_allowed_countries',
				value: [ 'DZ', 'CA', 'NZ', 'ES', 'GB', 'US' ],
			},
			{
				id: 'woocommerce_ship_to_countries',
				value: 'specific',
			},
			{
				id: 'woocommerce_specific_ship_to_countries',
				value: [ 'DZ', 'CA', 'NZ', 'ES', 'GB', 'US' ],
			},
			{
				id: 'woocommerce_enable_coupons',
				value: 'yes',
			},
			{
				id: 'woocommerce_calc_taxes',
				value: 'yes',
			},
			{
				id: 'woocommerce_currency',
				value: 'USD',
			},
		],
	} );

/**
 * Create taxes.
 *
 * @return {Promise} a promise that resolves to an array of newly created taxes,
 * or rejects if the request failed.
 */
const createTaxes = () =>
	WooCommerce.post( 'taxes/batch', {
		create: [
			{
				country: 'US',
				rate: '5.0000',
				name: 'State Tax',
				shipping: false,
				priority: 1,
			},
			{
				country: 'US',
				rate: '10.000',
				name: 'Sale Tax',
				shipping: false,
				priority: 2,
			},
			{
				country: 'UK',
				rate: '20.000',
				name: 'VAT',
				shipping: false,
			},
		],
	} ).then( ( response ) =>
		response.data.create.map( ( taxes ) => taxes.id )
	);
/**
 * Delete taxes.
 *
 * @param {number[]} ids an array of taxes IDs to delete.
 *
 * @return {Promise} return a promise that resolves to the deleted data or
 * reject if the request failed.
 */
const deleteTaxes = ( ids ) =>
	WooCommerce.post( 'taxes/batch', {
		delete: ids,
	} );

/**
 * Create Coupons.
 *
 * @return {Promise} a promise that resolves to an array of newly created coupons,
 * or rejects if the request failed.
 */
const createCoupons = () => {
	const coupons = [
		{
			code: 'coupon',
			discount_type: 'fixed_cart',
			amount: '5',
		},
		{
			code: 'oldcoupon',
			discount_type: 'fixed_cart',
			amount: '5',
			date_expires: '2020-01-01',
		},
		{
			code: 'below100',
			discount_type: 'percent',
			amount: '20',
			maximum_amount: '100.00',
		},
		{
			code: 'above50',
			discount_type: 'percent',
			amount: '20',
			minimum_amount: '50.00',
		},
		{
			code: 'a12s',
			discount_type: 'percent',
			amount: '100',
			individual_use: true,
			email_restrictions: '*@automattic.com%2C *@a8c.com',
		},
		{
			code: 'freeshipping',
			discount_type: 'percent',
			amount: '0',
			free_shipping: true,
		},
	];
	return WooCommerce.post( 'coupons/batch', {
		create: coupons,
	} ).then( ( response ) =>
		response.data.create.map( ( coupon ) => coupon.id )
	);
};

/**
 * Delete coupons.
 *
 * @param {number[]} ids an array of coupons IDs to delete.
 *
 * @return {Promise} return a promise that resolves to the deleted data or
 * reject if the request failed.
 */
const deleteCoupons = ( ids ) =>
	WooCommerce.post( 'coupons/batch', {
		delete: ids,
	} );
/**
 * Create Products and call createReviews.
 *
 * @return {Promise} a promise that resolves to an array of newly created products,
 * or rejects if the request failed.
 *
 * currently this only creates a single product for the sake of reviews.
 * @todo: add more products to e2e fixtures data.
 */
const createProducts = () =>
	WooCommerce.post( 'products/batch', {
		create: [
			{
				name: 'Woo Single #1',
				type: 'simple',
				regular_price: '21.99',
				virtual: true,
				downloadable: true,
				downloads: [
					{
						name: 'Woo Single',
						file:
							'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg',
					},
				],
				images: [
					{
						src:
							'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg',
					},
				],
			},
		],
	} ).then( ( products ) => {
		createReviews( products.data.create[ 0 ].id );
		return products.data.create.map( ( product ) => product.id );
	} );

/**
 * Delete products.
 *
 * Deleting products will also delete review.
 *
 * @param {number[]} ids an array of products IDs to delete.
 *
 * @return {Promise} return a promise that resolves to the deleted data or
 * reject if the request failed.
 */
const deleteProducts = ( ids ) =>
	WooCommerce.post( 'products/batch', {
		delete: ids,
	} );

/**
 * Create Reviews.
 *
 * This is not called directly but is called within createProducts.
 *
 * @param {number} id product id to assign reviews to.
 *
 * @return {Promise} a promise that resolves to an server response data, or
 * rejects if the request failed.
 *
 */
const createReviews = ( id ) =>
	WooCommerce.post( 'products/reviews/batch', {
		create: [
			{
				product_id: id,
				review: 'Looks fine',
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 4,
			},
			{
				product_id: id,
				review: 'I love this album',
				reviewer: 'John Doe',
				reviewer_email: 'john.doe@example.com',
				rating: 5,
			},
			{
				product_id: id,
				review: 'a fine review',
				reviewer: "John Doe' niece",
				reviewer_email: 'john.doe@example.com',
				rating: 5,
			},
		],
	} );

/**
 * Enable Cheque payments.
 *
 * This is not called directly but is called within enablePaymentGateways.
 *
 * @return {Promise} a promise that resolves to an server response data, or
 * rejects if the request failed.
 */
const enableCheque = () =>
	WooCommerce.post( 'payment_gateways/cheque', {
		enabled: true,
	} );

/**
 * Enable Paypal payments.
 *
 * This is not called directly but is called within enablePaymentGateways.
 *
 * @return {Promise} a promise that resolves to an server response data, or
 * rejects if the request failed.
 */
const enablePaypal = () =>
	WooCommerce.post( 'payment_gateways/paypal', {
		enabled: true,
	} );

/**
 * Enable payment gateways.
 *
 * It calls other individual payment gateway functions.
 *
 * @return {Promise} a promise that resolves to an array of server response
 * data, or rejects if the request failed.
 */
const enablePaymentGateways = () =>
	Promise.all( [ enableCheque(), enablePaypal() ] );

/**
 * Create shipping zones.
 *
 * Shipping locations need to be assigned to a zone, and shipping methods need
 * to be assigned to a shipping location, this create a shipping zone and location
 * and methods.
 *
 * @return {Promise} a promise that resolves to an array of newly created shipping
 * zones IDs, or rejects if the request failed.
 */
const createShippingZones = () => {
	const UKShipping = () =>
		WooCommerce.post( 'shipping/zones', { name: 'UK' } )
			.then( ( response ) => {
				return response.data.id;
			} )
			.then( ( zoneId ) => {
				WooCommerce.put( `shipping/zones/${ zoneId }/locations`, {
					code: 'UK',
				} );
				return zoneId;
			} )
			.then( ( zoneId ) => {
				WooCommerce.post( `shipping/zones/${ zoneId }/methods`, {
					method_id: 'flat_rate',
					settings: {
						title: 'Normal Shipping',
						cost: '20.00',
					},
				} );
				return zoneId;
			} )
			.then( ( zoneId ) => {
				WooCommerce.post( `shipping/zones/${ zoneId }/methods`, {
					method_id: 'free_shipping',
					settings: {
						title: 'Free Shipping',
						cost: '00.00',
						requires: 'coupon',
					},
				} );
				return zoneId;
			} );

	return Promise.all( [ UKShipping() ] );
};

/**
 * Delete Shipping zones.
 *
 * Deleting a shipping will also delete location and methods defined within it.
 *
 * @param {number[]} ids an array of shipping zones IDs to delete.
 *
 * @return {Promise} return a promise that resolves to an array of deleted data or
 * reject if the request failed.
 */
const deleteShippingZones = ( ids ) => {
	const deleteZone = ( id ) =>
		WooCommerce.delete( `shipping/zones/${ id }`, {
			force: true,
		} );
	return Promise.all( ids.map( deleteZone ) );
};

module.exports = {
	setupSettings,
	createTaxes,
	deleteTaxes,
	createCoupons,
	deleteCoupons,
	createProducts,
	deleteProducts,
	enablePaymentGateways,
	createShippingZones,
	deleteShippingZones,
};

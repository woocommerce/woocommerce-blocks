/* eslint-disable no-console */
/**
 * External dependencies
 */
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

require( 'dotenv' ).config();

const WooCommerce = new WooCommerceRestApi( {
	url: `${ process.env.WORDPRESS_BASE_URL }:${ process.env.WORDPRESS_PORT }/`, // Your store URL
	consumerKey: 'consumer_key', // Your consumer key
	consumerSecret: 'consumer_secret', // Your consumer secret
	version: 'wc/v3', // WooCommerce WP REST API version
	axiosConfig: {
		auth: {
			username: process.env.WORDPRESS_LOGIN,
			password: process.env.WORDPRESS_PASSWORD,
		},
	},
} );

const setupSettings = () => {
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
	} ).catch( ( error ) => console.log( error ) );
};

const createTaxes = () => {
	return WooCommerce.post( 'taxes/batch', {
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
	} )
		.then( ( response ) =>
			response.data.create.map( ( taxes ) => taxes.id )
		)
		.catch( ( error ) => console.log( error ) );
};

const deleteTaxes = ( ids ) => {
	WooCommerce.post( 'taxes/batch', {
		delete: ids,
	} ).catch( ( error ) => console.log( error ) );
};
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
	return WooCommerce.post( 'coupons/batch', { create: coupons } )
		.then( ( response ) =>
			response.data.create.map( ( coupon ) => coupon.id )
		)
		.catch( ( e ) => console.log( e.response.data.message ) );
};
const deleteCoupons = ( ids ) => {
	return WooCommerce.post( 'coupons/batch', {
		delete: ids,
	} ).catch( ( error ) => console.log( error ) );
};
// currently this only creates a single product for the sake of review
// more products will be added later
const createProducts = () => {
	return WooCommerce.post( 'products/batch', {
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
	} )
		.then( ( products ) => {
			createReviews( products.data.create[ 0 ].id );
			return products.data.create.map( ( product ) => product.id );
		} )
		.catch( ( e ) => console.log( e.response.data.message ) );
};
// deleting products will also delete review.
const deleteProducts = ( ids ) => {
	WooCommerce.post( 'products/batch', {
		delete: ids,
	} ).catch( ( error ) => console.log( error ) );
};
const createReviews = ( id ) => {
	return WooCommerce.post( 'products/reviews/batch', {
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
	} ).catch( ( e ) => console.log( e.response.data.message ) );
};
const enableCheque = () => {
	return WooCommerce.post( 'payment_gateways/cheque', {
		enabled: true,
	} ).catch( ( error ) => console.log( error ) );
};
const enablePaypal = () => {
	return WooCommerce.post( 'payment_gateways/paypal', {
		enabled: true,
	} ).catch( ( error ) => console.log( error ) );
};

const enablePaymentGateways = () => {
	Promise.all( [ enableCheque(), enablePaypal() ] );
};

const createShippingMethods = () => {
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
			} )
			.catch( ( e ) => console.log( e.response.data.message ) );

	return Promise.all( [ UKShipping() ] );
};
// deleting a zone will also delete methods and locations.
const deleteShippingZones = ( ids ) => {
	const deleteZone = ( id ) =>
		WooCommerce.delete( `shipping/zones/${ id }`, {
			force: true,
		} ).catch( ( error ) => console.log( error ) );
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
	createShippingMethods,
	deleteShippingZones,
};

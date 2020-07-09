/**
 * External dependencies
 */
const { omit } = require( 'lodash' );
const glob = require( 'glob' );

const blocks = {
	'handpicked-products': {
		dir: 'handpicked-products',
	},
	'product-best-sellers': {
		dir: 'product-best-sellers',
	},
	'product-category': {
		dir: 'product-category',
	},
	'product-categories': {
		dir: 'product-categories',
	},
	'product-new': {
		dir: 'product-new',
	},
	'product-on-sale': {
		dir: 'product-on-sale',
	},
	'product-top-rated': {
		dir: 'product-top-rated',
	},
	'products-by-attribute': {
		dir: 'products-by-attribute',
	},
	'featured-product': {
		dir: 'featured-product',
	},
	'all-reviews': {
		dir: 'reviews/all-reviews',
		frontend: 'reviews/frontend.js',
	},
	'reviews-by-product': {
		dir: 'reviews/reviews-by-product',
		frontend: 'reviews/frontend.js',
	},
	'reviews-by-category': {
		dir: 'reviews/reviews-by-category',
		frontend: 'reviews/frontend.js',
	},
	'product-search': {
		dir: 'product-search',
	},
	'product-tag': {
		dir: 'product-tag',
	},
	'featured-category': {
		dir: 'featured-category',
	},
	'all-products': {
		dir: 'products/all-products',
		frontend: 'products/all-products/frontend.js',
	},
	'price-filter': {
		dir: 'price-filter',
		frontend: 'price-filter/frontend.js',
	},
	'attribute-filter': {
		dir: 'attribute-filter',
		frontend: 'attribute-filter/frontend.js',
	},
	'active-filters': {
		dir: 'active-filters',
		frontend: 'active-filters/frontend.js',
	},
	cart: {
		dir: 'cart-checkout/cart',
		frontend: 'cart-checkout/cart/frontend.js',
	},
	checkout: {
		dir: 'cart-checkout/checkout',
		frontend: 'cart-checkout/checkout/frontend.js',
	},
	'single-product': {
		dir: 'single-product',
		frontend: 'single-product/frontend.js',
		isExperimental: true,
	},
};

const getBlockEntries = ( type ) => {
	const experimental =
		parseInt( process.env.WOOCOMMERCE_BLOCKS_PHASE, 10 ) < 3;

	return Object.fromEntries(
		Object.entries( blocks )
			.filter(
				( [ , config ] ) =>
					config.hasOwnProperty( type ) &&
					( ! config.isExperimental ||
						config.isExperimental === experimental )
			)
			.map( ( [ blockCode, config ] ) => [
				blockCode,
				'./assets/js/blocks/' + config[ type ],
			] )
	);
};

const getStyleBlockEntries = () => {
	const entries = getBlockEntries( 'dir' );
	return Object.fromEntries(
		Object.entries( entries )
			.map( ( [ blockCode, dir ] ) => {
				return [
					`${ blockCode }-style`,
					glob.sync( `${ dir }/**/*.scss` ),
				];
			} )
			.filter( ( [ , blockEntries ] ) => blockEntries.length )
	);
};

const entries = {
	styling: {
		// @wordpress/components styles
		'custom-select-control-style':
			'./node_modules/wordpress-components/src/custom-select-control/style.scss',
		'spinner-style':
			'./node_modules/wordpress-components/src/spinner/style.scss',
		'snackbar-notice-style':
			'./node_modules/wordpress-components/src/snackbar/style.scss',

		'block-style': glob.sync( './assets/**/*.scss', {
			ignore: [
				'./assets/js/**/stories/style.scss',
				'./assets/js/blocks/*/*.scss',
			],
		} ),

		...getStyleBlockEntries(),
	},
	core: {
		wcBlocksRegistry: './assets/js/blocks-registry/index.js',
		wcSettings: './assets/js/settings/shared/index.js',
		wcBlocksData: './assets/js/data/index.js',
		wcBlocksMiddleware: './assets/js/middleware/index.js',
		wcSharedContext: './assets/js/shared/context/index.js',
	},
	main: {
		// Shared blocks code
		blocks: './assets/js/index.js',

		// Blocks
		...getBlockEntries( 'dir' ),
	},
	frontend: {
		...getBlockEntries( 'frontend' ),
	},
	payments: {
		'wc-payment-method-stripe':
			'./assets/js/payment-method-extensions/payment-methods/stripe/index.js',
		'wc-payment-method-cheque':
			'./assets/js/payment-method-extensions/payment-methods/cheque/index.js',
		'wc-payment-method-paypal':
			'./assets/js/payment-method-extensions/payment-methods/paypal/index.js',
		'wc-payment-method-bacs':
			'./assets/js/payment-method-extensions/payment-methods/bacs/index.js',
	},
};

const getEntryConfig = ( type = 'main', exclude = [] ) => {
	return omit( entries[ type ], exclude );
};

module.exports = {
	getEntryConfig,
};

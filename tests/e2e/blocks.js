/* A collection of block data to use inside tests
 * title: fixture data, used for defining the block page URL when the test site is created
 * name: used as page title
 * slug: -
 * class: CSS class present on the block's wrapper
 */

/**
 * Internal dependencies
 */
import cartFixture from '../e2e/specs/backend/__fixtures__/cart.fixture.json';
import checkoutFixture from '../e2e/specs/backend/__fixtures__/checkout.fixture.json';

export const cart = {
	title: cartFixture.title, // Checkout block
	name: 'Cart',
	slug: 'woocommerce/cart',
	class: '.wp-block-woocommerce-cart',
};

// name should match checkout.fixture.json
export const checkout = {
	title: checkoutFixture.title, // Checkout block
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	class: '.wp-block-woocommerce-checkout',
};

export const emptyCart = {
	name: 'Empty Cart',
	slug: 'woocommerce/empty-cart-block',
	class: '.wp-block-woocommerce-empty-cart-block',
};

// name should match mini-cart.fixture.json
export const miniCart = {
	name: 'Mini Cart Block',
	slug: 'woocommerce/mini-cart',
	class: '.wc-block-mini-cart',
};

export const activeProductFilters = {
	name: 'Active Product Filters',
	slug: 'woocommerce/active-filters',
	class: '.wc-block-active-filters',
};

export const allProducts = {
	name: 'All Products',
	slug: 'woocommerce/all-products',
	class: '.wc-block-all-products',
};

export const allReviews = {
	name: 'All Reviews',
	slug: 'woocommerce/all-reviews',
	class: '.wc-block-all-reviews',
};

export const bestSellingProducts = {
	name: 'Best Selling Products',
	slug: 'woocommerce/product-best-sellers',
	class: '.wc-block-product-best-sellers',
};

export const featuredCategory = {
	name: 'Featured Category',
	slug: 'woocommerce/featured-category',
	class: '.wc-block-featured-category',
};

export const featuredProduct = {
	name: 'Featured Product',
	slug: 'woocommerce/featured-product',
	class: '.wc-block-featured-product',
};

export const filledCart = {
	name: 'Filled Cart',
	slug: 'woocommerce/filled-cart-block',
	class: '.wp-block-woocommerce-filled-cart-block',
};

export const filterProductsByPrice = {
	name: 'Filter Products by Price',
	slug: 'woocommerce/price-filter',
	class: '.wp-block-woocommerce-price-filter',
};

export const filterProductsByStock = {
	name: 'Filter Products by Stock',
	slug: 'woocommerce/stock-filter',
	class: '.wc-block-stock-filter',
};

export const productCategoriesList = {
	name: 'Product Categories List',
	slug: 'woocommerce/product-categories',
	class: '.wc-block-product-categories',
};

export const productsByCategory = {
	name: 'Products by Category',
	slug: 'woocommerce/product-category',
	class: '.wc-block-products-category',
};

export const filterProductsByAttribute = {
	name: 'Filter Products by Attribute',
	slug: 'woocommerce/attribute-filter',
	class: '.wc-block-attribute-filter',
};

export const handPickedProducts = {
	name: 'Hand-picked Products',
	slug: 'woocommerce/handpicked-products',
	class: '.wc-block-handpicked-products',
};

export const newestProducts = {
	name: 'Newest Products',
	slug: 'woocommerce/product-new',
	class: '.wc-block-product-new',
};

export const onSaleProducts = {
	name: 'On Sale Products',
	slug: 'woocommerce/product-on-sale',
	class: '.wc-block-product-on-sale',
};

export const productSearch = {
	name: 'Product Search',
	slug: 'woocommerce/product-search',
	class: '.wc-block-product-search',
};

export const productsByTag = {
	name: 'Products by Tag',
	slug: 'woocommerce/product-tag',
	class: '.wc-block-product-tag',
};

export const topRatedProducts = {
	name: 'Top Rated Products',
	slug: 'woocommerce/product-top-rated',
	class: '.wc-block-product-top-rated',
};

export const productsByAttribute = {
	name: 'Products by Attribute',
	slug: 'woocommerce/products-by-attribute',
	class: '.wc-block-products-by-attribute',
};

export const reviewsByCategory = {
	name: 'Reviews by Category',
	slug: 'woocommerce/reviews-by-category',
	class: '.wc-block-reviews-by-category',
};

export const reviewsByProduct = {
	name: 'Reviews by Product',
	slug: 'woocommerce/reviews-by-product',
	class: '.wc-block-reviews-by-product',
};

export const singleProduct = {
	name: 'Single Product',
	slug: 'woocommerce/single-product',
	class: '.wc-block-single-product',
};

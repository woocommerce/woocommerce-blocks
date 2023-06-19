/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@wordpress/blocks';
import { _x, sprintf } from '@wordpress/i18n';

// Some hackery to both make translation clearer and to allow for RTL languages
// in default template layout.
const translatedContent = sprintf(
	// translators: %s: discount amount. The rendered value will only allow for placeholder at beginning or end of string.
	_x(
		'%s off',
		'post text next to discount amount',
		'woo-gutenberg-products-block'
	),
	':placeholder:'
);

const templateContent = translatedContent.replace( ':placeholder:', '' );

const RTLtemplate: InnerBlockTemplate[] = [
	[ 'core/paragraph', { content: templateContent }, [] ],
	[ 'woocommerce/discount-amount', {}, [] ],
];

const LTRtemplate: InnerBlockTemplate[] = [
	[ 'woocommerce/discount-amount', {}, [] ],
	[ 'core/paragraph', { content: templateContent }, [] ],
];

export const TEMPLATE: InnerBlockTemplate[] =
	translatedContent.indexOf( ':placeholder:' ) === 0
		? LTRtemplate
		: RTLtemplate;

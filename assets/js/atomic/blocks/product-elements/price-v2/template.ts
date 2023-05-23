/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@wordpress/blocks';

export const TEMPLATE: InnerBlockTemplate[] = [
	[
		'core/group',
		{ layout: { type: 'flex', flexWrap: 'nowrap' } },
		[
			[ 'woocommerce/original-price', {}, [] ],
			[ 'woocommerce/current-price', {}, [] ],
		],
	],
];

// /**
//  * External dependencies
//  */
// import { renderFrontend } from '@woocommerce/base-utils';

// /**
//  * Internal dependencies
//  */
// import Block from './block';
// import { parseAttributes } from './utils';

// const getProps = ( el: HTMLElement ) => {
// 	return {
// 		attributes: parseAttributes( el.dataset ),
// 		isEditor: false,
// 	};
// };

// renderFrontend( {
// 	selector: '.wp-block-woocommerce-rating-filter',
// 	Block,
// 	getProps,
// } );

/**
 * External dependencies
 */
import { store } from '@woocommerce/interactivity';

store( 'woocommerce/collection-rating-filter', {
	state: {},
	actions: {},
} );

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

/**
 * Internal dependencies
 */
// import { CheckboxListContext } from '../../../../../../packages/interactivity-components/checkbox-list';

store( 'woocommerce/collection-rating-filter', {
	state: {},
	actions: {
		updateSelectedFilters: () => {
			// const checkboxContext = getContext< CheckboxListContext >(
			// 	'woocommerce/interactivity-checkbox-list'
			// );
			// console.log(
			// 	'selected filters changed. Do a thing here',
			// 	checkboxContext.items.map( ( item ) => {
			// 		return { ...item };
			// 	} )
			// );
		},
	},
} );

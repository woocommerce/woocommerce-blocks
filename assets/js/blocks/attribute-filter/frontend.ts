/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';
import { blockAttributes } from './attributes';

const getProps = ( el: HTMLElement ) => {
	return {
		isEditor: false,
		attributes: {
			attributeId: parseInt( el.dataset.attributeId || '0', 10 ),
			showCounts: el.dataset.showCounts === 'true',
			queryType:
				el.dataset.queryType || blockAttributes.queryType.default,
			heading: el.dataset.heading || blockAttributes.heading.default,
			headingLevel: el.dataset.headingLevel
				? parseInt( el.dataset.headingLevel, 10 )
				: blockAttributes.headingLevel.default,
			displayStyle:
				el.dataset.displayStyle || blockAttributes.displayStyle.default,
			showFilterButton: el.dataset.showFilterButton === 'true',
			isPreview: false,
			className: el.dataset.className || '',
		},
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-attribute-filter',
	Block,
	getProps,
} );

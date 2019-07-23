/** @format */
/**
 * External dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { isValidElement, renderToString } from '@wordpress/element';

const replaceVariablesInTemplate = ( markup, variables ) => {
	let replacedMarkup = markup;

	Object.entries( variables ).forEach( ( [ key, value ] ) => {
		if ( isValidElement( value ) ) {
			replacedMarkup = replacedMarkup.replace( `{{ ${ key } }}`, renderToString( value ) );
		} else {
			replacedMarkup = replacedMarkup.replace( `{{ ${ key } }}`, value );
		}
	} );

	return replacedMarkup;
};

const renderTemplate = ( templateName, template, data ) => {
	const filteredData = applyFilters( `woocommerce-blocks-${ templateName }-data`, data );
	const markup = renderToString( template );
	const filteredMarkup = applyFilters( `woocommerce-blocks-${ templateName }-markup`, markup, data );

	return (
		<span dangerouslySetInnerHTML={ { __html: replaceVariablesInTemplate( filteredMarkup, filteredData ) } } />
	);
};

export default renderTemplate;

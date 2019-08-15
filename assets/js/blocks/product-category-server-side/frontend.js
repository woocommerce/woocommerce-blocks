import { render, RawHTML } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { withSelect, dispatch } from '@wordpress/data';

/**
 * Frontend block
 */
const ProductCategoryBlock = ( { blockName, attributes, initialRenderContent = '' } ) => {
	if ( initialRenderContent !== '' ) {
		return <RawHTML>{ initialRenderContent }</RawHTML>;
	}
	return <ServerSideRender block={ blockName } attributes={ attributes } />;
};

/**
 * Wrapped Block enhanced with withSelect
 */
const EnhancedProductCategoryBlock = withSelect(
	( select, { blockName, attributes } ) => {
		const store = select( 'wc-blocks/query-state' );
		const newAttributes = store.getValueForQueryContext( blockName );

		// if no change then avoid unnecessary render!
		if ( JSON.stringify( attributes ) === JSON.stringify( newAttributes ) ) {
			return {};
		}
		return {
			attributes: newAttributes,
			initialRenderContent: '',
		};
	}
)( ProductCategoryBlock );

const containers = document.querySelectorAll( '.wc-ssr-block' );

if ( containers.length ) {
	Array.prototype.forEach.call( containers, ( el ) => {
		// note classList isn't supported by IE so this could be problematic
		el.classList.remove( 'wc-ssr-block' );
		const data = JSON.parse( JSON.stringify( el.dataset ) );
		const { blockName: name, wcBlockattributes } = data;
		const attributes = JSON.parse( wcBlockattributes );
		const initialContent = el.outerHTML;
		// hydrate the state for the data store with the attributes.
		dispatch( 'wc-blocks/query-state' ).setValueForQueryContext(
			name,
			attributes
		);
		render( <EnhancedProductCategoryBlock attributes={ attributes } blockName={ name } initialRenderContent={ initialContent } />, el.parentElement );
	} );
}

import { h } from 'preact';
import { directivePrefix as p } from './constants';

const ignoreAttr = `data-${ p }-ignore`;
const islandAttr = `data-${ p }-interactive`;
const fullPrefix = `data-${ p }-`;

// Regular expression for directive parsing.
const directiveParser = new RegExp(
	`^data-${ p }-` + // ${p} must be a prefix string, like 'wp'.
		// Match alphanumeric characters including hyphen-separated
		// segments. It excludes underscore intentionally to prevent confusion.
		// E.g., "custom-directive".
		'([a-z0-9]+(?:-[a-z0-9]+)*)' +
		// (Optional) Match '--' followed by any alphanumeric charachters. It
		// excludes underscore intentionally to prevent confusion, but it can
		// contain multiple hyphens. E.g., "--custom-prefix--with-more-info".
		'(?:--([a-z0-9][a-z0-9-]+))?$',
	'i' // Case insensitive.
);

export const hydratedIslands = new WeakSet();

// Recursive function that transforms a DOM tree into vDOM.
export function toVdom( root ) {
	const treeWalker = document.createTreeWalker(
		root,
		205 // ELEMENT + TEXT + COMMENT + CDATA_SECTION + PROCESSING_INSTRUCTION
	);

	function walk( node ) {
		const { attributes, nodeType } = node;

		if ( nodeType === 3 ) return [ node.data ];
		if ( nodeType === 4 ) {
			const next = treeWalker.nextSibling();
			node.replaceWith( new Text( node.nodeValue ) );
			return [ node.nodeValue, next ];
		}
		if ( nodeType === 8 || nodeType === 7 ) {
			const next = treeWalker.nextSibling();
			node.remove();
			return [ null, next ];
		}

		const props = {};
		const children = [];
		const directives = {};
		let hasDirectives = false;
		let ignore = false;
		let island = false;

		for ( let i = 0; i < attributes.length; i++ ) {
			const n = attributes[ i ].name;
			if (
				n[ fullPrefix.length ] &&
				n.slice( 0, fullPrefix.length ) === fullPrefix
			) {
				if ( n === ignoreAttr ) {
					ignore = true;
				} else if ( n === islandAttr ) {
					island = true;
				} else {
					hasDirectives = true;
					let val = attributes[ i ].value;
					try {
						val = JSON.parse( val );
					} catch ( e ) {}
					const [ , prefix, suffix ] = directiveParser.exec( n );
					directives[ prefix ] = directives[ prefix ] || {};
					directives[ prefix ][ suffix || 'default' ] = val;
				}
			} else if ( n === 'ref' ) {
				continue;
			}
			props[ n ] = attributes[ i ].value;
		}

		if ( ignore && ! island )
			return [
				h( node.localName, {
					...props,
					innerHTML: node.innerHTML,
					__directives: { ignore: true },
				} ),
			];
		if ( island ) hydratedIslands.add( node );

		if ( hasDirectives ) props.__directives = directives;

		let child = treeWalker.firstChild();
		if ( child ) {
			while ( child ) {
				const [ vnode, nextChild ] = walk( child );
				if ( vnode ) children.push( vnode );
				child = nextChild || treeWalker.nextSibling();
			}
			treeWalker.parentNode();
		}

		return [ h( node.localName, props, children ) ];
	}

	return walk( treeWalker.currentNode );
}

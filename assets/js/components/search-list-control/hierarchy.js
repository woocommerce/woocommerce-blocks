/**
 * External dependencies
 */
import { forEach, groupBy } from 'lodash';

/**
 * Returns terms in a tree form.
 *
 * @param {Array} flatTerms  Array of terms in flat format.
 *
 * @return {Array} Array of terms in tree format.
 */
export function buildTermsTree( flatTerms ) {
	const termsByParent = groupBy( flatTerms, 'parent' );
	const fillWithChildren = ( terms ) => {
		return terms.map( ( term ) => {
			const children = termsByParent[ term.id ];
			delete termsByParent[ term.id ];
			return {
				...term,
				children: children && children.length ?
					fillWithChildren( children ) :
					[],
			};
		} );
	};

	// return fillWithChildren( termsByParent[ '0' ] || [] );
	const tree = fillWithChildren( termsByParent[ '0' ] || [] );
	delete termsByParent[ '0' ];

	// anything left in termsByParent has no visible parent
	forEach( termsByParent, ( terms ) => {
		tree.push( ...fillWithChildren( terms || [] ) );
	} );

	return tree;
}

const ids = [];

/**
 * Returns a unique ID.
 *
 * This is an alternative for withInstanceId from @wordpress/compose to avoid using that dependency on the frontend.
 *
 * @param {string} prefix Prefix for the ID. Should be the component name.
 * @param {string} group ID group.
 */
export default function( prefix = 'id', group = '' ) {
	if ( ! ids[ group ] ) {
		ids[ group ] = 0;
	}
	ids[ group ]++;
	return `${ prefix }${ ids[ group ] }`;
}

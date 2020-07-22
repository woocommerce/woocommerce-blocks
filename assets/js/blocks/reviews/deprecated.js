/**
 * Internal dependencies
 */
import { getBlockClassName, getDataAttrs } from './utils.js';

export default function getDeprecatedPropert( atts ) {
	return [
		/**
		 * Deprecation rule to handle the block without the 'is-loading' class.
		 */
		{
			attributes: atts,
			save( { attributes } ) {
				return (
					<div
						className={ getBlockClassName( attributes ) }
						{ ...getDataAttrs( attributes ) }
					/>
				);
			},
		},
	];
}

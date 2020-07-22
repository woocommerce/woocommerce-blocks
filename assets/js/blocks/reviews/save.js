/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import { getBlockClassName, getDataAttrs } from './utils.js';

export default ( { attributes } ) => {
	return (
		<div
			className={ classNames(
				'is-loading',
				getBlockClassName( attributes )
			) }
			{ ...getDataAttrs( attributes ) }
		/>
	);
};

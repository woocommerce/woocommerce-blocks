/**
 * Internal dependencies
 */
import { renderFrontend } from '~/base/utils';
import { getBlockMap } from './get-block-map';

export const renderStandaloneBlocks = () => {
	const blockMap = getBlockMap( '' );

	Object.keys( blockMap ).forEach( ( blockName ) => {
		const selector = '.wp-block-' + blockName.replace( '/', '-' );

		const getProps = ( el ) => {
			return el.dataset;
		};

		renderFrontend( {
			Block: blockMap[ blockName ],
			selector,
			getProps,
		} );
	} );
};

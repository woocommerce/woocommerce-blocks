/**
 * External dependencies
 */
import { getAllBlocks, selectBlockByClientId } from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
	await selectBlockByClientId(
		( await getAllBlocks() ).find( ( block ) => block.name === name )
			.clientId
	);
};

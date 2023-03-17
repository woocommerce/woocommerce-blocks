/**
 * External dependencies
 */
import { getBlockType } from '@wordpress/blocks';
import { subscribe, select } from '@wordpress/data';

export const registerBlockSingleProductTemplate = ( {
	registerBlockFn,
	unregisterBlockFn,
	blockName,
}: {
	registerBlockFn: () => void;
	unregisterBlockFn: () => void;
	blockName: string;
} ) => {
	let currentTemplateId: string | undefined;
	let stop = false;

	subscribe( () => {
		const previousTemplateId = currentTemplateId;
		const store = select( 'core/edit-site' );
		currentTemplateId = store?.getEditedPostId() as string | undefined;

		if ( stop === true ) {
			return;
		}

		if ( previousTemplateId === currentTemplateId ) {
			stop = true;
			unregisterBlockFn();
			return;
		}

		const parsedTemplate = currentTemplateId?.split( '//' )[ 1 ];

		if ( parsedTemplate === null || parsedTemplate === undefined ) {
			return;
		}

		const block = getBlockType( blockName );

		if (
			block === undefined &&
			parsedTemplate.includes( 'single-product' )
		) {
			registerBlockFn();
		}

		if ( block !== undefined ) {
			unregisterBlockFn();
		}
	} );
};

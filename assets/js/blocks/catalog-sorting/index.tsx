/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import { totals } from '@woocommerce/icons';
import { select, subscribe } from '@wordpress/data';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

let currentEditorMode: string | undefined;

subscribe( () => {
	const store = select( 'core/edit-site' );

	const prevEditorMode = currentEditorMode;
	currentEditorMode = store?.getEditorMode();

	if (
		prevEditorMode === currentEditorMode ||
		currentEditorMode !== 'visual'
	) {
		return;
	}

	registerBlockType( metadata, {
		icon: {
			src: (
				<Icon
					icon={ totals }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		attributes: {
			...metadata.attributes,
		},
		edit,
		save() {
			return null;
		},
	} );
} );

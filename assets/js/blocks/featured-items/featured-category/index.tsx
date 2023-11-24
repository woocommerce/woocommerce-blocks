/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { folderStarred } from '~/icons';
import './style.scss';
import './editor.scss';
import Block from './block';
import metadata from './block.json';
import { register } from '../register';
import { example } from './example';

register( Block, example, metadata, {
	icon: {
		src: (
			<Icon
				icon={ folderStarred }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
} );

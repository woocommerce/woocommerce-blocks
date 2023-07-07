/**
 * Internal dependencies
 */
import { DEFAULT_TITLE } from './constants';

const attributes = ( {
	defaultTitle = DEFAULT_TITLE,
}: {
	defaultTitle: string;
} ): Record< string, Record< string, unknown > > => ( {
	title: {
		type: 'string',
		default: defaultTitle,
	},
} );

export default attributes;

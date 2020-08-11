/**
 * External dependencies
 */
import { sanitize } from 'dompurify';

export const stripTagsAndContents = ( text ) =>
	sanitize( text, {
		ALLOWED_TAGS: [ '#text' ],
		KEEP_CONTENT: false,
	} );

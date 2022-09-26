/**
 * External dependencies
 */
import DOMPurify from 'dompurify';

type sanitizedHTMLObject = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	__html: string;
};

const ALLOWED_TAGS = [ 'a', 'b', 'em', 'i', 'strong', 'p', 'br' ];
const ALLOWED_ATTR = [ 'target', 'href', 'rel', 'name', 'download' ];

export const sanitizeHTML = (
	html: string,
	{ tags, attr }: { tags?: typeof ALLOWED_TAGS; attr?: typeof ALLOWED_ATTR }
): sanitizedHTMLObject => {
	const tagsValue = tags || ALLOWED_TAGS;
	const attrValue = attr || ALLOWED_ATTR;

	return {
		__html: DOMPurify.sanitize( html, {
			ALLOWED_TAGS: tagsValue,
			ALLOWED_ATTR: attrValue,
		} ),
	};
};

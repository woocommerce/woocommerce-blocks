/**
 * External dependencies
 */
import { Block } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { TEMPLATES } from './constants';

const templateKeys = Object.keys( TEMPLATES );

// Finds the most appropriate template details object for specific template keys such as single-product-hoodie.
export function getTemplateDetailsBySlug( parsedTemplate: string ) {
	let templateDetails = null;

	for ( let i = 0; templateKeys.length > i; i++ ) {
		const keyToMatch = parsedTemplate.substr( 0, templateKeys[ i ].length );
		const maybeTemplate = TEMPLATES[ keyToMatch ];
		if ( maybeTemplate ) {
			templateDetails = maybeTemplate;
			break;
		}
	}

	return templateDetails;
}

export function isClassicTemplateBlockRegisteredWithAnotherTitle(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	block: Block< any > | undefined,
	parsedTemplate: string
) {
	const templateDetails = getTemplateDetailsBySlug( parsedTemplate );
	return block?.title !== templateDetails?.title;
}

export function hasTemplateSupportForClassicTemplateBlock(
	parsedTemplate: string
) {
	let hasSupport = false;
	for ( let i = 0; templateKeys.length > i; i++ ) {
		if ( parsedTemplate.includes( templateKeys[ i ] ) ) {
			hasSupport = true;
			break;
		}
	}

	return hasSupport;
}

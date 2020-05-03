/**
 * External dependencies
 */
import { count } from '@wordpress/wordcount';
import { RawHTML, useMemo } from '@wordpress/element';
import { autop } from '@wordpress/autop';
import { getSetting } from '@woocommerce/settings';

/**
 * Generates the summary text from a string of text.
 *
 * @param {string} source Source text.
 * @param {number} maxWords Limit number of words returned if text has multiple paragraphs.
 * @param {string} wordCountType Should we count words or characters.
 * @return {string} Generated summary.
 */
export const generateSummary = (
	source,
	maxWords = 15,
	wordCountType = 'words'
) => {
	const sourceWithParagraphs = autop( source );
	const sourceWordCount = count( sourceWithParagraphs, wordCountType );

	if ( sourceWordCount <= maxWords ) {
		return sourceWithParagraphs;
	}

	const firstParagraph = getFirstParagraph( sourceWithParagraphs );
	const firstParagraphWordCount = count( firstParagraph, wordCountType );

	if ( firstParagraphWordCount <= maxWords ) {
		return firstParagraph;
	}

	return trimWords( firstParagraph, maxWords, wordCountType );
};

/**
 * Get first paragraph from some HTML text, or return whole string.
 *
 * @param {string} source Source text.
 * @return {string} First paragraph found in string.
 */
const getFirstParagraph = ( source ) => {
	const pIndex = source.indexOf( '</p>' );

	if ( pIndex === -1 ) {
		return source;
	}

	return source.substr( 0, pIndex + 4 );
};

/**
 * Limit words in string and returned trimmed version.
 *
 * @param {string} text Text to trim.
 * @param {number} numWords Number of words to limit to.
 * @param {string} wordCountType Should we count words or characters.
 * @param {string} more Appended to a trimmed string.
 * @return {string} Trimmed string.
 */
const trimWords = (
	text,
	numWords,
	wordCountType = 'words',
	more = '&hellip;'
) => {
	const tagsRegExp = /<\/?[a-z][^>]*?>/gi;
	const plainText = text.replace( tagsRegExp, '' );

	const trimmedText =
		wordCountType === 'words'
			? plainText
					.split( ' ' )
					.splice( 0, numWords )
					.join( ' ' )
			: plainText.slice( 0, numWords );

	return autop( trimmedText.replace( /[\s|\.\,]+$/i, '' ) + more );
};

/**
 * Summary component.
 *
 * @param {*} Component props.
 */
export const Summary = ( { source, maxWords = 15, className = '' } ) => {
	const summaryText = useMemo( () => {
		return generateSummary(
			source,
			maxWords,
			getSetting( 'wordCountType', 'words' )
		);
	}, [ source, maxWords ] );

	return <RawHTML className={ className }>{ summaryText }</RawHTML>;
};

export default Summary;

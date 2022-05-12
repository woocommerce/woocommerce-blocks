export function calculateBackgroundImagePosition( coords ) {
	if ( ! coords ) return {};

	const x = Math.round( coords.x * 100 );
	const y = Math.round( coords.y * 100 );

	return {
		objectPosition: `${ x }% ${ y }%`,
	};
}

/**
 * Generate a style object given either a product category image from the API or URL to an image.
 *
 * @param {string} url An image URL.
 * @return {Object} A style object with a backgroundImage set (if a valid image is provided).
 */
export function getBackgroundImageStyles( url ) {
	if ( url ) {
		return { backgroundImage: `url(${ url })` };
	}
	return {};
}

/**
 * Generates the CSS class prefix for scoping elements to a block.
 *
 * @param {string} blockName The name of the block.
 * @return {string} The prefix for the HTML elements belonging to that block.
 */
export function getClassPrefixFromName( blockName ) {
	return `wc-block-${ blockName.split( '/' )[ 1 ] }`;
}

/**
 * Convert the selected ratio to the correct background class.
 *
 * @param {number} ratio Selected opacity from 0 to 100.
 * @return {string} The class name, if applicable (not used for ratio 0 or 50).
 */
export function dimRatioToClass( ratio ) {
	return ratio === 0 || ratio === 50
		? null
		: `has-background-dim-${ 10 * Math.round( ratio / 10 ) }`;
}

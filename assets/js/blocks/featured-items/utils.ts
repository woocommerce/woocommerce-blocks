/**
 * Internal dependencies
 */
import { Coordinates, ImageFit } from './types';

/**
 * Given x and y coordinates between 0 and 1 returns a rounded percentage string.
 *
 * Useful for converting to a CSS-compatible position string.
 */
export function calculatePercentPositionFromCoordinates( coords: Coordinates ) {
	if ( ! coords ) return '';

	const x = Math.round( coords.x * 100 );
	const y = Math.round( coords.y * 100 );

	return `${ x }% ${ y }%`;
}

/**
 * Given x and y coordinates between 0 and 1 returns a CSS `objectPosition`.
 */
export function calculateBackgroundImagePosition( coords: Coordinates ) {
	if ( ! coords ) return {};

	return {
		objectPosition: calculatePercentPositionFromCoordinates( coords ),
	};
}

/**
 * Generate the style object of the background image of the block.
 *
 * It outputs styles for either an `img` element or a `div` with a background,
 * depending on what is needed.
 */
export function getBackgroundImageStyles( {
	focalPoint,
	imageFit,
	isImgElement,
	isRepeated,
	url,
}: {
	focalPoint: Coordinates;
	imageFit: ImageFit;
	isImgElement: boolean;
	isRepeated: boolean;
	url: string;
} ) {
	let styles = {};

	if ( isImgElement ) {
		styles = {
			...styles,
			...calculateBackgroundImagePosition( focalPoint ),
			objectFit: imageFit,
		};
	} else {
		styles = {
			...styles,
			...( url && {
				backgroundImage: `url(${ url })`,
			} ),
			backgroundPosition:
				calculatePercentPositionFromCoordinates( focalPoint ),
			...( ! isRepeated && {
				backgroundRepeat: 'no-repeat',
				backgroundSize: imageFit === 'cover' ? imageFit : 'auto',
			} ),
		};
	}

	return styles;
}

/**
 * Generates the CSS class prefix for scoping elements to a block.
 */
export function getClassPrefixFromName( blockName: string ) {
	return `wc-block-${ blockName.split( '/' )[ 1 ] }`;
}

/**
 * Convert the selected ratio to the correct background class.
 *
 * @param  ratio Selected opacity from 0 to 100.
 * @return The class name, if applicable (not used for ratio 0 or 50).
 */
export function dimRatioToClass( ratio: number ) {
	return ratio === 0 || ratio === 50
		? null
		: `has-background-dim-${ 10 * Math.round( ratio / 10 ) }`;
}

type PositionClassnames = {
	[ key in
		| 'top left'
		| 'top center'
		| 'top right'
		| 'center left'
		| 'center center'
		| 'center'
		| 'center right'
		| 'bottom left'
		| 'bottom center'
		| 'bottom right' ]: string;
};

const POSITION_CLASSNAMES: PositionClassnames = {
	'top left': 'is-position-top-left',
	'top center': 'is-position-top-center',
	'top right': 'is-position-top-right',
	'center left': 'is-position-center-left',
	'center center': 'is-position-center-center',
	center: 'is-position-center-center',
	'center right': 'is-position-center-right',
	'bottom left': 'is-position-bottom-left',
	'bottom center': 'is-position-bottom-center',
	'bottom right': 'is-position-bottom-right',
};

/**
 * Checks of the contentPosition is the center (default) position.
 *
 * @param {string} contentPosition The current content position.
 * @return {boolean} Whether the contentPosition is center.
 */
export function isContentPositionCenter( contentPosition: string ) {
	return ! contentPosition || contentPosition === 'center';
}

/**
 * Retrieves the className for the current contentPosition.
 * The default position (center) will not have a className.
 *
 * @param {string} contentPosition The current content position.
 * @return {string} The className assigned to the contentPosition.
 */
export function getPositionClassName( contentPosition: string ) {
	/*
	 * Only render a className if the contentPosition is not center (the default).
	 */
	if ( isContentPositionCenter( contentPosition ) ) return '';

	return POSITION_CLASSNAMES[ contentPosition as keyof PositionClassnames ];
}

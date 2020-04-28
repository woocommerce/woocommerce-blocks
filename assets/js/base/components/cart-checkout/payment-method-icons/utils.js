/**
 * For an array of icons, normalize into objects and remove duplicates.
 *
 * @param {Array} icons Array of icon objects or string based ids.
 */
export const normalizeIconConfig = ( icons ) => {
	const normalizedIcons = {};

	icons.forEach( ( raw ) => {
		let icon = {};

		if ( typeof icon === 'string' ) {
			icon = {
				id: raw,
				alt: raw,
				src: null,
			};
		}

		icon = {
			id: raw.id,
			alt: raw.alt,
			src: raw.src,
		};

		if ( ! normalizedIcons[ icon.id ] ) {
			normalizedIcons[ icon.id ] = icon;
		}
	} );

	return Object.values( normalizedIcons );
};

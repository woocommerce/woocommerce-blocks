const parseValid = ( value, fallback ) => {
	const parsedValue =
		typeof value === 'string' ? parseInt( value, 10 ) : value;

	if ( ! Number.isFinite( parsedValue ) ) {
		return fallback;
	}

	return parsedValue;
};

/**
 * Validate a min and max value for a range slider against defined constraints (min, max, step).
 *
 * @param {Array} values Array containing min and max values.
 * @param {number|null} minAllowed Min allowed value for the sliders.
 * @param {number|null} maxAllowed Max allowed value for the sliders.
 * @param {number} step Step value for the sliders.
 * @param {boolean} isMin Whether we're currently interacting with the min range slider or not, so we update the correct values.
 * @return {Array} Validated and updated min/max values that fit within the range slider constraints.
 */
export const constrainRangeSliderValues = (
	values,
	minAllowed,
	maxAllowed,
	step = 1,
	isMin = false
) => {
	const hasMinConstraint = Number.isFinite( minAllowed );
	const hasMaxConstraint = Number.isFinite( maxAllowed );
	const minConstraint = minAllowed || 0;
	const maxConstraint = maxAllowed || step;

	let minValue = parseValid( values[ 0 ], minConstraint );
	let maxValue = parseValid( values[ 1 ], maxConstraint );

	if ( hasMinConstraint ) {
		if ( minConstraint > minValue ) {
			minValue = minConstraint;
		}
		if ( minConstraint >= maxValue ) {
			maxValue = minConstraint + step;
		}
	}

	if ( hasMaxConstraint ) {
		if ( maxConstraint <= minValue ) {
			minValue = maxConstraint - step;
		}

		if ( maxConstraint < maxValue ) {
			maxValue = maxConstraint;
		}
	}

	if ( ! isMin && minValue >= maxValue ) {
		minValue = maxValue - step;
	}

	if ( isMin && maxValue <= minValue ) {
		maxValue = minValue + step;
	}

	return [ minValue, maxValue ];
};

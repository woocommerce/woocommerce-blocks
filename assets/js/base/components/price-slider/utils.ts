/**
 * External dependencies
 */
import { NumberFormatValues } from 'react-number-format';

export const withMaxValueLimit = ( {
	maxConstraint,
	minorUnit,
}: {
	maxConstraint: number;
	minorUnit: number;
} ) => ( { floatValue }: NumberFormatValues ): boolean => {
	const maxPrice = maxConstraint / 10 ** minorUnit;

	return floatValue !== undefined && floatValue <= maxPrice;
};

export const withMinValueLimit = ( {
	minConstraint,
	currentMaxValue,
	minorUnit,
}: {
	minConstraint: number;
	currentMaxValue: number;
	minorUnit: number;
} ) => ( { floatValue }: NumberFormatValues ): boolean => {
	const minPrice = minConstraint / 10 ** minorUnit;
	const currentMaxPrice = currentMaxValue / 10 ** minorUnit;

	return (
		floatValue !== undefined &&
		floatValue >= minPrice &&
		floatValue < currentMaxPrice
	);
};

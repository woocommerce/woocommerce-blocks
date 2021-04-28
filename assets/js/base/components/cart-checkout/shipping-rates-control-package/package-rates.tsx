/**
 * External dependencies
 */
import RadioControl, {
	RadioControlOptionLayout,
} from '@woocommerce/base-components/radio-control';
import type { PackageRateOption } from '@woocommerce/type-defs/shipping';
import type { ReactElement } from 'react';
import type { CartShippingPackageShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Internal dependencies
 */
import { renderPackageRateOption } from './render-package-rate-option';

interface PackageRates {
	onSelectRate: ( selectedRateId: string ) => void;
	rates: CartShippingPackageShippingRate[];
	renderOption?: (
		option: CartShippingPackageShippingRate
	) => PackageRateOption;
	className?: string;
	noResultsMessage: ReactElement;
	selected?: string;
}

const PackageRates = ( {
	className,
	noResultsMessage,
	onSelectRate,
	rates,
	renderOption = renderPackageRateOption,
	selected,
}: PackageRates ): ReactElement => {
	if ( rates.length === 0 ) {
		return noResultsMessage;
	}

	if ( rates.length > 1 ) {
		return (
			<RadioControl
				className={ className }
				onChange={ ( selectedRateId: string ) => {
					onSelectRate( selectedRateId );
				} }
				selected={ selected }
				options={ rates.map( renderOption ) }
			/>
		);
	}

	const {
		label,
		secondaryLabel,
		description,
		secondaryDescription,
	} = renderOption( rates[ 0 ] );

	return (
		<RadioControlOptionLayout
			label={ label }
			secondaryLabel={ secondaryLabel }
			description={ description }
			secondaryDescription={ secondaryDescription }
		/>
	);
};

export default PackageRates;

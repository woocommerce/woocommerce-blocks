/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import RadioControl, {
	RadioControlOptionLayout,
} from '@woocommerce/base-components/radio-control';
import type { CartShippingPackageShippingRate } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { renderPackageRateOption } from './render-package-rate-option';
import type { PackageRateRenderOption } from '../shipping-rates-control-package';

interface PackageRates {
	onSelectRate: ( selectedRateId: string ) => void;
	rates: CartShippingPackageShippingRate[];
	renderOption?: PackageRateRenderOption | undefined;
	className?: string;
	noResultsMessage: JSX.Element;
	selectedRate: CartShippingPackageShippingRate | undefined;
}

const PackageRates = ( {
	className = '',
	noResultsMessage,
	onSelectRate,
	rates,
	renderOption = renderPackageRateOption,
	selectedRate,
}: PackageRates ): JSX.Element => {
	// Update the selected option if cart state changes in the data stores.
	/*useEffect( () => {
		if ( selected ) {
			setSelectedOption( selected );
		}
	}, [ selected ] );*/
	// write a useEffect that console logs the following props, one useEffect for each prop: onSelectRate, rates, selectedRate

	useEffect( () => {
		if ( ! selectedRate && rates.length > 0 ) {
			onSelectRate( rates[ 0 ]?.rate_id );
		}
	}, [ onSelectRate, rates, selectedRate ] );

	if ( rates.length === 0 ) {
		return noResultsMessage;
	}

	if ( rates.length > 1 ) {
		return (
			<RadioControl
				className={ className }
				onChange={ ( value: string ) => {
					onSelectRate( value );
				} }
				selected={ selectedRate?.rate_id }
				options={ rates.map( renderOption ) }
			/>
		);
	}

	const { label, secondaryLabel, description, secondaryDescription } =
		renderOption( rates[ 0 ] );

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

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import RadioControl, {
	RadioControlOptionLayout,
} from '@woocommerce/base-components/radio-control';
import { useState, useEffect } from '@wordpress/element';
import { useShallowEqual } from '@woocommerce/base-hooks';

// Selected rate can be derived from the data.
const deriveSelected = ( rates ) => {
	return rates.find( ( rate ) => rate.selected )?.rate_id;
};

const PackageRates = ( {
	className,
	noResultsMessage,
	onSelectRate,
	rates,
	renderOption,
} ) => {
	const [ selected, setSelected ] = useState( () => deriveSelected( rates ) );
	const currentRates = useShallowEqual( rates );

	// If selected rate changes in incoming prop, update local state.
	useEffect( () => {
		setSelected( deriveSelected( currentRates ) );
	}, [ currentRates ] );

	if ( rates.length === 0 ) {
		return noResultsMessage;
	}

	if ( rates.length > 1 ) {
		return (
			<RadioControl
				className={ className }
				onChange={ ( selectedRateId ) => {
					setSelected( selectedRateId );
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

PackageRates.propTypes = {
	onSelectRate: PropTypes.func.isRequired,
	rates: PropTypes.arrayOf( PropTypes.object ).isRequired,
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	noResultsMessage: PropTypes.node,
};

export default PackageRates;

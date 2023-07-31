/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';

type AddressComponent = {
	long_name: string;
	short_name: string;
	types: string[];
};

function getFormattedAddress( streetNumber: string, route: string ) {
	if ( streetNumber && route ) {
		return `${ streetNumber } ${ route }`;
	}
	if ( streetNumber ) {
		return streetNumber;
	}
	if ( route ) {
		return route;
	}
	return '';
}

export function useAddressAutocomplete( input: HTMLInputElement, cb ) {
	const autocompleteRef = useRef( {} );

	if (
		! google.maps.places ||
		! input ||
		autocompleteRef.current[ input.id ]
	) {
		return;
	}

	input.placeholder = '';

	console.log( 'initialising autocomplete for input' );
	autocompleteRef.current[ input.id ] = new google.maps.places.Autocomplete(
		input
	);

	console.log( autocompleteRef.current );

	if ( ! autocompleteRef.current[ input.id ] ) {
		throw new Error( 'Could not initialise address autocomplete' );
	}

	autocompleteRef.current[ input.id ].addListener(
		'place_changed',
		async () => {
			const place = await autocompleteRef.current[ input.id ].getPlace();
			if ( ! place || ! place.address_components ) {
				return;
			}
			console.log( place );
			// We have an address, populate the address fields

			const autocompleteAddress = {
				street_number_or_premise: '',
				route: '',
				city: '',
				postcode: '',
				state: '',
				country: '',
			};

			// Street number or premise
			autocompleteAddress.street_number_or_premise =
				place.address_components.find( ( a: AddressComponent ) => {
					return [ 'street_number', 'premise' ].some( ( i ) =>
						a.types.includes( i )
					);
				} )?.long_name;

			// Route
			autocompleteAddress.route = place.address_components.find(
				( a: AddressComponent ) => a.types.includes( 'route' )
			)?.long_name;

			// Post Code
			autocompleteAddress.postcode = place.address_components.find(
				( a: AddressComponent ) => a.types.includes( 'postal_code' )
			)?.long_name;

			// Country (2 letter abbreviation)
			autocompleteAddress.country = place.address_components.find(
				( a: AddressComponent ) => a.types.includes( 'country' )
			)?.short_name;

			// Town/City
			autocompleteAddress.city = place.address_components.find(
				( a: AddressComponent ) =>
					[ 'postal_town', 'locality', 'sublocality' ].some( ( i ) =>
						a.types.includes( i )
					)
			)?.long_name;

			// State - UK has the actual state as administrative_area_level_2
			autocompleteAddress.state = place.address_components.find(
				( a: AddressComponent ) => {
					if ( autocompleteAddress.country === 'GB' ) {
						return a.types.includes(
							'administrative_area_level_2'
						);
					}
					return a.types.includes( 'administrative_area_level_1' );
				}
			)?.long_name;

			cb( {
				address_1:
					getFormattedAddress(
						autocompleteAddress.street_number_or_premise,
						autocompleteAddress.route
					) || '',
				city: autocompleteAddress.city || '',
				postcode: autocompleteAddress.postcode || '',
				state: autocompleteAddress.state || '',
				country: autocompleteAddress.country || '',
			} );
		}
	);
}

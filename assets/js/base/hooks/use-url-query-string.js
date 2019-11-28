/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { addQueryArgs, getQueryArg } from '@wordpress/url';

const hasWindowDependencies =
	typeof window === 'object' &&
	window.hasOwnProperty( 'history' ) &&
	window.hasOwnProperty( 'location' ) &&
	typeof window.addEventListener === 'function' &&
	typeof window.removeEventListener === 'function';

// let instances = 0;

/**
 * A custom hook that tbc
 *
 * @param {} [] tbc
 *
 * @return {} tbc
 */
export const useUrlQueryString = ( values ) => {
	// Suffix all props with an instance "id", to support multiple components with independent url params.
	// Coming soon.
	const uniqueSuffix = '';//instances++ > 0 ? `_${ instances }` : '';

	const getStateFromUrl = () => {
		const urlState = {};

		if ( hasWindowDependencies ) {
			Object.keys( values ).forEach( ( value ) => {
				urlState[ value ] = getQueryArg(
					window.location.href,
					value + uniqueSuffix
				);
			} );
		}

		return urlState;
	};

	const [ state, setState ] = useState( {
		...values,
		...getStateFromUrl()
	} );
	const updateState = partialUpdate => {
		setState( prevState => {
			return {
				...prevState,
				...partialUpdate
			}
		} );
	}

	const updateStateFromUrl = () => {
		updateState( getStateFromUrl() );
	};

	const updateValues = ( newValues ) => {
		updateState( newValues );

		if ( hasWindowDependencies ) {
			const queryStringValues = {};
			Object.keys( newValues ).forEach( ( key ) => {
				queryStringValues[ key + uniqueSuffix ] =
					newValues[ key ];
			} );

			window.history.pushState(
				null,
				'',
				addQueryArgs( window.location.href, queryStringValues )
			);
		}
	};

	// Update our state when the use navigates back/forward (history API).
	useEffect(() => {
		if ( hasWindowDependencies ) {
			window.addEventListener(
				'popstate',
				updateStateFromUrl
			);
		}

		return function cleanup() {
			if ( hasWindowDependencies ) {
				window.removeEventListener(
					'popstate',
					updateStateFromUrl
				);
			}
		};
	});

	return [ state, updateValues ];
};


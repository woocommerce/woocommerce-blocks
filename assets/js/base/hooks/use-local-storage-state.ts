/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

export const useLocalStorageState = < T >(
	key: string,
	initialValue: T
): [ T, ( arg0: T ) => void ] => {
	const [ state, setState ] = useState< T >( () => {
		const valueInLocalStorage = window.localStorage.getItem( key );
		return valueInLocalStorage
			? JSON.parse( valueInLocalStorage )
			: initialValue;
	} );
	useEffect( () => {
		window.localStorage.setItem( key, JSON.stringify( state ) || '' );
	}, [ key, state ] );

	return [ state, setState ];
};

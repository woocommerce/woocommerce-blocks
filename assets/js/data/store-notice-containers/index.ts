/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

export const STORE_KEY = 'wc/store/notice-containers';

const store = createReduxStore( STORE_KEY, {
	reducer( state = {}, action ) {
		switch ( action.type ) {
			case 'REGISTER_CONTAINER':
				return {
					...state,
					[ action.containerContext ]: action.ref,
				};
		}
		return state;
	},
	actions: {
		registerContainer(
			containerContext: string,
			ref: React.MutableRefObject< HTMLDivElement | null >
		) {
			return {
				type: 'REGISTER_CONTAINER',
				containerContext,
				ref,
			};
		},
	},
	selectors: {
		getContainers: ( state ) => state,
	},
} );

register( store );

export const STORE_NOTICE_CONTAINERS_STORE_KEY = STORE_KEY;

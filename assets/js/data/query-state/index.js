const DEFAULT_STATE = {};
const SET_QUERY_KEY_VALUE = 'SET_QUERY_KEY_VALUE';
const SET_QUERY_CONTEXT_VALUE = 'SET_QUERY_CONTEXT_VALUE';

const getStateForContext = ( state, context ) => {
	return typeof state[ context ] === 'undefined' ?
		null :
		state[ context ];
};

const queryStateReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, context, queryKey, value } = action;
	if ( type === SET_QUERY_KEY_VALUE ) {
		// this is just for POC, there will be some other mechanism we'd probably
		// use (maybe use immutable.js as there will be different data types)
		const prevState = getStateForContext( state, context );

		const prevStateObject = prevState !== null ?
			JSON.parse( prevState ) :
			{};

		// mutate it and JSON.stringify to compare
		prevStateObject[ queryKey ] = value;
		const newState = JSON.stringify( prevStateObject );

		if ( prevState !== newState ) {
			return {
				...state,
				[ context ]: newState,
			};
		}
	}
	if ( type === SET_QUERY_CONTEXT_VALUE ) {
		const prevState = getStateForContext( state, context );
		const newState = JSON.stringify( value );
		if ( prevState !== newState ) {
			return {
				...state,
				[ context ]: newState,
			};
		}
	}
	return state;
};

const setQueryValue = ( context, queryKey, value ) => {
	return {
		type: SET_QUERY_KEY_VALUE,
		context,
		queryKey,
		value,
	};
};

const setValueForQueryContext = ( context, value ) => {
	return {
		type: SET_QUERY_CONTEXT_VALUE,
		context,
		value,
	};
};

const getValueForQueryKey = ( state, context, queryKey, defaultValue = {} ) => {
	let stateContext = getStateForContext( state, context );
	if ( stateContext === null ) {
		return defaultValue;
	}
	stateContext = JSON.parse( stateContext );
	return typeof stateContext[ queryKey ] !== 'undefined' ?
		stateContext[ queryKey ] :
		defaultValue;
};

const getValueForQueryContext = ( state, context, defaultValue = {} ) => {
	const stateContext = getStateForContext( state, context );
	return stateContext === null ? defaultValue : JSON.parse( stateContext );
};

const storeConfig = {
	reducer: queryStateReducer,
	actions: { setQueryValue, setValueForQueryContext },
	selectors: { getValueForQueryKey, getValueForQueryContext },
};
export default storeConfig;

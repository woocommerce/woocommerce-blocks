/**
 * Utility for updating nested state in the path that changed.
 */
function updateNested< Type >( // The state being updated
	state: Type,
	// The path being updated
	path: string[],
	// The value to update for the path
	value: unknown,
	// The current index in the path
	index: number
): Type {
	const key = path[ index ] as keyof Type;
	if ( index === path.length - 1 ) {
		return { ...state, [ key ]: value };
	}

	const nextState = state[ key ] || {};
	return {
		...state,
		[ key ]: updateNested( nextState, path, value, index + 1 ),
	} as Type;
}

/**
 * Utility for updating state and only cloning objects in the path that changed.
 */
export default function updateState< Type >(
	// The state being updated
	state: Type,
	// The path being updated
	path: string[],
	// The value to update for the path
	value: unknown
): Type {
	return updateNested( state, path, value, 0 );
}

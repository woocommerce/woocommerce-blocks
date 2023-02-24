export function arrayDifferenceBy< T >( a: T[], b: T[], key: keyof T ) {
	const keys = new Set( a.map( ( item ) => item[ key ] ) );

	return b.filter( ( item ) => ! keys.has( item[ key ] ) );
}

export function arrayUnionBy< T >( a: T[], b: T[], key: keyof T ) {
	const difference = arrayDifferenceBy( a, b, key );

	return [ ...a, ...difference ];
}

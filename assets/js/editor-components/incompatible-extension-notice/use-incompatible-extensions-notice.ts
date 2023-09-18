export const useIncompatibleExtensionNotice = (): [
	{ [ k: string ]: string } | null,
	string[],
	number
] => {
	const incompatibleExtensions = {
		secondIncompatibleExtension: 'Second Incompatible Extension',
		firstIncompatibleExtension: 'First Incompatible Extension',
		aawesomeIncompatibleExtension: 'Aawesome Incompatible Extension',
	};
	const incompatibleExtensionSlugs = Object.keys( incompatibleExtensions );
	const incompatibleExtensionCount = incompatibleExtensionSlugs.length;

	// const incompatibleExtensions = {};
	// const incompatibleExtensionSlugs = Object.keys( incompatibleExtensions );
	// const incompatibleExtensionCount = incompatibleExtensionSlugs.length;

	// console.clear();
	// console.log( {
	// 	incompatibleExtensions,
	// 	incompatibleExtensionSlugs,
	// 	incompatibleExtensionCount,
	// } );

	return [
		incompatibleExtensions,
		incompatibleExtensionSlugs,
		incompatibleExtensionCount,
	];
};

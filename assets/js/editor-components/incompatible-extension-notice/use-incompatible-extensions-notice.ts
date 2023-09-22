/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';

export const useIncompatibleExtensionNotice = (): [
	{ [ k: string ]: string } | null,
	string[],
	number
] => {
	const { incompatibleExtensions } = useSelect( ( select ) => {
		const { getIncompatibleExtensions } = select(
			'wc/store/incompatible-extensions'
		);
		return {
			incompatibleExtensions: getIncompatibleExtensions(),
		};
	}, [] );

	const incompatibleExtensionSlugs = Object.keys( incompatibleExtensions );
	const incompatibleExtensionCount = incompatibleExtensionSlugs.length;

	return [
		incompatibleExtensions,
		incompatibleExtensionSlugs,
		incompatibleExtensionCount,
	];
};

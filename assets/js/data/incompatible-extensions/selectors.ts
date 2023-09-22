/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

interface GlobalIncompatibleExtensions {
	id: string;
	title: string;
}

const incompatibleExtensions: Record< string, string > = {};

if ( getSetting( 'incompatibleExtensions' ) ) {
	getSetting< GlobalIncompatibleExtensions[] >(
		'incompatibleExtensions'
	).forEach( ( extension ) => {
		incompatibleExtensions[ extension.id ] = extension.title;
	} );
}

export const getIncompatibleExtensions = () => incompatibleExtensions;

/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';

export const useIsDescendentOfSingleProductTemplate = ( {
	isDescendentOfQueryLoop,
}: {
	isDescendentOfQueryLoop: boolean;
} ) =>
	useSelect(
		( select ) => {
			const store = select( 'core/edit-site' );
			const postId = store?.getEditedPostId< string | undefined >();

			if ( ! postId ) {
				return false;
			}

			return (
				postId.includes( '//single-product' ) &&
				! isDescendentOfQueryLoop
			);
		},
		[ isDescendentOfQueryLoop ]
	);

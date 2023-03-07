/**
 * External dependencies
 */
import type { NoticeType } from '@woocommerce/types';

export type SnackbarListProps = {
	// Class name to be added to the container.
	className?: string | undefined;
	// List of notices to be rendered.
	notices: NoticeType[];
	// Callback to be called when a notice is dismissed.
	onRemove: ( id: string ) => void;
};

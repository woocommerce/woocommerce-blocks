/**
 * External dependencies
 */
import type {
	Notice as NoticeType,
	Options as NoticeOptions,
} from '@wordpress/notices';

export interface StoreNoticesContainerProps {
	className?: string | undefined;
	context?: string | undefined;
	// If true, notices under the `wc/global` context will be shown as well as notices in the given context.
	showGlobal?: boolean | undefined;
	// List of additional notices that were added inline and not stored in the `core/notices` store.
	additionalNotices?: ( NoticeType & NoticeOptions )[];
	// Passing forceType will force all notices in the context to be of a certain type. e.g. Regular notices would be displayed as Snack Bars.
	forceType?: 'default' | 'snackbar' | null | undefined;
}

export type StoreNotice = NoticeType & NoticeOptions;

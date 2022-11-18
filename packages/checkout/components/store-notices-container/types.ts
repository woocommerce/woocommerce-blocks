/**
 * External dependencies
 */
import type {
	Notice as NoticeType,
	Options as NoticeOptions,
} from '@wordpress/notices';

export interface StoreNoticesContainerProps {
	className?: string;
	context?: string;
	showGlobal: boolean;
	additionalNotices?: ( NoticeType & NoticeOptions )[];
	forceType: 'default' | 'snackbar' | null;
}

export type StoreNotice = NoticeType & NoticeOptions;

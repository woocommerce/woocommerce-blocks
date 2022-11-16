/**
 * External dependencies
 */
import type {
	Notice as NoticeType,
	Options as NoticeOptions,
} from '@wordpress/notices';

export interface StoreNotice {
	content: string;
	id: string;
	status: string;
	isDismissible?: boolean;
	type: 'default' | 'snackbar';
}

export interface StoreNoticesContainerProps {
	className?: string;
	context?: string;
	additionalNotices?: ( NoticeType & NoticeOptions )[];
}

export { NoticeType, NoticeOptions };

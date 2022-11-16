/**
 * External dependencies
 */
import type { Options as NoticeOptions } from '@wordpress/notices';

export type StoreNoticeContextType = {
	createNotice: (
		status: 'error' | 'warning' | 'info',
		message: string,
		options: Partial<
			Omit< NoticeOptions, 'context' > & {
				context: string;
			}
		>
	) => void;
	registerContainer: (
		context: string,
		ref: React.MutableRefObject< HTMLDivElement | null >
	) => void;
	suppressNotices: boolean;
};

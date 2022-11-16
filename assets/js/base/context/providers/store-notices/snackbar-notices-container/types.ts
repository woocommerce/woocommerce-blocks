/**
 * External dependencies
 */
import type {
	Notice as NoticeType,
	Options as NoticeOptions,
} from '@wordpress/notices';

export interface SnackbarNoticesContainerProps {
	className?: string;
	context?: string;
	forceType?: boolean;
}

export { NoticeType, NoticeOptions };

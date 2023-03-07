/**
 * External dependencies
 */
import type { Notice, Options } from '@wordpress/notices';

export interface NoticeType extends Omit< Notice, 'status' >, Options {
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
}

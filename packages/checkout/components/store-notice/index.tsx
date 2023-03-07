/**
 * External dependencies
 */
import classnames from 'classnames';
import NoticeBanner from '@woocommerce/base-components/notice-banner';
import type { NoticeBannerProps } from '@woocommerce/base-components/notice-banner/types';

/**
 * Wrapper for NoticeBanner component.
 */
const StoreNotice = ( {
	className,
	children,
	status,
	...props
}: NoticeBannerProps ) => {
	return (
		<NoticeBanner
			className={ classnames( 'wc-block-store-notice', className ) }
			status={ status }
			{ ...props }
		>
			{ children }
		</NoticeBanner>
	);
};

export default StoreNotice;

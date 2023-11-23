/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import NoticeBanner, {
	NoticeBannerProps,
} from '~/base/components/notice-banner';

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

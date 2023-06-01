/**
 * External dependencies
 */
import classnames from 'classnames';
import NoticeBanner, {
	NoticeBannerProps,
} from '@woocommerce/base-components/notice-banner';
import { useSelect } from '@wordpress/data';
import { STORE_NOTICES_STORE_KEY } from '@woocommerce/block-data';
import { NoticeType } from '@woocommerce/types';

/**
 * Wrapper for NoticeBanner component.
 */
const StoreNotice = ( {
	className,
	children,
	status,
	context,
	id,
	...props
}: NoticeBannerProps & NoticeType ) => {
	const highlightedNotices = useSelect( ( select ) => {
		return select( STORE_NOTICES_STORE_KEY ).getHighlightedNotices();
	} );

	const isHighlighted = highlightedNotices.some(
		( notice ) => notice.id === id && notice.context === context
	);

	return (
		<NoticeBanner
			className={ classnames( 'wc-block-store-notice', className ) }
			status={ status }
			isHighlighted={ isHighlighted }
			{ ...props }
		>
			{ children }
		</NoticeBanner>
	);
};

export default StoreNotice;

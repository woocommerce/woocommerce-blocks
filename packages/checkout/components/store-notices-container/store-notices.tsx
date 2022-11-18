/**
 * External dependencies
 */
import classnames from 'classnames';
import { useRef, useEffect } from '@wordpress/element';
import { Notice } from 'wordpress-components';
import { sanitizeHTML } from '@woocommerce/utils';
import { useDispatch } from '@wordpress/data';
import { usePrevious } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';
import { STORE_NOTICE_CONTAINERS_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { getClassNameFromStatus } from './utils';
import type { NoticeType, NoticeOptions } from './types';

const StoreNotices = ( {
	context,
	className,
	notices,
}: {
	context: string;
	className: string;
	notices: Array< NoticeType & NoticeOptions >;
} ): JSX.Element => {
	const { removeNotice } = useDispatch( 'core/notices' );
	const ref = useRef< HTMLDivElement >( null );
	const { registerContainer } = useDispatch(
		STORE_NOTICE_CONTAINERS_STORE_KEY
	);

	// Register the container with the parent.
	useEffect( () => {
		registerContainer( context, ref );
	}, [ context, ref, registerContainer ] );

	// Scroll to container when an error is added here.
	const noticeIds = notices.map( ( notice ) => notice.id );
	const previousNoticeIds = usePrevious( noticeIds );

	useEffect( () => {
		const newNoticeIds = noticeIds.filter(
			( value ) =>
				! previousNoticeIds || ! previousNoticeIds.includes( value )
		);

		if ( newNoticeIds.length ) {
			ref.current?.scrollIntoView( {
				behavior: 'smooth',
			} );
		}
	}, [ noticeIds, previousNoticeIds, ref ] );

	return (
		<div
			ref={ ref }
			className={ classnames( className, 'wc-block-components-notices' ) }
		>
			{ notices.map( ( props ) => (
				<Notice
					key={ `store-notice-${ props.id }` }
					{ ...props }
					className={ classnames(
						'wc-block-components-notices__notice',
						getClassNameFromStatus( props )
					) }
					onRemove={ () => {
						if ( props.isDismissible ) {
							removeNotice( props.id, context );
						}
					} }
				>
					{ sanitizeHTML( decodeEntities( props.content ) ) }
				</Notice>
			) ) }
		</div>
	);
};

export default StoreNotices;

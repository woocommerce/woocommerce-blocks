/**
 * External dependencies
 */
import classnames from 'classnames';
import { useRef, useEffect } from '@wordpress/element';
import { Notice } from 'wordpress-components';
import { sanitizeHTML } from '@woocommerce/utils';
import { useDispatch, useSelect } from '@wordpress/data';
import { usePrevious } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import './style.scss';
import { getClassNameFromStatus } from './utils';
import type {
	StoreNoticesContainerProps,
	NoticeType,
	NoticeOptions,
} from './types';
import { useStoreNoticeContext } from '../store-notice-context';

const StoreNoticesContainer = ( {
	className,
	context = 'default',
	additionalNotices = [],
}: StoreNoticesContainerProps ): JSX.Element | null => {
	const ref = useRef< HTMLDivElement >( null );
	const { registerContainer, suppressNotices } = useStoreNoticeContext();
	const { removeNotice } = useDispatch( 'core/notices' );

	const notices = useSelect< Array< NoticeType & NoticeOptions > >(
		( select ) =>
			select( 'core/notices' ).getNotices( context ) as Array<
				NoticeType & NoticeOptions
			>
	)
		.filter( ( notice ) => notice.type !== 'snackbar' )
		.concat( additionalNotices );

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

	if ( suppressNotices ) {
		return null;
	}

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

export default StoreNoticesContainer;

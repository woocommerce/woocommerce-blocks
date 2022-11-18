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
import { STORE_NOTICES_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { getClassNameFromStatus } from './utils';
import type { StoreNotice } from './types';

const StoreNotices = ( {
	context,
	className,
	notices,
}: {
	context: string;
	className: string;
	notices: StoreNotice[];
} ): JSX.Element => {
	const { removeNotice } = useDispatch( 'core/notices' );
	const ref = useRef< HTMLDivElement >( null );
	const { registerContainer, unregisterContainer } = useDispatch(
		STORE_NOTICES_STORE_KEY
	);

	// Register the container with the parent.
	useEffect( () => {
		registerContainer( context, ref );
		return function cleanup() {
			unregisterContainer( context );
		};
	}, [ context, ref, registerContainer, unregisterContainer ] );

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
			{ notices.map( ( notice ) => (
				<Notice
					key={ `store-notice-${ notice.id }` }
					{ ...notice }
					className={ classnames(
						'wc-block-components-notices__notice',
						getClassNameFromStatus( notice )
					) }
					onRemove={ () => {
						if ( notice.isDismissible ) {
							removeNotice( notice.id, notice.context );
						}
					} }
				>
					{ sanitizeHTML( decodeEntities( notice.content ) ) }
				</Notice>
			) ) }
		</div>
	);
};

export default StoreNotices;

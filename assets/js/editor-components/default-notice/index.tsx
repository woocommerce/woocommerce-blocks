/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import triggerFetch from '@wordpress/api-fetch';
import { store as coreStore } from '@wordpress/core-data';
import { Notice } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { CHECKOUT_PAGE_ID, CART_PAGE_ID } from '@woocommerce/block-settings';
import {
	useCallback,
	useState,
	createInterpolateElement,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

export function DefaultNotice( { block }: { block: string } ) {
	// To avoid having the same logic twice, we're going to handle both pages here.
	const ORIGINAL_PAGE_ID =
		block === 'checkout' ? CHECKOUT_PAGE_ID : CART_PAGE_ID;
	const settingName =
		block === 'checkout'
			? 'woocommerce_checkout_page_id'
			: 'woocommerce_cart_page_id';

	// Everything below works the same for Cart/Checkout
	const { saveEntityRecord } = useDispatch( coreStore );
	const { editPost, savePost } = useDispatch( editorStore );
	const { slug, postPublished, currentPostId } = useSelect( ( select ) => {
		const { getEntityRecord } = select( coreStore );
		const { isCurrentPostPublished, getCurrentPostId } =
			select( editorStore );
		return {
			slug:
				getEntityRecord( 'postType', 'page', ORIGINAL_PAGE_ID )?.slug ||
				block,
			postPublished: isCurrentPostPublished(),
			currentPostId: getCurrentPostId(),
		};
	}, [] );
	const [ settingStatus, setStatus ] = useState( 'pristine' );
	const updatePage = useCallback( () => {
		setStatus( 'updating' );
		Promise.resolve()
			.then( () =>
				triggerFetch( {
					path: `/wc/v3/settings/advanced/${ settingName }`,
					method: 'GET',
				} )
			)
			.catch( ( error ) => {
				if ( error.code === 'rest_setting_setting_invalid' ) {
					setStatus( 'error' );
				}
			} )
			.then( () => {
				if ( ! postPublished ) {
					editPost( { status: 'publish' } );
					return savePost();
				}
			} )
			.then( () =>
				// Make this page ID the default cart/checkout.
				triggerFetch( {
					path: `/wc/v3/settings/advanced/${ settingName }`,
					method: 'POST',
					data: {
						value: currentPostId.toString(),
					},
				} )
			)
			// Append `-2` to the original link so we can use it here.
			.then( () => {
				if ( ORIGINAL_PAGE_ID !== 0 ) {
					return saveEntityRecord( 'postType', 'page', {
						id: ORIGINAL_PAGE_ID,
						slug: `${ slug }-2`,
					} );
				}
			} )
			// Use the original link for this page.
			.then( () => editPost( { slug } ) )
			// Save page.
			.then( () => savePost() )
			.then( () => setStatus( 'updated' ) );
	}, [
		postPublished,
		editPost,
		savePost,
		settingName,
		currentPostId,
		ORIGINAL_PAGE_ID,
		saveEntityRecord,
		slug,
	] );
	const noticeContent = createInterpolateElement(
		__(
			'If you would like to use this block as your default <blockTypeLink/>, <updateLink>update your page settings</updateLink>.',
			'woo-gutenberg-products-block'
		),
		{
			blockTypeLink: (
				<span>
					{ block === 'checkout'
						? __( 'checkout', 'woo-gutenberg-products-block' )
						: __( 'cart', 'woo-gutenberg-products-block' ) }
				</span>
			),
			updateLink: (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a href="#" onClick={ updatePage }>
					{ __(
						'update your page settings',
						'woo-gutenberg-products-block'
					) }
				</a>
			),
		}
	);
	// Avoid showing the notice on the site editor, if already set, or if dismissed earlier.
	if (
		( typeof pagenow === 'string' && pagenow === 'site-editor' ) ||
		currentPostId === ORIGINAL_PAGE_ID ||
		settingStatus === 'dismissed'
	) {
		return null;
	}
	return (
		<Notice
			className="wc-default-page-notice"
			status={ settingStatus === 'updated' ? 'success' : 'info' }
			onRemove={ () => setStatus( 'dismissed' ) }
			spokenMessage={
				settingStatus === 'updated'
					? __(
							'Page settings updated',
							'woo-gutenberg-products-block'
					  )
					: noticeContent
			}
		>
			{ settingStatus === 'updated' ? (
				__( 'Page settings updated', 'woo-gutenberg-products-block' )
			) : (
				<>
					<p>{ noticeContent }</p>
				</>
			) }
		</Notice>
	);
}

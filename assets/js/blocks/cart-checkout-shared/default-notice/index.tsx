/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as editorStore } from '@wordpress/editor';
import { store as coreStore } from '@wordpress/core-data';
import { SETTINGS_STORE_NAME as settingsStore } from '@woocommerce/data';
import { Notice, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { CHECKOUT_PAGE_ID, CART_PAGE_ID } from '@woocommerce/block-settings';
import { useCallback, useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter, hasFilter } from '@wordpress/hooks';
import type { StoreDescriptor } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './editor.scss';
import { isCartOrCheckoutOrInnerBlock } from '../../../editor-components/utils';

declare module '@wordpress/editor' {
	let store: StoreDescriptor;
}

declare module '@wordpress/core-data' {
	let store: StoreDescriptor;
}

export function DefaultNotice( { page }: { page: string } ) {
	// To avoid having the same logic twice, we're going to handle both pages here.
	const ORIGINAL_PAGE_ID =
		page === 'checkout' ? CHECKOUT_PAGE_ID : CART_PAGE_ID;
	const settingName =
		page === 'checkout'
			? 'woocommerce_checkout_page_id'
			: 'woocommerce_cart_page_id';

	const noticeContent =
		page === 'checkout'
			? __(
					'If you would like to use this block as your default checkout, update your page settings',
					'woo-gutenberg-products-block'
			  )
			: __(
					'If you would like to use this block as your default cart, update your page settings',
					'woo-gutenberg-products-block'
			  );

	// Everything below works the same for Cart/Checkout
	const { updateAndPersistSettingsForGroup } = useDispatch( settingsStore );
	const { saveEntityRecord } = useDispatch( coreStore );
	const { editPost, savePost } = useDispatch( editorStore );
	const { slug, isLoadingPage, postPublished, currentPostId } = useSelect(
		( select ) => {
			const { getEntityRecord, isResolving } = select( coreStore );
			const { isCurrentPostPublished, getCurrentPostId } =
				select( editorStore );
			return {
				slug:
					getEntityRecord( 'postType', 'page', ORIGINAL_PAGE_ID )
						?.slug || page,
				isLoadingPage: isResolving( 'getEntityRecord', [
					'postType',
					'page',
					ORIGINAL_PAGE_ID,
				] ),
				postPublished: isCurrentPostPublished(),
				currentPostId: getCurrentPostId(),
			};
		},
		[]
	);
	const [ settingStatus, setStatus ] = useState( 'pristine' );
	const updatePage = useCallback( () => {
		setStatus( 'updating' );
		Promise.resolve()
			.then( () => {
				if ( ! postPublished ) {
					editPost( { status: 'publish' } );
					return savePost();
				}
			} )
			.then( () =>
				// Make this page ID the default cart/checkout.
				updateAndPersistSettingsForGroup( 'advanced', {
					advanced: {
						[ settingName ]: currentPostId.toString(),
					},
				} )
			)
			// Append `-2` to the original link so we can use it here.
			.then( () => {
				if ( CHECKOUT_PAGE_ID !== 0 ) {
					return saveEntityRecord( 'postType', 'page', {
						id: CHECKOUT_PAGE_ID,
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
		updateAndPersistSettingsForGroup,
		settingName,
		currentPostId,
		saveEntityRecord,
		slug,
	] );
	if ( currentPostId === ORIGINAL_PAGE_ID || settingStatus === 'dismissed' ) {
		return null;
	}
	return (
		<Notice
			className="wc-default-page-notice"
			status={ settingStatus === 'updated' ? 'success' : 'warning' }
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
					<Button
						onClick={ updatePage }
						variant="secondary"
						isBusy={ settingStatus === 'updating' }
						disabled={ isLoadingPage }
						isSmall={ true }
					>
						{ __(
							'update your page settings',
							'woo-gutenberg-products-block'
						) }
					</Button>
				</>
			) }
		</Notice>
	);
}

const withDefaultNotice = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
		const { isCart, isCheckout } = isCartOrCheckoutOrInnerBlock( clientId );
		return (
			<>
				{ ( isCart || isCheckout ) && (
					<InspectorControls>
						<DefaultNotice
							page={ isCheckout ? 'checkout' : 'cart' }
						/>
					</InspectorControls>
				) }

				<BlockEdit { ...props } />
			</>
		);
	},
	'withDefaultNotice'
);

if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/add/default-notice' ) ) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/default-notice',
		withDefaultNotice,
		20
	);
}

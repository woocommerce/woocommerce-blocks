/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as editorStoreName } from '@wordpress/editor';
import { store as coreStoreName } from '@wordpress/core-data';
import { SETTINGS_STORE_NAME as settingsStoreName } from '@woocommerce/data';
import { useEditorContext } from '@woocommerce/base-context';
import { Notice, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { CHECKOUT_PAGE_ID, CART_PAGE_ID } from '@woocommerce/block-settings';
import { useCallback, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

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
	const { currentPostId } = useEditorContext();
	const { updateAndPersistSettingsForGroup } =
		useDispatch( settingsStoreName );
	const { saveEntityRecord } = useDispatch( coreStoreName );
	const { editPost, savePost } = useDispatch( editorStoreName );
	const { originalPage } = useSelect( ( select ) => {
		const { getEntityRecord } = select( coreStoreName );

		return {
			originalPage: getEntityRecord(
				'postType',
				'page',
				ORIGINAL_PAGE_ID
			),
		};
	}, [] );
	const [ settingStatus, setStatus ] = useState( 'pristine' );
	const updatePage = useCallback( () => {
		setStatus( 'updating' );
		// Make this page ID the default cart/checkout.
		updateAndPersistSettingsForGroup( 'advanced', {
			advanced: {
				[ settingName ]: currentPostId.toString(),
			},
		} )
			// Append `-2` to the original link so we can use it here.
			.then( () =>
				saveEntityRecord( 'postType', 'page', {
					id: CHECKOUT_PAGE_ID,
					slug: `${ originalPage.slug }-2`,
				} )
			)
			// Use the original link for this page.
			.then( () => editPost( { slug: originalPage.slug } ) )
			// Save page.
			.then( () => savePost() )
			.then( () => setStatus( 'updated' ) );
	}, [
		savePost,
		editPost,
		settingName,
		currentPostId,
		saveEntityRecord,
		originalPage?.slug,
		updateAndPersistSettingsForGroup,
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
						disabled={ ! originalPage }
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

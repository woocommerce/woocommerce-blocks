/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Notice, ExternalLink, Button } from '@wordpress/components';
import {
	createInterpolateElement,
	useEffect,
	useState,
} from '@wordpress/element';
import { Alert } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { useCombinedIncompatibilityNotice } from './use-combined-incompatibility-notice';
import { Modal, ModalFooter } from './modal';
import './editor.scss';

interface ExtensionNoticeProps {
	toggleDismissedStatus: ( status: boolean ) => void;
	block: 'woocommerce/cart' | 'woocommerce/checkout';
	clientId: string;
}

export function IncompatibleExtensionsNotice( {
	toggleDismissedStatus,
	block,
	clientId,
}: ExtensionNoticeProps ) {
	const [
		isVisible,
		dismissNotice,
		incompatiblePaymentMethods,
		numberOfIncompatiblePaymentMethods,
	] = useCombinedIncompatibilityNotice( block );
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
	const { replaceBlock } = useDispatch( 'core/block-editor' );
	const { getBlocks, selectBlock } = useSelect( ( select ) => {
		return {
			getBlocks: select( 'core/block-editor' ).getBlocks,
		};
	}, [] );

	useEffect( () => {
		toggleDismissedStatus( ! isVisible );
	}, [ isVisible, toggleDismissedStatus ] );

	if ( ! isVisible ) {
		return null;
	}

	const switchButtonLabel =
		block === 'woocommerce/cart'
			? __( 'Switch to classic cart', 'woo-gutenberg-products-block' )
			: __(
					'Switch to classic checkout',
					'woo-gutenberg-products-block'
			  );
	const blockLabel = block === 'woocommerce/cart' ? 'cart' : 'checkout';

	const noticeContent = (
		<>
			{ numberOfIncompatiblePaymentMethods > 1
				? createInterpolateElement(
						sprintf(
							// translators: %s is the name of the parent block.
							__(
								'Some extensions do not yet support the new %s and may impact the shopper experience. <a>Learn more</a>',
								'woo-gutenberg-products-block'
							),
							blockLabel
						),
						{
							a: (
								<ExternalLink href="https://woocommerce.com/document/cart-checkout-blocks-support-status/" />
							),
						}
				  )
				: createInterpolateElement(
						sprintf(
							// translators: %1$s is the name of the extension, %2$s is the name of the parent block.
							__(
								'<strong>%1$s</strong> does not yet support the new %2$s and may impact the shopper experience. <a>Learn more</a>',
								'woo-gutenberg-products-block'
							),
							Object.values( incompatiblePaymentMethods )[ 0 ],
							blockLabel
						),
						{
							strong: <strong />,
							a: (
								<ExternalLink href="https://woocommerce.com/document/cart-checkout-blocks-support-status/" />
							),
						}
				  ) }
		</>
	);

	return (
		<Notice
			className="wc-blocks-incompatible-extensions-notice"
			status={ 'warning' }
			onRemove={ dismissNotice }
			spokenMessage={ noticeContent }
		>
			<div className="wc-blocks-incompatible-extensions-notice__content">
				<Icon
					className="wc-blocks-incompatible-extensions-notice__warning-icon"
					icon={ <Alert /> }
				/>
				<div>
					<p>{ noticeContent }</p>
					{ numberOfIncompatiblePaymentMethods > 1 && (
						<ul>
							{ Object.entries( incompatiblePaymentMethods ).map(
								( [ id, title ] ) => (
									<li
										key={ id }
										className="wc-blocks-incompatible-extensions-notice__element"
									>
										{ title }
									</li>
								)
							) }
						</ul>
					) }
					<Button variant={ 'primary' } onClick={ openModal }>
						{ switchButtonLabel }
					</Button>
					{ isOpen && (
						<Modal
							title={ switchButtonLabel }
							onRequestClose={ closeModal }
						>
							<p>
								{ sprintf(
									// translators: %s is the name of the parent block.
									__(
										'If you turn off the new %1$s it will be replaced with the classic %1$s shortcode. This means you may lose:',
										'woo-gutenberg-products-block'
									),
									blockLabel
								) }
							</p>
							<ul>
								<li>
									{ __(
										'Customizations and updates to the block',
										'woo-gutenberg-products-block'
									) }
								</li>
								<li>
									{ __(
										'Additional local pickup options created for the new cart/checkout',
										'woo-gutenberg-products-block'
									) }
								</li>
							</ul>
							<ModalFooter>
								<Button
									variant="primary"
									onClick={ () => {
										replaceBlock(
											clientId,
											createBlock(
												'woocommerce/classic-shortcode',
												{
													shortcode:
														block ===
														'woocommerce/checkout'
															? 'checkout'
															: 'cart',
												}
											)
										);
										const blocks = getBlocks();

										const shortcodeBlock = blocks.find(
											( foundBlock ) =>
												foundBlock.name ===
												'woocommerce/classic-shortcode'
										);

										if ( shortcodeBlock ) {
											selectBlock(
												shortcodeBlock.clientId
											);
										}
										closeModal();
									} }
								>
									{ switchButtonLabel }
								</Button>{ ' ' }
								<Button
									variant="secondary"
									onClick={ closeModal }
								>
									{ __(
										'Cancel',
										'woo-gutenberg-products-block'
									) }
								</Button>
							</ModalFooter>
						</Modal>
					) }
				</div>
			</div>
		</Notice>
	);
}

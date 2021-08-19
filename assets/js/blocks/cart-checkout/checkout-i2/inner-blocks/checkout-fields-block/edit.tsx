/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Main } from '@woocommerce/base-components/sidebar-layout';
import { getRegisteredBlocks } from '@woocommerce/blocks-checkout';
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { useCheckoutBlockControlsContext } from '../../context';
import { useForcedLayout } from '../../use-forced-layout';

const ALLOWED_BLOCKS = [
	'woocommerce/checkout-express-payment-block',
	'woocommerce/checkout-shipping-address-block',
	'woocommerce/checkout-shipping-methods-block',
	'woocommerce/checkout-contact-information-block',
	'woocommerce/checkout-billing-address-block',
	'woocommerce/checkout-payment-block',
	'woocommerce/checkout-order-note-block',
	'woocommerce/checkout-actions-block',
	'woocommerce/checkout-terms-block',
	'core/paragraph',
	'core/heading',
	'core/separator',
];

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();

	const {
		addressFieldControls: Controls,
	} = useCheckoutBlockControlsContext();
	const registeredBlocks = getRegisteredBlocks( 'fields' );
	const { current: template = [] } = useRef< Array< string > >( [
		...ALLOWED_BLOCKS,
		...registeredBlocks,
	] );
	useForcedLayout( {
		clientId,
		template,
	} );
	return (
		<Main className="wc-block-checkout__main">
			<div { ...blockProps }>
				<Controls />
				<form className="wc-block-components-form wc-block-checkout__form">
					<InnerBlocks
						allowedBlocks={ template }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</form>
			</div>
		</Main>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};

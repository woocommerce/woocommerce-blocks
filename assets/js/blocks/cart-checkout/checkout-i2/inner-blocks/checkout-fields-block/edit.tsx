/**
 * External dependencies
 */
import { useLayoutEffect, useRef } from '@wordpress/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { Main } from '@woocommerce/base-components/sidebar-layout';
import { getRegisteredBlocks } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useCheckoutBlockControlsContext } from '../../context';

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

	// ------------------------------EXPERIMENT------------------------------
	const registeredBlocks = getRegisteredBlocks( 'fields' );
	const currentRegisteredBlocks = useRef( registeredBlocks );
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const currentBlock = useSelect(
		( select ) => {
			if ( clientId ) {
				const store = select( 'core/block-editor' );
				return store.getBlocksByClientId( clientId )[ 0 ];
			}
			return null;
		},
		[ clientId ]
	);
	/**
	 * If the current inner blocks differ from the registered blocks, push the differences.
	 *
	 * @todo Registration system needs to mark which blocks are "forced" and only insert them below.
	 */
	useLayoutEffect( () => {
		if ( currentBlock === null ) {
			return;
		}

		const innerBlocks = currentBlock.innerBlocks || [];

		// Missing check to see if registered block is 'forced'
		currentRegisteredBlocks.current.forEach( ( blockName: string ) => {
			const block = getBlockType( blockName );
			console.log( block );
			if (
				block.force &&
				! innerBlocks.find(
					( { name }: { name: string } ) => name === blockName
				)
			) {
				const newBlock = createBlock( blockName, {} );
				// eslint-disable-next-line no-console
				console.log( 'inserting ' + blockName );
				insertBlock( newBlock, innerBlocks.length, clientId, false );
			}
		} );
	}, [ clientId, currentBlock, insertBlock ] );
	// ------------------------------END EXPERIMENT------------------------------

	const {
		addressFieldControls: Controls,
	} = useCheckoutBlockControlsContext();

	return (
		<Main className="wc-block-checkout__main">
			<div { ...blockProps }>
				<Controls />
				<form className="wc-block-components-form wc-block-checkout__form">
					<InnerBlocks
						allowedBlocks={ [
							ALLOWED_BLOCKS,
							...currentRegisteredBlocks.current,
						] }
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

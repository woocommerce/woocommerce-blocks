/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Disabled, Toolbar } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import TextToolbarButton from '@woocommerce/block-components/text-toolbar-button';
import PropTypes from 'prop-types';
import { withFeedbackPrompt } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';

/**
 * Component to handle edit mode of "Cart Block".
 */
const CartEditor = ( { className, clientId } ) => {
	const [ isFullCartMode, setFullCartMode ] = useState( true );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		selectBlock( clientId );
	}, [ clientId ] );

	const toggleFullCartMode = () => {
		setFullCartMode( ! isFullCartMode );
	};

	const getBlockControls = () => {
		return (
			<BlockControls className="wc-block-cart-toolbar">
				<Toolbar>
					<TextToolbarButton
						onClick={ toggleFullCartMode }
						isToggled={ isFullCartMode }
					>
						{ __( 'Full Cart', 'woo-gutenberg-products-block' ) }
					</TextToolbarButton>
					<TextToolbarButton
						onClick={ toggleFullCartMode }
						isToggled={ ! isFullCartMode }
					>
						{ __( 'Empty Cart', 'woo-gutenberg-products-block' ) }
					</TextToolbarButton>
				</Toolbar>
			</BlockControls>
		);
	};

	return (
		<div className={ className }>
			{ getBlockControls() }
			{ isFullCartMode && (
				<Disabled>
					<FullCart />
				</Disabled>
			) }
			<EmptyCart hidden={ isFullCartMode } />
		</div>
	);
};

CartEditor.propTypes = {
	className: PropTypes.string,
};

export default withFeedbackPrompt(
	__(
		'We are currently working on improving our cart and providing merchants with tools and options to customize their cart to their stores needs.',
		'woo-gutenberg-products-block'
	)
)( CartEditor );

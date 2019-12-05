/**
 * External dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FullCart from './components/full-cart';
import EmptyCart from './components/empty-cart';

/**
 * Component to handle edit mode of "Cart Block".
 */
const Cart = () => {
	const [ isFullCartMode, setFullCartMode ] = useState( true );

	const toggleFullCartMode = () => {
		setFullCartMode( ! isFullCartMode );
	};

	const getBlockControls = () => {
		return (
			<BlockControls>
				<Toolbar
					controls={ [
						{
							// Using dashicons for now, but we need to decide whether we're using
							// icons or text. These icons are not ideal :)
							icon: 'yes-alt',
							title: __(
								'Full Cart',
								'woo-gutenberg-products-block'
							),
							onClick: toggleFullCartMode,
							isActive: isFullCartMode,
						},
						{
							icon: 'marker',
							title: __(
								'Empty Cart',
								'woo-gutenberg-products-block'
							),
							onClick: toggleFullCartMode,
							isActive: ! isFullCartMode,
						},
					] }
				/>
			</BlockControls>
		);
	};

	const cart = isFullCartMode ? <FullCart /> : <EmptyCart />;

	return (
		<Fragment>
			{ getBlockControls() }
			{ cart }
		</Fragment>
	);
};

Cart.propTypes = {};

export default Cart;

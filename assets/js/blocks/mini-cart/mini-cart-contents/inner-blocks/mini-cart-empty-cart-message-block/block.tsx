/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const Block = ( { className }: { className: string } ): JSX.Element => {
	return (
		<p className={ classNames( className, 'has-text-align-center' ) }>
			<strong>
				{ __(
					'Your cart is currently empty!',
					'woo-gutenberg-products-block'
				) }
			</strong>
		</p>
	);
};

export default Block;

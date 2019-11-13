/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const BlockError = () => {
	return (
		<div className="wc-block-error">
			<img className="wc-block-error__image" src="" alt="" />
			<div className="wc-block-error__content">
				<p className="wc-block-error__header">
					{ __( 'Oops!', 'woo-gutenberg-products-block' ) }
				</p>
				<p className="wc-block-error__text">
					{ __(
						'There was an error with loading this content.',
						'woo-gutenberg-products-block'
					) }
				</p>
			</div>
		</div>
	);
};

export default BlockError;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import type { BlockErrorProps } from './types';
const BlockError = ( {
	imageUrl = `${ WC_BLOCKS_IMAGE_URL }/block-error.svg`,
	header = __( 'Oops!', 'woo-gutenberg-products-block' ),
	text = __(
		'There was an error loading the content.',
		'woo-gutenberg-products-block'
	),
	errorMessage,
	errorMessagePrefix = __( 'Error:', 'woo-gutenberg-products-block' ),
	button,
	showErrorBlock = true,
}: BlockErrorProps ): React.ReactNode => {
	return showErrorBlock ? (
		<div className="wc-block-error wc-block-components-error">
			{ imageUrl && (
				<img
					className="wc-block-error__image wc-block-components-error__image"
					src={ imageUrl }
					alt=""
				/>
			) }
			<div className="wc-block-error__content wc-block-components-error__content">
				{ header && (
					<p className="wc-block-error__header wc-block-components-error__header">
						{ header }
					</p>
				) }
				{ text && (
					<p className="wc-block-error__text wc-block-components-error__text">
						{ text }
					</p>
				) }
				{ errorMessage && (
					<p className="wc-block-error__message wc-block-components-error__message">
						{ errorMessagePrefix ? errorMessagePrefix + ' ' : '' }
						{ errorMessage }
					</p>
				) }
				{ button && (
					<p className="wc-block-error__button wc-block-components-error__button">
						{ button }
					</p>
				) }
			</div>
		</div>
	) : null;
};

export default BlockError;

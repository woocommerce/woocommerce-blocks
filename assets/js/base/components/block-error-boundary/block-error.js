/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL } from '@woocommerce/block-settings';
import PropTypes from 'prop-types';

const BlockError = ( {
	imageUrl = `${ WC_BLOCKS_ASSET_URL }img/block-error.svg`,
	header = __( 'Oops!', 'woo-gutenberg-products-block' ),
	content = (
		<p>
			{ __(
				'There was an error with loading this content.',
				'woo-gutenberg-products-block'
			) }
		</p>
	),
	errorMessage,
} ) => {
	return (
		<div className="wc-block-error">
			{ imageUrl && (
				<img
					className="wc-block-error__image"
					src={ imageUrl }
					alt=""
				/>
			) }
			<div className="wc-block-error__content">
				{ header && (
					<p className="wc-block-error__header">{ header }</p>
				) }
				{ content && (
					<div className="wc-block-error__content">{ content }</div>
				) }
				{ errorMessage && (
					<div className="wc-block-error__message">
						{ errorMessage }
					</div>
				) }
			</div>
		</div>
	);
};

BlockError.propTypes = {
	/**
	 * Error message to display below the content.
	 */
	errorMessage: PropTypes.string,
	/**
	 * Content to display in the error block below the header.
	 * If it's `null` or an empty string, nothing will be displayed.
	 * If it's not defined, the default content will be used.
	 */
	content: PropTypes.node,
	/**
	 * Text to display as the heading of the error block.
	 * If it's `null` or an empty string, no header will be displayed.
	 * If it's not defined, the default header will be used.
	 */
	header: PropTypes.string,
	/**
	 * URL of the image to display.
	 * If it's `null` or an empty string, no image will be displayed.
	 * If it's not defined, the default image will be used.
	 */
	imageUrl: PropTypes.string,
};

export default BlockError;

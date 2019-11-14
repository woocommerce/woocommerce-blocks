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
	errorMessage: PropTypes.string,
	content: PropTypes.node,
	header: PropTypes.string,
	imageUrl: PropTypes.string,
};

export default BlockError;

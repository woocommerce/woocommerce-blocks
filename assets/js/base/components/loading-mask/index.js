/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './style.scss';

const LoadingMask = ( {
	children,
	className,
	screenReaderLabel,
	showSpinner = false,
	isLoading = true,
} ) => {
	return (
		<div
			className={ classNames(
				className,
				'wc-block-components-loading-mask',
				{
					'is-loading': isLoading,
				}
			) }
		>
			{ isLoading && showSpinner && <Spinner /> }
			<div
				className="wc-block-components-loading-mask__children"
				aria-hidden={ isLoading }
			>
				{ children }
			</div>
			{ isLoading && (
				<span className="screen-reader-text">
					{ screenReaderLabel ||
						__( 'Loading…', 'woo-gutenberg-products-block' ) }
				</span>
			) }
		</div>
	);
};

LoadingMask.propTypes = {
	className: PropTypes.string,
	screenReaderLabel: PropTypes.string,
	showSpinner: PropTypes.bool,
	isLoading: PropTypes.bool,
};

export default LoadingMask;

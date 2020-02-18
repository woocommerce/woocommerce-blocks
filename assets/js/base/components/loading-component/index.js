/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from 'wordpress-components';

/**
 * Internal dependencies
 */
import './style.scss';

const LoadingComponent = ( {
	children,
	className,
	screenReaderLabel,
	showSpinner = false,
} ) => {
	return (
		<div
			className={ classNames( className, 'wc-block-loading-component' ) }
		>
			{ showSpinner && <Spinner /> }
			<div
				className="wc-blocks-loading-component__children"
				aria-hidden={ true }
			>
				{ children }
			</div>
			<span className="screen-reader-text">
				{ screenReaderLabel ||
					__( 'Loading…', 'woo-gutenberg-products-block' ) }
			</span>
		</div>
	);
};

LoadingComponent.propTypes = {
	className: PropTypes.string,
	screenReaderLabel: PropTypes.string,
	showSpinner: PropTypes.bool,
};

export default LoadingComponent;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';
import Gridicon from 'gridicons';
import classNames from 'classnames';
import {
	Button,
	Placeholder,
	Spinner,
} from '@wordpress/components';

const ApiErrorPlaceholder = ( { className, errorMessage, isLoading, onRetry } ) => (
	<Placeholder
		icon={ <Gridicon icon="notice" /> }
		label={ __( 'Sorry, an error occurred', 'woo-gutenberg-products-block' ) }
		className={ classNames( 'wc-block-api-error', className ) }
	>
		<div className="wc-block-error__message">{ errorMessage }</div>
		{ onRetry && (
			<Fragment>
				{ isLoading ? (
					<Spinner />
				) : (
					<Button isDefault onClick={ onRetry }>
						{ __( 'Retry', 'woo-gutenberg-products-block' ) }
					</Button>
				) }
			</Fragment>
		) }
	</Placeholder>
);

ApiErrorPlaceholder.propTypes = {
	/**
	 * Callback to retry an action.
	 */
	onRetry: PropTypes.func.isRequired,
	/**
	 * Classname to add to placeholder in addition to the defaults.
	 */
	className: PropTypes.string,
	/**
	 * The error message to display from the API.
	 */
	errorMessage: PropTypes.node,
	/**
	 * Whether there is a request running, so the 'Retry' button is hidden and
	 * a spinner is shown instead.
	 */
	isLoading: PropTypes.bool,
};

export default ApiErrorPlaceholder;

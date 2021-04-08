/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';
import { useShallowEqual } from '@woocommerce/base-hooks';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import {
	ValidationInputError,
	useValidationContext,
} from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Select from './select';
import './style.scss';

const ValidatedSelect = ( {
	className,
	id,
	value,
	instanceId,
	required,
	errorId,
	errorMessage = __(
		'Please select a value.',
		'woo-gutenberg-products-block'
	),
	...rest
} ) => {
	const selectId = id || 'select-' + instanceId;
	errorId = errorId || selectId;

	// Prevents re-renders when value is an object, e.g. {key: "NY", name: "New York"}
	const currentValue = useShallowEqual( value );

	const {
		getValidationError,
		setValidationErrors,
		clearValidationError,
	} = useValidationContext();

	useEffect( () => {
		if ( ! required || currentValue ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message: errorMessage,
					hidden: true,
				},
			} );
		}
	}, [
		clearValidationError,
		currentValue,
		errorId,
		errorMessage,
		required,
		setValidationErrors,
	] );

	// Remove validation errors when unmounted.
	useEffect( () => {
		return () => {
			clearValidationError( errorId );
		};
	}, [ clearValidationError, errorId ] );

	const error = getValidationError( errorId ) || {};

	return (
		<Select
			id={ selectId }
			className={ classnames( className, {
				'has-error': error.message && ! error.hidden,
			} ) }
			feedback={ <ValidationInputError propertyName={ errorId } /> }
			value={ currentValue }
			{ ...rest }
		/>
	);
};

ValidatedSelect.propTypes = {
	className: PropTypes.string,
	errorId: PropTypes.string,
	errorMessage: PropTypes.string,
	id: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.shape( {
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	} ),
};

export default withInstanceId( ValidatedSelect );

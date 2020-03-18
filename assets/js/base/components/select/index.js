/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';
import { useValidationContext } from '@woocommerce/base-context';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CustomSelectControl } from 'wordpress-components';
import { withInstanceId } from 'wordpress-compose';

/**
 * Internal dependencies
 */
import { ValidationInputError } from '../validation';
import './style.scss';

const Select = ( {
	className,
	id,
	label,
	onChange,
	options,
	value,
	instanceId,
	required,
	errorId,
	errorMessage = __(
		'Please select a value.',
		'woo-gutenberg-products-block'
	),
} ) => {
	const selectId = id || 'select-' + instanceId;
	errorId = errorId || selectId;
	const {
		getValidationError,
		setValidationErrors,
		clearValidationError,
	} = useValidationContext();
	const validateSelect = () => {
		if ( ! required || value ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message: errorMessage,
					hidden: true,
				},
			} );
		}
	};

	useEffect( () => {
		validateSelect();
	}, [ value ] );

	const error = getValidationError( errorId ) || {};

	return (
		<div
			id={ selectId }
			className={ classnames( 'wc-block-select', className, {
				'is-active': value,
				'has-error': error.message && ! error.hidden,
			} ) }
		>
			<CustomSelectControl
				label={ label }
				onChange={ ( { selectedItem } ) => {
					onChange( selectedItem.key );
				} }
				options={ options }
				value={ value }
			/>
			<ValidationInputError propertyName={ errorId } />
		</div>
	);
};

Select.propTypes = {
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			key: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		} ).isRequired
	).isRequired,
	className: PropTypes.string,
	errorId: PropTypes.string,
	errorMessage: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.shape( {
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	} ),
};

export default withInstanceId( Select );

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CustomSelectControl } from 'wordpress-components';
import { withInstanceId } from 'wordpress-compose';

/**
 * Internal dependencies
 */
import './style.scss';

const Select = ( {
	className,
	feedback,
	id,
	label,
	onChange,
	options,
	value,
} ) => {
	return (
		<div
			id={ id }
			className={ classnames( 'wc-block-select', className, {
				'is-active': value,
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
			{ feedback }
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
	feedback: PropTypes.node,
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.shape( {
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	} ),
};

export default withInstanceId( Select );
export { default as ValidatedSelect } from './validated';

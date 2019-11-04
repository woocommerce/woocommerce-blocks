/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Fragment, useCallback, useMemo } from '@wordpress/element';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to show a list of checkboxes in a group.
 */
const CheckboxList = ( { className, onChange, options, isLoading } ) => {
	const renderPlaceholder = useMemo( () => {
		return (
			<Fragment>
				{ [ ...Array( 5 ) ].map( ( x, i ) => (
					<li
						key={ i }
						style={ {
							/* stylelint-disable */
							width: Math.floor( Math.random() * 75 ) + 25 + '%',
						} }
					/>
				) ) }
			</Fragment>
		);
	}, [] );

	const renderOptions = useCallback( () => {
		return (
			<Fragment>
				{ options.map( ( option ) => (
					<li key={ option.key }>
						<input
							type="checkbox"
							id={ option.key }
							name={ option.key }
							value="1"
							onChange={ onChange }
						/>
						<label htmlFor={ option.key }>{ option.label }</label>
					</li>
				) ) }
			</Fragment>
		);
	}, [ options ] );

	const listClass = classNames(
		'wc-block-checkbox-list',
		isLoading && 'is-loading',
		className
	);

	return (
		<ul className={ listClass }>
			{ isLoading ? renderPlaceholder : renderOptions() }
		</ul>
	);
};

CheckboxList.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			key: PropTypes.string.isRequired,
			label: PropTypes.node.isRequired,
			checked: PropTypes.bool,
		} )
	),
	className: PropTypes.string,
	isLoading: PropTypes.bool,
};

export default CheckboxList;

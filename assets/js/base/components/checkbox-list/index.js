/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	Fragment,
	useCallback,
	useMemo,
	useState,
	useEffect,
} from '@wordpress/element';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to show a list of checkboxes in a group.
 */
const CheckboxList = ( { className, onChange, options, isLoading } ) => {
	// Holds all checked options.
	const [ checked, setChecked ] = useState( [] );

	useEffect( () => {
		onChange( checked );
	}, [ checked ] );

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

	const onCheckboxChange = useCallback(
		( event ) => {
			const isChecked = event.target.checked;
			const checkedValue = event.target.value;
			const newChecked = checked;

			if ( ! isChecked ) {
				newChecked.filter( ( value ) => value !== checkedValue );
			} else {
				newChecked.push( checkedValue );
			}

			newChecked.sort();

			setChecked( newChecked );
		},
		[ options, checked ]
	);

	const renderOptions = useCallback( () => {
		return (
			<Fragment>
				{ options.map( ( option ) => (
					<li key={ option.key }>
						<input
							type="checkbox"
							id={ option.key }
							value={ option.key }
							onChange={ onCheckboxChange }
							checked={
								checked.includes( option.key )
									? 'checked'
									: false
							}
						/>
						<label htmlFor={ option.key }>{ option.label }</label>
					</li>
				) ) }
			</Fragment>
		);
	}, [ options, checked ] );

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

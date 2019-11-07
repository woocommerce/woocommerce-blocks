/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
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
const CheckboxList = ( {
	className,
	onChange,
	options,
	isLoading,
	limit = 10,
} ) => {
	// Holds all checked options.
	const [ checked, setChecked ] = useState( [] );
	const [ showExpanded, setShowExpanded ] = useState( false );

	useEffect( () => {
		onChange( checked );
	}, [ checked ] );

	const placeholder = useMemo( () => {
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
			const newChecked = checked.filter(
				( value ) => value !== checkedValue
			);

			if ( isChecked ) {
				newChecked.push( checkedValue );
				newChecked.sort();
			}

			setChecked( newChecked );
		},
		[ options, checked ]
	);

	const renderOptions = useCallback( () => {
		// Truncate options if > the limit + 5.
		const shouldTruncateOptions = options.length > limit + 5;
		const showOptions =
			shouldTruncateOptions && ! showExpanded
				? [ ...options.slice( 0, limit ) ]
				: options;
		return (
			<Fragment>
				{ showOptions.map( ( option ) => (
					<li key={ option.key }>
						<input
							type="checkbox"
							id={ option.key }
							value={ option.key }
							onChange={ onCheckboxChange }
							checked={ checked.includes( option.key ) }
						/>
						<label htmlFor={ option.key }>{ option.label }</label>
					</li>
				) ) }
				{ shouldTruncateOptions && (
					<li className="show-more">
						<button
							onClick={ () => {
								setShowExpanded( ! showExpanded );
							} }
						>
							{ showExpanded
								? __(
										'Show less',
										'woo-gutenberg-products-block'
								  )
								: __(
										'Show more',
										'woo-gutenberg-products-block'
								  ) }
						</button>
					</li>
				) }
			</Fragment>
		);
	}, [ options, checked, showExpanded ] );

	const listClass = classNames(
		'wc-block-checkbox-list',
		isLoading && 'is-loading',
		className
	);

	return (
		<ul className={ listClass }>
			{ isLoading ? placeholder : renderOptions() }
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
	limit: PropTypes.number,
};

export default CheckboxList;

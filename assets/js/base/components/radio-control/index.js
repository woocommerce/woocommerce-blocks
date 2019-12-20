/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import RadioControlOption from './option';
import './style.scss';

const RadioControl = ( {
	className,
	selected,
	id,
	onChange,
	options = [],
} ) => {
	return (
		options.length && (
			<div
				className={ classnames( 'wc-blocks-radio-control', className ) }
			>
				{ options.map( ( option ) => (
					<RadioControlOption
						key={ `${ id }-${ option.value }` }
						name={ id }
						selected={ selected }
						option={ option }
						onChange={ onChange }
					/>
				) ) }
			</div>
		)
	);
};

export default RadioControl;

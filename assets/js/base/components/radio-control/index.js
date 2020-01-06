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
				className={ classnames( 'wc-block-radio-control', className ) }
			>
				{ options.map( ( option ) => (
					<RadioControlOption
						key={ `${ id }-${ option.value }` }
						name={ id }
						checked={ option.value === selected }
						option={ option }
						onChange={ onChange }
					/>
				) ) }
			</div>
		)
	);
};

export default RadioControl;

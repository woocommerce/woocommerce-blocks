/**
 * External dependencies
 */
import classnames from 'classnames';

const Option = ( { onChange, option, name, selected } ) => {
	const {
		value,
		label,
		description,
		secondaryLabel,
		secondaryDescription,
	} = option;
	const onChangeValue = ( event ) => onChange( event.target.value );

	return (
		<label
			key={ `${ name }-${ value }` }
			className="wc-blocks-radio-control__option"
			htmlFor={ `${ name }-${ value }` }
		>
			<input
				id={ `${ name }-${ value }` }
				className="wc-blocks-radio-control__input"
				type="radio"
				name={ name }
				value={ value }
				onChange={ onChangeValue }
				checked={ value === selected }
				aria-describedby={ classnames( {
					[ `${ name }-${ value }__label` ]: label,
					[ `${ name }-${ value }__secondary-label` ]: secondaryLabel,
					[ `${ name }-${ value }__description` ]: description,
					[ `${ name }-${ value }__secondary-description` ]: secondaryDescription,
				} ) }
			/>
			{ label && (
				<span
					id={ `${ name }-${ value }__label` }
					className="wc-blocks-radio-control__label"
				>
					{ label }
				</span>
			) }
			{ secondaryLabel && (
				<span
					id={ `${ name }-${ value }__secondary-label` }
					className="wc-blocks-radio-control__secondary-label"
				>
					{ secondaryLabel }
				</span>
			) }
			{ description && (
				<span
					id={ `${ name }-${ value }__description` }
					className="wc-blocks-radio-control__description"
				>
					{ description }
				</span>
			) }
			{ secondaryDescription && (
				<span
					id={ `${ name }-${ value }__secondary-description` }
					className="wc-blocks-radio-control__secondary-description"
				>
					{ secondaryDescription }
				</span>
			) }
		</label>
	);
};

export default Option;

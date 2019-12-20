/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Label from '../label';

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
				<Label
					label={ label }
					wrapperElement="span"
					wrapperProps={ {
						className: 'wc-blocks-radio-control__label',
						id: `${ name }-${ value }__label`,
					} }
				>
					{ label }
				</Label>
			) }
			{ secondaryLabel && (
				<Label
					label={ secondaryLabel }
					wrapperElement="span"
					wrapperProps={ {
						className: 'wc-blocks-radio-control__secondary-label',
						id: `${ name }-${ value }__secondary-label`,
					} }
				>
					{ secondaryLabel }
				</Label>
			) }
			{ description && (
				<Label
					label={ description }
					wrapperElement="span"
					wrapperProps={ {
						className: 'wc-blocks-radio-control__description',
						id: `${ name }-${ value }__description`,
					} }
				>
					{ description }
				</Label>
			) }
			{ secondaryDescription && (
				<Label
					label={ secondaryDescription }
					wrapperElement="span"
					wrapperProps={ {
						className:
							'wc-blocks-radio-control__secondary-description',
						id: `${ name }-${ value }__secondary-description`,
					} }
				>
					{ secondaryDescription }
				</Label>
			) }
		</label>
	);
};

export default Option;

/**
 * Internal dependencies
 */
import './style.scss';

interface Option {
	label: React.ReactNode;
	value: string;
}

interface FilterElementCheckboxProps {
	onChange: ( value: string ) => void;
	isChecked: boolean;
	isDisabled: boolean;
	option: Option;
}

const FilterElementCheckbox = ( {
	onChange,
	isChecked,
	isDisabled,
	option,
}: FilterElementCheckboxProps ): JSX.Element => {
	return (
		<div className="wc-filter-element-checkbox">
			<input
				type="checkbox"
				id={ option.value }
				value={ option.value }
				onChange={ ( event ) => {
					onChange( event.target.value );
				} }
				disabled={ isDisabled }
				checked={ isChecked }
			/>
			<span className="wc-filter-element-checkbox__checkbox" />
		</div>
	);
};

export default FilterElementCheckbox;

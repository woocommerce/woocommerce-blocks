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
		<div
			className="wc-filter-element-checkbox"
			tabIndex={ 0 }
			role="checkbox"
			onKeyPress={ ( event ) => {
				event.preventDefault();
				if ( event.code === 'Space' ) {
					onChange( option.value );
				}
			} }
		>
			<input
				type="checkbox"
				id={ option.value }
				value={ option.value }
				onChange={ ( event ) => {
					onChange( event.target.value );
				} }
				disabled={ isDisabled }
				checked={ isChecked }
				tabIndex={ -1 }
			/>
			<span
				aria-hidden="true"
				className="wc-filter-element-checkbox__checkbox"
			/>
		</div>
	);
};

export default FilterElementCheckbox;

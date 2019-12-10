/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Label from '../label';
import './style.scss';

const RadioControl = ( {
	className,
	selected,
	help,
	id,
	onChange,
	options = [],
} ) => {
	const onChangeValue = ( event ) => onChange( event.target.value );
	return (
		options.length && (
			<div
				className={ classnames(
					'wc-components-radio-control',
					className
				) }
			>
				{ options.map( ( option, index ) => (
					<label
						key={ `${ id }-${ index }` }
						className="wc-components-radio-control__option"
						htmlFor={ `${ id }-${ index }` }
					>
						<input
							id={ `${ id }-${ index }` }
							className="wc-components-radio-control__input"
							type="radio"
							name={ id }
							value={ option.value }
							onChange={ onChangeValue }
							checked={ option.value === selected }
							aria-describedby={
								!! help ? `${ id }__help` : undefined
							}
						/>
						<Label
							label={ option.label }
							wrapperElement="span"
							wrapperProps={ {
								className: 'wc-components-radio-control__label',
							} }
						>
							{ option.label }
						</Label>
						<Label
							label={ option.secondaryLabel }
							wrapperElement="span"
							wrapperProps={ {
								className:
									'wc-components-radio-control__secondary-label',
							} }
						>
							{ option.secondaryLabel }
						</Label>
						<Label
							label={ option.description }
							wrapperElement="span"
							wrapperProps={ {
								className:
									'wc-components-radio-control__description',
							} }
						>
							{ option.description }
						</Label>
						<Label
							label={ option.secondaryDescription }
							wrapperElement="span"
							wrapperProps={ {
								className:
									'wc-components-radio-control__secondary-description',
							} }
						>
							{ option.secondaryDescription }
						</Label>
					</label>
				) ) }
			</div>
		)
	);
};

export default RadioControl;

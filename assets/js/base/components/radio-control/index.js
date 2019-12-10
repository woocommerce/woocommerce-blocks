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
				{ options.map(
					(
						{
							value,
							label,
							description,
							secondaryLabel,
							secondaryDescription,
						},
						index
					) => (
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
								value={ value }
								onChange={ onChangeValue }
								checked={ value === selected }
								aria-describedby={ classnames( {
									[ `${ id }-${ index }__label` ]: label,
									[ `${ id }-${ index }__secondary-label` ]: secondaryLabel,
									[ `${ id }-${ index }__description` ]: description,
									[ `${ id }-${ index }__secondary-description` ]: secondaryDescription,
								} ) }
							/>
							{ label && (
								<Label
									label={ label }
									wrapperElement="span"
									wrapperProps={ {
										className:
											'wc-components-radio-control__label',
										id: `${ id }-${ index }__label`,
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
										className:
											'wc-components-radio-control__secondary-label',
										id: `${ id }-${ index }__secondary-label`,
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
										className:
											'wc-components-radio-control__description',
										id: `${ id }-${ index }__description`,
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
											'wc-components-radio-control__secondary-description',
										id: `${ id }-${ index }__secondary-description`,
									} }
								>
									{ secondaryDescription }
								</Label>
							) }
						</label>
					)
				) }
			</div>
		)
	);
};

export default RadioControl;

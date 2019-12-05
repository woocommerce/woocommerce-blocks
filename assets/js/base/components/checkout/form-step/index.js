/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import './style.scss';

const FormStep = ( {
	id,
	className,
	stepNumber,
	title,
	description,
	children,
	secondaryAction,
	isLastStep,
} ) => {
	return (
		<div
			className={ classnames( [
				className,
				'wc-components-checkout-step',
				{ 'is-last-step': isLastStep },
			] ) }
			id={ id }
		>
			<StepNumber stepNumber={ stepNumber } />
			<StepHeading title={ title } secondaryAction={ secondaryAction } />
			<span className="wc-components-checkout-step__description">
				{ description }
			</span>
			<div className="wc-components-checkout-step__content">
				{ children }
			</div>
		</div>
	);
};

const StepNumber = ( { stepNumber } ) => {
	return (
		<div className="wc-components-checkout-step__number">
			{ stepNumber }
		</div>
	);
};

const StepHeading = ( { title, secondaryAction } ) => (
	<div className="wc-components-checkout-step__heading">
		<h4 className="wc-components-checkout-step__title">{ title }</h4>
		{ secondaryAction && <SecondaryAction link={ secondaryAction } /> }
	</div>
);
const SecondaryAction = ( { link } ) => (
	<span className="wc-components-checkout-step__secondary-action">
		{ link }
	</span>
);
export default FormStep;

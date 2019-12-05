/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import Label from '../../label';

const FormStep = ( {
	id,
	className,
	stepNumber,
	title,
	description,
	children,
	secondaryAction,
} ) => {
	return (
		<div
			className={ classnames( [
				className,
				'wc-components-checkout-step',
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
			<Label
				label={ stepNumber }
				screenReaderLabel={ sprintf(
					__(
						// translators: %s is a step number (1, 2, 3...)
						'Step %s',
						'woo-gutenberg-products-block'
					),
					stepNumber
				) }
			/>
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

FormStep.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	stepNumber: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node,
	secondaryAction: PropTypes.node,
};

export default FormStep;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useState, useEffect } from '@wordpress/element';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import { useValidationContext } from '@woocommerce/base-context';
import { useCheckoutSubmit } from '@woocommerce/base-context/hooks';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';

/**
 * Internal dependencies
 */
import { termsConsentDefaultText, termsCheckboxDefaultText } from './constants';
import './style.scss';

const FrontendBlock = ( {
	text,
	checkbox,
	instanceId,
}: {
	text: string;
	checkbox: boolean;
	instanceId: string;
} ): JSX.Element => {
	const [ checked, setChecked ] = useState( false );
	const { isDisabled } = useCheckoutSubmit();
	const {
		getValidationError,
		setValidationErrors,
		clearValidationError,
	} = useValidationContext();

	const validationErrorId = 'terms-and-conditions-' + instanceId;
	const error = getValidationError( validationErrorId ) || {};
	const hasError = error.message && ! error.hidden;

	// Track validation errors for this input.
	useEffect( () => {
		if ( checked ) {
			clearValidationError( validationErrorId );
		} else {
			setValidationErrors( {
				[ validationErrorId ]: {
					message: __(
						'Please read and accept the terms and conditions.',
						'woo-gutenberg-products-block'
					),
					hidden: true,
				},
			} );
		}
		return () => {
			clearValidationError( validationErrorId );
		};
	}, [
		checked,
		validationErrorId,
		clearValidationError,
		setValidationErrors,
	] );

	/* Throw an error on submit. This code is not needed here but it shows as an example how to do it.
	const { onCheckoutValidationBeforeProcessing } = useCheckoutContext();

	useEffect( () => {
		const unsubscribe = onCheckoutValidationBeforeProcessing( () => {
			if ( ! checked ) {
				return {
					errorMessage: __(
						'Please read and accept the terms and conditions to proceed with your order.',
						'woo-gutenberg-products-block'
					),
				};
			}
		} );
		return () => {
			unsubscribe();
		};
	}, [ onCheckoutValidationBeforeProcessing, checked ] );*/

	return (
		<div
			className={ classnames( 'wc-block-checkout__terms', {
				'wc-block-checkout__terms--disabled': isDisabled,
			} ) }
		>
			{ checkbox ? (
				<>
					<CheckboxControl
						id="terms-and-conditions"
						checked={ checked }
						onChange={ () => setChecked( ( value ) => ! value ) }
						className={ classnames( {
							'has-error': hasError,
						} ) }
						disabled={ isDisabled }
					>
						<span
							dangerouslySetInnerHTML={ {
								__html: text || termsCheckboxDefaultText,
							} }
						/>
					</CheckboxControl>
				</>
			) : (
				<span
					dangerouslySetInnerHTML={ {
						__html: text || termsConsentDefaultText,
					} }
				/>
			) }
		</div>
	);
};

export default withInstanceId( FrontendBlock );

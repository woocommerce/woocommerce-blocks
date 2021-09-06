/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useState, useEffect } from '@wordpress/element';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';
import { useCheckoutSubmit } from '@woocommerce/base-context/hooks';
import { withInstanceId } from '@wordpress/compose';
import type { ValidationData } from '@woocommerce/type-defs/contexts';
/**
 * Internal dependencies
 */
import { termsConsentDefaultText, termsCheckboxDefaultText } from './constants';
import './style.scss';

const FrontendBlock = ( {
	text,
	checkbox,
	instanceId,
	validation,
}: {
	text: string;
	checkbox: boolean;
	instanceId: string;
	validation: ( validationErrorId: string ) => ValidationData;
} ): JSX.Element => {
	const [ checked, setChecked ] = useState( false );
	// @todo Checkout i2 - Pass validation context to Inner Blocks to avoid exporting in a public package.
	const { isDisabled } = useCheckoutSubmit();

	const validationErrorId = 'terms-and-conditions-' + instanceId;
	const {
		getValidationError,
		setValidationError,
		clearValidationError,
	} = validation( validationErrorId );

	const error = getValidationError() || {};
	const hasError = error.message && ! error.hidden;

	// Track validation errors for this input.
	useEffect( () => {
		if ( ! checkbox ) {
			return;
		}
		if ( checked ) {
			clearValidationError();
		} else {
			setValidationError( {
				message: __(
					'Please read and accept the terms and conditions.',
					'woo-gutenberg-products-block'
				),
				hidden: false,
			} );
		}
	}, [
		checkbox,
		checked,
		validationErrorId,
		clearValidationError,
		setValidationError,
	] );

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

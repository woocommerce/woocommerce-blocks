/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import Button from '@woocommerce/base-components/button';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import Label from '@woocommerce/base-components/label';
import { ValidationInputError } from '@woocommerce/base-components/validation';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import PropTypes from 'prop-types';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import { useValidationContext } from '@woocommerce/base-context';
import Panel from '@woocommerce/base-components/panel';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsCouponCodeInput = ( {
	instanceId,
	isLoading = false,
	initialOpen = false,
	onSubmit = () => {},
} ) => {
	const [ couponValue, setCouponValue ] = useState( '' );
	const currentIsLoading = useRef( false );
	const { getValidationError, getValidationErrorId } = useValidationContext();

	const validationError = getValidationError( 'coupon' );

	useEffect( () => {
		if ( currentIsLoading.current !== isLoading ) {
			if ( ! isLoading && couponValue && ! validationError ) {
				setCouponValue( '' );
			}
			currentIsLoading.current = isLoading;
		}
	}, [ isLoading, couponValue, validationError ] );

	const textInputId = `wc-block-components-totals-coupon__input-${ instanceId }`;

	return (
		<Panel
			className="wc-block-components-totals-coupon"
			hasBorder={ true }
			initialOpen={ initialOpen }
			title={
				<Label
					label={ __(
						'Coupon Code?',
						'woo-gutenberg-products-block'
					) }
					screenReaderLabel={ __(
						'Introduce Coupon Code',
						'woo-gutenberg-products-block'
					) }
					htmlFor={ textInputId }
				/>
			}
			titleTag="h2"
		>
			<LoadingMask
				screenReaderLabel={ __(
					'Applying coupon…',
					'woo-gutenberg-products-block'
				) }
				isLoading={ isLoading }
				showSpinner={ false }
			>
				<div className="wc-block-components-totals-coupon__content">
					<form className="wc-block-components-totals-coupon__form">
						<ValidatedTextInput
							id={ textInputId }
							errorId="coupon"
							className="wc-block-components-totals-coupon__input"
							label={ __(
								'Enter code',
								'woo-gutenberg-products-block'
							) }
							value={ couponValue }
							ariaDescribedBy={ getValidationErrorId(
								textInputId
							) }
							onChange={ ( newCouponValue ) => {
								setCouponValue( newCouponValue );
							} }
							validateOnMount={ false }
							focusOnMount={ true }
							showError={ false }
						/>
						<Button
							className="wc-block-components-totals-coupon__button"
							disabled={ isLoading || ! couponValue }
							showSpinner={ isLoading }
							onClick={ ( e ) => {
								e.preventDefault();
								onSubmit( couponValue );
							} }
							type="submit"
						>
							{ __( 'Apply', 'woo-gutenberg-products-block' ) }
						</Button>
					</form>
					<ValidationInputError
						propertyName="coupon"
						elementId={ textInputId }
					/>
				</div>
			</LoadingMask>
		</Panel>
	);
};

TotalsCouponCodeInput.propTypes = {
	onSubmit: PropTypes.func,
	isLoading: PropTypes.bool,
};

export default withInstanceId( TotalsCouponCodeInput );

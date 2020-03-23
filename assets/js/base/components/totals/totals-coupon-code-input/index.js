/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { PanelBody, PanelRow } from 'wordpress-components';
import { Button } from '@woocommerce/base-components/cart-checkout';
import TextInput from '@woocommerce/base-components/text-input';
import Label from '@woocommerce/base-components/label';
import { ValidationInputError } from '@woocommerce/base-components/validation';
import PropTypes from 'prop-types';
import { withInstanceId } from 'wordpress-compose';
import { useValidationContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import LoadingMask from '../../loading-mask';
import './style.scss';

const TotalsCouponCodeInput = ( {
	instanceId,
	isLoading = false,
	initialOpen,
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

	const textInputId = `wc-block-coupon-code__input-${ instanceId }`;

	return (
		<PanelBody
			className="wc-block-coupon-code"
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
			initialOpen={ initialOpen }
		>
			<LoadingMask
				screenReaderLabel={ __(
					'Applying coupon…',
					'woo-gutenberg-products-block'
				) }
				isLoading={ isLoading }
				showSpinner={ false }
			>
				<PanelRow className="wc-block-coupon-code__row">
					<form className="wc-block-coupon-code__form">
						<TextInput
							id={ textInputId }
							errorId="coupon"
							className="wc-block-coupon-code__input"
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
							showError={ false }
						/>
						<Button
							className="wc-block-coupon-code__button"
							disabled={ isLoading || ! couponValue }
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
				</PanelRow>
			</LoadingMask>
		</PanelBody>
	);
};

TotalsCouponCodeInput.propTypes = {
	onSubmit: PropTypes.func,
	isLoading: PropTypes.bool,
};

export default withInstanceId( TotalsCouponCodeInput );

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Button, Panel, Label } from '@woocommerce/blocks-checkout';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import PropTypes from 'prop-types';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import {
	ValidationInputError,
	useValidationContext,
} from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsCoupon = ( {
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
						'Coupon code',
						'woo-gutenberg-products-block'
					) }
					screenReaderLabel={ __(
						'Apply a coupon code',
						'woo-gutenberg-products-block'
					) }
					htmlFor={ textInputId }
				/>
			}
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

TotalsCoupon.propTypes = {
	onSubmit: PropTypes.func,
	isLoading: PropTypes.bool,
};

export default withInstanceId( TotalsCoupon );

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import Button from '@woocommerce/base-components/button';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { withInstanceId } from '@wordpress/compose';
import {
	ValidatedTextInput,
	ValidationInputError,
} from '@woocommerce/blocks-checkout';
import { useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import './style.scss';

export interface TotalsCouponProps {
	/**
	 * Instance id of the input
	 */
	instanceId: string;
	/**
	 * Whether the component is in a loading state
	 */
	isLoading?: boolean;
	/**
	 * Class name for the coupon form, defaults to screen-reader-text
	 * so that the form is hidden by default.
	 * Can be used in Storybook to show the form by default.
	 *
	 */
	initialCouponFormClass?: string;
	/**
	 * Submit handler
	 */
	onSubmit?: ( couponValue: string ) => void;
}

export const TotalsCoupon = ( {
	instanceId,
	isLoading = false,
	initialCouponFormClass = 'screen-reader-text',
	onSubmit = () => void 0,
}: TotalsCouponProps ): JSX.Element => {
	const [ couponValue, setCouponValue ] = useState( '' );
	const [ couponFormClass, setCouponFormClass ] = useState(
		initialCouponFormClass
	);

	const currentIsLoading = useRef( false );

	const validationErrorKey = 'coupon';
	const textInputId = `wc-block-components-totals-coupon__input-${ instanceId }`;

	const { validationError, validationErrorId } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			validationError: store.getValidationError( validationErrorKey ),
			validationErrorId: store.getValidationErrorId( textInputId ),
		};
	} );

	useEffect( () => {
		if ( currentIsLoading.current !== isLoading ) {
			if ( ! isLoading && couponValue && ! validationError ) {
				setCouponValue( '' );
				setCouponFormClass( 'screen-reader-text' );
			}
			currentIsLoading.current = isLoading;
		}
	}, [ isLoading, couponValue, validationError ] );

	return (
		<>
			{ couponFormClass === 'screen-reader-text' && (
				<a
					role="button"
					href="#wc-block-components-totals-coupon__form"
					className="wc-block-components-totals-coupon-link"
					aria-label={ __(
						'Add a coupon',
						'woo-gutenberg-products-block'
					) }
					onClick={ (
						e: React.MouseEvent< HTMLAnchorElement, MouseEvent >
					) => {
						setCouponFormClass( '' );
						e.preventDefault();
					} }
				>
					{ __( 'Add a coupon', 'woo-gutenberg-products-block' ) }
				</a>
			) }
			<LoadingMask
				screenReaderLabel={ __(
					'Applying coupon…',
					'woo-gutenberg-products-block'
				) }
				isLoading={ isLoading }
				showSpinner={ false }
			>
				<div
					className={
						'wc-block-components-totals-coupon__content ' +
						couponFormClass
					}
				>
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
							ariaDescribedBy={ validationErrorId }
							onChange={ ( newCouponValue ) => {
								setCouponValue( newCouponValue );
							} }
							focusOnMount={ true }
							showError={ false }
						/>
						<Button
							className="wc-block-components-totals-coupon__button"
							disabled={ isLoading || ! couponValue }
							showSpinner={ isLoading }
							onClick={ (
								e: React.MouseEvent<
									HTMLButtonElement,
									MouseEvent
								>
							) => {
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
		</>
	);
};

export default withInstanceId( TotalsCoupon );

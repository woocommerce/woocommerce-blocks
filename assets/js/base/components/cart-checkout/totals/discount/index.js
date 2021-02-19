/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { RemovableChip } from '@woocommerce/base-components/chip';
import PropTypes from 'prop-types';
import { TotalsItem } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsDiscount = ( {
	cartCoupons = [],
	currency,
	isRemovingCoupon,
	removeCoupon,
	values,
} ) => {
	const {
		total_discount: totalDiscount,
		total_discount_tax: totalDiscountTax,
	} = values;
	const discountValue = parseInt( totalDiscount, 10 );

	if ( ! discountValue && cartCoupons.length === 0 ) {
		return null;
	}

	const discountTaxValue = parseInt( totalDiscountTax, 10 );
	const discountTotalValue = DISPLAY_CART_PRICES_INCLUDING_TAX
		? discountValue + discountTaxValue
		: discountValue;

	return (
		<TotalsItem
			className="wc-block-components-totals-discount"
			currency={ currency }
			description={
				cartCoupons.length !== 0 && (
					<LoadingMask
						screenReaderLabel={ __(
							'Removing coupon…',
							'woo-gutenberg-products-block'
						) }
						isLoading={ isRemovingCoupon }
						showSpinner={ false }
					>
						<ul className="wc-block-components-totals-discount__coupon-list">
							{ cartCoupons.map( ( cartCoupon ) => (
								<RemovableChip
									key={ 'coupon-' + cartCoupon.code }
									className="wc-block-components-totals-discount__coupon-list-item"
									text={ cartCoupon.code }
									screenReaderText={ sprintf(
										/* translators: %s Coupon code. */
										__(
											'Coupon: %s',
											'woo-gutenberg-products-block'
										),
										cartCoupon.code
									) }
									disabled={ isRemovingCoupon }
									onRemove={ () => {
										removeCoupon( cartCoupon.code );
									} }
									radius="large"
									ariaLabel={ sprintf(
										/* translators: %s is a coupon code. */
										__(
											'Remove coupon "%s"',
											'woo-gutenberg-products-block'
										),
										cartCoupon.code
									) }
								/>
							) ) }
						</ul>
					</LoadingMask>
				)
			}
			label={
				!! discountTotalValue
					? __( 'Discount', 'woo-gutenberg-products-block' )
					: __( 'Coupons', 'woo-gutenberg-products-block' )
			}
			value={ discountTotalValue ? discountTotalValue * -1 : '-' }
		/>
	);
};

TotalsDiscount.propTypes = {
	cartCoupons: PropTypes.arrayOf(
		PropTypes.shape( {
			code: PropTypes.string.isRequired,
		} )
	),
	currency: PropTypes.object.isRequired,
	isRemovingCoupon: PropTypes.bool.isRequired,
	removeCoupon: PropTypes.func.isRequired,
	values: PropTypes.shape( {
		total_discount: PropTypes.string,
		total_discount_tax: PropTypes.string,
	} ).isRequired,
};

export default TotalsDiscount;

/**
 * External dependencies
 */
import Panel from '@woocommerce/base-components/panel';
import { useStoreCart } from '@woocommerce/base-hooks';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import { sprintf, __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	Subtotal,
	TotalsFees,
	TotalsShipping,
	TotalsTaxes,
} from '@woocommerce/base-components/cart-checkout';
import { useShippingDataContext } from '@woocommerce/base-context';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { recurringPeriodString } from './utils';
import './style.scss';

const SubscriptionDescription = ( {
	firstPaymentString,
	subscriptionLength,
	billingPeriod,
	billingInterval,
} ) => {
	const subscriptionLengthString = sprintf(
		/* Translators: %1$d subscription length %2$s billing period */
		__( 'For %1$d %2$s', 'woocommerce-subscriptions' ),
		subscriptionLength,
		billingPeriod
	);
	return (
		<span>
			{ firstPaymentString }{ ' ' }
			{ !! subscriptionLength && subscriptionLength > billingInterval && (
				<span style={ { float: 'right' } }>
					{ subscriptionLengthString }
				</span>
			) }
		</span>
	);
};
const TabHeading = ( {
	currency,
	billingInterval,
	billingPeriod,
	nextPaymentDate,
	subscriptionLength,
	totals,
} ) => {
	const title = recurringPeriodString( { billingInterval, billingPeriod } );
	const firstPaymentString = sprintf(
		/* Translators: %1$s is a date. */
		__( 'Starting: %1$s', 'woocommerce-subscriptions' ),
		/* Create a fromated localized date */
		new Intl.DateTimeFormat( window.navigator.language, {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		} ).format( new Date( nextPaymentDate ) )
	);

	return (
		<TotalsItem
			currency={ currency }
			label={ title }
			value={ totals }
			description={
				<SubscriptionDescription
					firstPaymentString={ firstPaymentString }
					subscriptionLength={ subscriptionLength }
					billingInterval={ billingInterval }
					billingPeriod={ billingPeriod }
				/>
			}
		/>
	);
};

const RecurringSubscription = ( { subscription } ) => {
	const { needsShipping } = useShippingDataContext();
	const {
		totals,
		billing_interval: billingInterval,
		billing_period: billingPeriod,
		next_payment_date: nextPaymentDate,
		subscription_length: subscriptionLength,
	} = subscription;
	const currency = getCurrencyFromPriceResponse( totals );

	return (
		<div
			className={ classnames(
				'wcs-recurring-totals-panel',
				'has-border'
			) }
		>
			<TabHeading
				billingInterval={ billingInterval }
				billingPeriod={ billingPeriod }
				nextPaymentDate={ nextPaymentDate }
				subscriptionLength={ subscriptionLength }
				totals={ totals.total_price }
				currency={ currency }
			/>
			<Panel
				initialOpen={ false }
				title={ __( 'Details', 'woocommerce-subscriptions' ) }
			>
				<Subtotal
					className="no-border"
					currency={ currency }
					values={ totals }
				/>
				<TotalsFees
					className="no-border"
					currency={ currency }
					values={ totals }
				/>
				{ needsShipping && (
					<TotalsShipping
						className="no-border"
						showCalculator={ false }
						showRateSelector={ false }
						values={ totals }
						currency={ currency }
					/>
				) }
				{ ! DISPLAY_CART_PRICES_INCLUDING_TAX && (
					<TotalsTaxes
						className="no-border"
						currency={ currency }
						values={ totals }
					/>
				) }
			</Panel>
		</div>
	);
};
const SubscriptionsRecurringTotals = () => {
	const {
		extensions: { subscriptions },
	} = useStoreCart();
	if ( ! subscriptions || subscriptions.length === 0 ) {
		return null;
	}
	return (
		<>
			{ subscriptions.map( ( { key, ...subscription } ) => (
				<RecurringSubscription
					subscription={ subscription }
					key={ key }
				/>
			) ) }
		</>
	);
};

export default SubscriptionsRecurringTotals;

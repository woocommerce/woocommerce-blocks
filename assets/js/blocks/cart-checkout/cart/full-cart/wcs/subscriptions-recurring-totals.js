/**
 * External dependencies
 */
import Panel from '@woocommerce/base-components/panel';
import { useStoreCart } from '@woocommerce/base-hooks';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import { sprintf, __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { recurringPeriodString } from './utils';
import './style.scss';

const TabHeading = ( { subscription } ) => {
	const {
		totals,
		billing_interval: billingInterval,
		billing_period: billingPeriod,
		next_payment_date: nextPaymentDate,
		subscription_length: subscriptionLength,
	} = subscription;
	const title = recurringPeriodString( { billingInterval, billingPeriod } );
	const currency = getCurrencyFromPriceResponse( totals );
	const firstPaymentString = sprintf(
		/* Translators: %1$s is a date. */
		__( 'Starting: %1$s', 'woocommerce-subscriptions' ),
		/* Create a fromated localized date */
		new Intl.DateTimeFormat( navigator.language, {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		} ).format( new Date( nextPaymentDate ) )
	);

	return (
		<TotalsItem
			currency={ currency }
			label={ title }
			value={ totals.total_items }
			description={ firstPaymentString }
		/>
	);
};

const RecurringSubscription = ( { subscription } ) => {
	return (
		<div
			className={ classnames(
				'wcs-recurring-totals-panel',
				'has-border'
			) }
		>
			<TabHeading subscription={ subscription } />
			<Panel
				className="wc-block-components-totals-coupon"
				initialOpen={ false }
				title={ __( 'Details', 'woocommerce-subscriptions' ) }
			></Panel>
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

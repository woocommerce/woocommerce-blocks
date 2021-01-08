/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';

/**
 * Creates a recurring string from a subscription
 *
 * Examples
 * period recurring total
 * Daily recurring total
 * Weekly recurring total
 * Monthly recurring total
 * etc
 * If subscription bills at non standard intervals, then the order is transposed, and the line reads:
 * Recurring total every X day | week | month | quarter | year
 * Recurring total every 3rd day
 * Recurring total every 2nd week
 * Recurring total every 4th month
 * etc
 *
 * @param {Object} subscription                     Subscription object.
 * @param {string} subscription.billingPeriod      Period (month, day, week, year).
 * @param {number} subscription.billingInterval    Internal (1 month, 5 day, 4 week, 6 year).
 
 */
export function recurringPeriodString( { billingInterval, billingPeriod } ) {
	switch ( billingInterval ) {
		case 1:
			if ( billingPeriod === 'day' ) {
				return __(
					'Daily recurring total',
					'woocommerce-subscriptions'
				);
			}
			return sprintf(
				/* Translators: %s is week, month, year */
				__( '%sly recurring total', 'woocommerce-subscriptions' ),
				billingPeriod
			);
		case 2:
			return sprintf(
				/* translators: %1$s is week, month, year */
				__(
					'Recurring total every 2nd %1$s',
					'woocommerce-subscriptions'
				),
				billingPeriod
			);

		case 3:
			return sprintf(
				/* Translators: %1$s is week, month, year */
				__(
					'Recurring total every 3rd %1$s',
					'woocommerce-subscriptions'
				),
				billingPeriod
			);
		default:
			return sprintf(
				/* Translators: %1$d is number of weeks, months, days, years. %2$s is week, month, year */
				__(
					'Recurring total every %1$dth %2$s',
					'woocommerce-subscriptions'
				),
				billingInterval,
				billingPeriod
			);
	}
}

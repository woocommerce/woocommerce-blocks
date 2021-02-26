/**
 * External dependencies
 */
import classnames from 'classnames';
import { isValidElement } from '@wordpress/element';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import type { ReactNode } from 'react';
import type { Currency } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import './style.scss';

interface TotalsItemProps {
	className?: string;
	currency?: Currency;
	label: string;
	value?: number | ReactNode;
	description?: ReactNode;
}

const TotalsItem = ( {
	className,
	currency,
	label,
	value,
	description,
}: TotalsItemProps ): JSX.Element => {
	return (
		<div
			className={ classnames(
				'wc-block-components-totals-item',
				className
			) }
		>
			<span className="wc-block-components-totals-item__label">
				{ label }
			</span>
			{ isValidElement( value ) ? (
				<div className="wc-block-components-totals-item__value">
					{ value }
				</div>
			) : (
				<FormattedMonetaryAmount
					className="wc-block-components-totals-item__value"
					currency={ currency }
					displayType="text"
					value={ value }
				/>
			) }
			<div className="wc-block-components-totals-item__description">
				{ description }
			</div>
		</div>
	);
};

export default TotalsItem;

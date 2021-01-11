/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isValidElement } from '@wordpress/element';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsItem = ( {
	className,
	currency,
	label,
	value,
	description,
	children,
	...props
} ) => {
	return (
		<div
			className={ classnames(
				'wc-block-components-totals-item',
				className
			) }
			{ ...props }
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
			{ children }
		</div>
	);
};

TotalsItem.propTypes = {
	currency: PropTypes.object,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.node ] ),
	className: PropTypes.string,
	description: PropTypes.node,
	props: PropTypes.object,
};

export default TotalsItem;

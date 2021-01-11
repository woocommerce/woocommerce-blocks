/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import {
	TAXES_ENABLED,
	DISPLAY_ITEMIZED_TAXES,
} from '@woocommerce/block-settings';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsTaxes = ( { currency, values, className, ...props } ) => {
	const { total_tax: totalTax, tax_lines: taxLines } = values;

	if ( ! TAXES_ENABLED ) {
		return null;
	}

	if ( ! DISPLAY_ITEMIZED_TAXES ) {
		return (
			<TotalsItem
				className={ classnames(
					'wc-block-components-totals-taxes',
					className
				) }
				currency={ currency }
				label={ __( 'Taxes', 'woo-gutenberg-products-block' ) }
				value={ parseInt( totalTax, 10 ) }
				{ ...props }
			/>
		);
	}

	return (
		<>
			{ taxLines.map( ( { name, price }, i ) => (
				<TotalsItem
					key={ `tax-line-${ i }` }
					className={ classnames(
						'wc-block-components-totals-taxes',
						className
					) }
					currency={ currency }
					label={ name }
					value={ parseInt( price, 10 ) }
					{ ...props }
				/>
			) ) }{ ' ' }
		</>
	);
};

TotalsTaxes.propTypes = {
	currency: PropTypes.object.isRequired,
	values: PropTypes.shape( {
		total_tax: PropTypes.string,
	} ).isRequired,
	className: PropTypes.string,
};

export default TotalsTaxes;

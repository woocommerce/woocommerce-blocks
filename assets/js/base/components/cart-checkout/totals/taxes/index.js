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

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsTaxes = ( { currency, values } ) => {
	const { total_tax: totalTax, tax_lines: taxLines } = values;

	if ( ! TAXES_ENABLED ) {
		return null;
	}

	if ( ! DISPLAY_ITEMIZED_TAXES ) {
		return (
			<TotalsItem
				className="wc-block-components-totals-taxes"
				currency={ currency }
				label={ __( 'Taxes', 'woo-gutenberg-products-block' ) }
				value={ parseInt( totalTax, 10 ) }
			/>
		);
	}

	return (
		<>
			{ taxLines.map( ( { name, price }, i ) => (
				<TotalsItem
					key={ `tax-line-${ i }` }
					className="wc-block-components-totals-taxes"
					currency={ currency }
					label={ name }
					value={ parseInt( price, 10 ) }
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
};

export default TotalsTaxes;

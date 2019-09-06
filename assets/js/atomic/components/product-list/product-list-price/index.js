/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import classnames from 'classnames';

class ProductListPrice extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
		showSaleBadge: PropTypes.bool,
	}

	render = () => {
		const { product, className, showSaleBadge = true } = this.props;
		const numberFormatArgs = {
			displayType: 'text',
			thousandSeparator: product.prices.thousand_separator,
			decimalSeparator: product.prices.decimal_separator,
			decimalScale: product.prices.decimals,
			prefix: product.prices.price_prefix,
			suffix: product.prices.price_suffix,
		};

		const classes = classnames(
			className,
			'wc-block-grid__product-price',
		);

		const renderSaleBadge = () => {
			if ( showSaleBadge && product.onsale ) {
				return (
					<span className="wc-block-grid__product-onsale">
						{ __( 'Sale', 'woo-gutenberg-products-block' ) }
					</span>
				);
			}
		};

		if ( product.prices.price_range && product.prices.price_range.min_amount && product.prices.price_range.max_amount ) {
			return (
				<Fragment>
					{ renderSaleBadge() }
					<div className={ classes }>
						<span className={ 'wc-block-grid__product-price__value' }>
							<NumberFormat value={ product.prices.price_range.min_amount } { ...numberFormatArgs } />
							&nbsp;&mdash;&nbsp;
							<NumberFormat value={ product.prices.price_range.max_amount } { ...numberFormatArgs } />
						</span>
					</div>
				</Fragment>
			);
		}

		return (
			<Fragment>
				{ renderSaleBadge() }
				<div className={ classes }>
					{ product.prices.regular_price !== product.prices.price && (
						<del className={ 'wc-block-grid__product-price__regular' }>
							<NumberFormat value={ product.prices.regular_price } { ...numberFormatArgs } />
						</del>
					) }
					<span className={ 'wc-block-grid__product-price__value' }>
						<NumberFormat value={ product.prices.price } { ...numberFormatArgs } />
					</span>
				</div>
			</Fragment>
		);
	}
}

export default ProductListPrice;

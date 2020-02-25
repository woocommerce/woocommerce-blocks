/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { _n, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import Label from '@woocommerce/base-components/label';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import PackageOptions from './package-options';
import './style.scss';

const Package = ( {
	className,
	noResultsMessage,
	onChange,
	renderOption,
	selected,
	shippingRate,
	showItems,
	title,
} ) => {
	return (
		<div
			className={ classNames(
				'wc-block-shipping-rates-control__package',
				className
			) }
		>
			{ title && (
				<div className="wc-block-shipping-rates-control__package-title">
					{ title }
				</div>
			) }
			{ showItems && (
				<ul className="wc-block-shipping-rates-control__package-items">
					{ Object.values( shippingRate.items ).map( ( v ) => {
						const name = decodeEntities( v.name );
						const quantity = v.quantity;
						return (
							<li
								key={ name }
								className="wc-block-shipping-rates-control__package-item"
							>
								<Label
									label={ `${ name } ×${ quantity }` }
									screenReaderLabel={ sprintf(
										// translators: %s name of the product (ie: Sunglasses), %d number of units in the current cart package
										_n(
											'%s (%d unit)',
											'%s (%d units)',
											quantity,
											'woo-gutenberg-products-block'
										),
										name,
										quantity
									) }
								/>
							</li>
						);
					} ) }
				</ul>
			) }
			<PackageOptions
				className={ className }
				noResultsMessage={ noResultsMessage }
				onChange={ onChange }
				options={ shippingRate.shipping_rates }
				renderOption={ renderOption }
				selected={ selected }
			/>
		</div>
	);
};

Package.propTypes = {
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	shippingRate: PropTypes.shape( {
		shipping_rates: PropTypes.arrayOf( PropTypes.object ).isRequired,
		items: PropTypes.objectOf(
			PropTypes.shape( {
				name: PropTypes.string.isRequired,
				quantity: PropTypes.number.isRequired,
			} ).isRequired
		).isRequired,
	} ).isRequired,
	className: PropTypes.string,
	noResultsMessage: PropTypes.string,
	selected: PropTypes.string,
	showItems: PropTypes.bool,
	title: PropTypes.string,
};

export default Package;

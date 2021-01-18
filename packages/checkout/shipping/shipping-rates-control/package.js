/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { _n, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import Label from '@woocommerce/base-components/label';
import Title from '@woocommerce/base-components/title';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Panel from '../../panel';
import PackageRates from './package-rates';
import './style.scss';

const Package = ( {
	className,
	collapsible = false,
	noResultsMessage,
	onSelectRate,
	renderOption,
	packageData,
	showItems,
	title,
	selected,
} ) => {
	const header = (
		<>
			{ title && (
				<Title
					className="wc-block-components-shipping-rates-control__package-title"
					headingLevel="3"
				>
					{ title }
				</Title>
			) }
			{ showItems && (
				<ul className="wc-block-components-shipping-rates-control__package-items">
					{ Object.values( packageData.items ).map( ( v ) => {
						const name = decodeEntities( v.name );
						const quantity = v.quantity;
						return (
							<li
								key={ name }
								className="wc-block-components-shipping-rates-control__package-item"
							>
								<Label
									label={
										quantity > 1
											? `${ name } ×${ quantity }`
											: `${ name }`
									}
									screenReaderLabel={ sprintf(
										// translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package
										_n(
											'%1$s (%2$d unit)',
											'%1$s (%2$d units)',
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
		</>
	);
	const body = (
		<PackageRates
			className={ className }
			noResultsMessage={ noResultsMessage }
			rates={ packageData.shipping_rates }
			onSelectRate={ onSelectRate }
			selected={ selected }
			renderOption={ renderOption }
		/>
	);
	if ( collapsible ) {
		return (
			<Panel
				className="wc-block-components-shipping-rates-control__package"
				hasBorder={ true }
				initialOpen={ true }
				title={ header }
			>
				{ body }
			</Panel>
		);
	}
	return (
		<div
			className={ classNames(
				'wc-block-components-shipping-rates-control__package',
				className
			) }
		>
			{ header }
			{ body }
		</div>
	);
};

Package.propTypes = {
	onSelectRate: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	selected: PropTypes.string,
	packageData: PropTypes.shape( {
		shipping_rates: PropTypes.arrayOf( PropTypes.object ).isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape( {
				name: PropTypes.string.isRequired,
				key: PropTypes.string.isRequired,
				quantity: PropTypes.number.isRequired,
			} ).isRequired
		).isRequired,
	} ).isRequired,
	className: PropTypes.string,
	collapsible: PropTypes.bool,
	noResultsMessage: PropTypes.node,
	showItems: PropTypes.bool,
	title: PropTypes.string,
};

export default Package;

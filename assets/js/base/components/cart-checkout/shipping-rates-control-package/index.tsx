/**
 * External dependencies
 */
import classNames from 'classnames';
import { _n, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { Label, Panel } from '@woocommerce/blocks-components';
import { useCallback } from '@wordpress/element';
import { useShippingData } from '@woocommerce/base-context/hooks';
import { sanitizeHTML } from '@woocommerce/utils';
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import PackageRates from './package-rates';
import type { PackageProps } from './types';
import './style.scss';

export const ShippingRatesControlPackage = ( {
	packageId,
	className = '',
	noResultsMessage,
	renderOption,
	packageData,
	collapsible,
	showItems,
}: PackageProps ): ReactElement => {
	const { selectShippingRate, isSelectingRate } = useShippingData();
	const multiplePackages =
		document.querySelectorAll(
			'.wc-block-components-shipping-rates-control__package'
		).length > 1;

	// If showItems is not set, we check if we have multiple packages.
	// We sometimes don't want to show items even if we have multiple packages.
	const shouldShowItems = showItems ?? multiplePackages;

	// If collapsible is not set, we check if we have multiple packages.
	// We sometimes don't want to collapse even if we have multiple packages.
	const shouldBeCollapsible = collapsible ?? multiplePackages;

	const header = (
		<>
			{ ( shouldBeCollapsible || shouldShowItems ) && (
				<div
					className="wc-block-components-shipping-rates-control__package-title"
					dangerouslySetInnerHTML={ {
						__html: sanitizeHTML( packageData.name ),
					} }
				/>
			) }
			{ shouldShowItems && (
				<ul className="wc-block-components-shipping-rates-control__package-items">
					{ Object.values( packageData.items ).map( ( v ) => {
						const name = decodeEntities( v.name );
						const quantity = v.quantity;
						return (
							<li
								key={ v.key }
								className="wc-block-components-shipping-rates-control__package-item"
							>
								<Label
									label={
										quantity > 1
											? `${ name } × ${ quantity }`
											: `${ name }`
									}
									screenReaderLabel={ sprintf(
										/* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */
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

	const onSelectRate = useCallback(
		( newShippingRateId: string ) => {
			selectShippingRate( newShippingRateId, packageId );
		},
		[ packageId, selectShippingRate ]
	);
	const packageRatesProps = {
		className,
		noResultsMessage,
		rates: packageData.shipping_rates,
		onSelectRate,
		selectedRate: packageData.shipping_rates.find(
			( rate ) => rate.selected
		),
		renderOption,
		disabled: isSelectingRate,
	};

	if ( shouldBeCollapsible ) {
		return (
			<Panel
				className={ classNames(
					'wc-block-components-shipping-rates-control__package',
					className,
					{
						'wc-block-components-shipping-rates-control__package--disabled':
							isSelectingRate,
					}
				) }
				// initialOpen remembers only the first value provided to it, so by the
				// time we know we have several packages, initialOpen would be hardcoded to true.
				// If we're rendering a panel, we're more likely rendering several
				// packages and we want to them to be closed initially.
				initialOpen={ false }
				title={ header }
			>
				<PackageRates { ...packageRatesProps } />
			</Panel>
		);
	}

	return (
		<div
			className={ classNames(
				'wc-block-components-shipping-rates-control__package',
				className,
				{
					'wc-block-components-shipping-rates-control__package--disabled':
						isSelectingRate,
				}
			) }
		>
			{ header }
			<PackageRates { ...packageRatesProps } />
		</div>
	);
};

export default ShippingRatesControlPackage;

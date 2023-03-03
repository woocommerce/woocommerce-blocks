/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { formatPrice } from '@woocommerce/price-format';
import {
	PanelBody,
	ExternalLink,
	ToggleControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControl as ToggleGroupControl,
} from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import type { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

interface Attributes {
	addToCartBehaviour: string;
	hasHiddenPrice: boolean;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const Edit = ( { attributes, setAttributes }: Props ): ReactElement => {
	const { addToCartBehaviour, hasHiddenPrice } = attributes;
	const blockProps = useBlockProps( {
		className: `wc-block-mini-cart`,
	} );

	const templatePartEditUri = getSetting(
		'templatePartEditUri',
		''
	) as string;

	const productCount = 0;
	const productTotal = 0;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Mini Cart Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleGroupControl
						label={ __(
							'Add-to-Cart behaviour',
							'woo-gutenberg-products-block'
						) }
						value={ addToCartBehaviour }
						onChange={ ( value ) => {
							setAttributes( { addToCartBehaviour: value } );
						} }
						help={ __(
							'Select what happens when a customer adds a product to the cart.',
							'woo-gutenberg-products-block'
						) }
					>
						<ToggleGroupControlOption
							value="none"
							label={ __(
								'Do nothing',
								'woo-gutenberg-products-block'
							) }
						/>
						<ToggleGroupControlOption
							value="open_drawer"
							label={ __(
								'Open cart drawer',
								'woo-gutenberg-products-block'
							) }
						/>
					</ToggleGroupControl>
					<ToggleControl
						label={ __(
							'Hide Cart Price',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Toggles the visibility of the Mini Cart price.',
							'woo-gutenberg-products-block'
						) }
						checked={ hasHiddenPrice }
						onChange={ () =>
							setAttributes( {
								hasHiddenPrice: ! hasHiddenPrice,
							} )
						}
					/>
				</PanelBody>
				{ templatePartEditUri && (
					<PanelBody
						title={ __(
							'Template settings',
							'woo-gutenberg-products-block'
						) }
					>
						<p>
							{ __(
								'Edit the appearance of the Mini Cart.',
								'woo-gutenberg-products-block'
							) }
						</p>
						<ExternalLink href={ templatePartEditUri }>
							{ __(
								'Edit Mini Cart template part',
								'woo-gutenberg-products-block'
							) }
						</ExternalLink>
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<button className="wc-block-mini-cart__button">
					{ ! hasHiddenPrice && (
						<span className="wc-block-mini-cart__amount">
							{ formatPrice( productTotal ) }
						</span>
					) }
					<QuantityBadge count={ productCount } />
				</button>
			</Noninteractive>
		</div>
	);
};

export default Edit;

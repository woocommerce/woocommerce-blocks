/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import type { ReactElement } from 'react';
import { formatPrice } from '@woocommerce/price-format';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import { PanelBody, ExternalLink, SelectControl } from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';
import Noninteractive from '@woocommerce/base-components/noninteractive';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

interface Attributes {
	addToCartBehavior: string;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const MiniCartBlock = ( {
	attributes,
	setAttributes,
}: Props ): ReactElement => {
	const { addToCartBehavior } = attributes;
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
					<SelectControl
						label={ __(
							'Add to cart behavior',
							'woo-gutenberg-products-block'
						) }
						value={ addToCartBehavior }
						onChange={ ( value ) => {
							setAttributes( { addToCartBehavior: value } );
						} }
						options={ [
							{
								value: 'none',
								label: __(
									'Do not show anything',
									'woo-gutenberg-products-block'
								),
							},
							{
								value: 'open_drawer',
								label: __(
									'Open the drawer',
									'woo-gutenberg-products-block'
								),
							},
						] }
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
								'Edit the appearance of your empty and filled mini cart contents.',
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
					<span className="wc-block-mini-cart__amount">
						{ formatPrice( productTotal ) }
					</span>
					<QuantityBadge count={ productCount } />
				</button>
			</Noninteractive>
			<CartCheckoutCompatibilityNotice blockName="mini-cart" />
		</div>
	);
};

export default MiniCartBlock;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { getSetting } from '@woocommerce/settings';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Block from './block';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		isShippingCalculatorEnabled: boolean;
		className: string;
		lock: {
			move: boolean;
			remove: boolean;
		};
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const { isShippingCalculatorEnabled, className } = attributes;
	const { isCart, ...rest } = useCheckoutContext();
	const shippingEnabled = getSetting( 'shippingEnabled', true );
	const blockProps = useBlockProps();

	// @todo isCart broken in editor due to the context

	return (
		<div { ...blockProps }>
			<InspectorControls>
				{ shippingEnabled && isCart && (
					<PanelBody
						title={ __(
							'Shipping rates',
							'woo-gutenberg-products-block'
						) }
					>
						<ToggleControl
							label={ __(
								'Shipping calculator',
								'woo-gutenberg-products-block'
							) }
							help={ __(
								'Allow customers to estimate shipping by entering their address.',
								'woo-gutenberg-products-block'
							) }
							checked={ isShippingCalculatorEnabled }
							onChange={ () =>
								setAttributes( {
									isShippingCalculatorEnabled: ! isShippingCalculatorEnabled,
								} )
							}
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<Noninteractive>
				<Block
					className={ className }
					isShippingCalculatorEnabled={ isShippingCalculatorEnabled }
				/>
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};

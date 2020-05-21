/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import ToggleButtonControl from '@woocommerce/block-components/toggle-button-control';
import { ProductImage } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';

const Edit = ( { attributes, setAttributes } ) => {
	const { product } = useProductDataContextContext();
	const { productLink, showSaleBadge, saleBadgeAlign } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<ToggleControl
						label={ __(
							'Link to Product Page',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Links the image to the single product listing.',
							'woo-gutenberg-products-block'
						) }
						checked={ productLink }
						onChange={ () =>
							setAttributes( {
								productLink: ! productLink,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Show On-Sale Badge',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Overlay a "sale" badge if the product is on-sale.',
							'woo-gutenberg-products-block'
						) }
						checked={ showSaleBadge }
						onChange={ () =>
							setAttributes( {
								showSaleBadge: ! showSaleBadge,
							} )
						}
					/>
					{ showSaleBadge && (
						<ToggleButtonControl
							label={ __(
								'Sale Badge Alignment',
								'woo-gutenberg-products-block'
							) }
							value={ saleBadgeAlign }
							options={ [
								{
									label: __(
										'Left',
										'woo-gutenberg-products-block'
									),
									value: 'left',
								},
								{
									label: __(
										'Center',
										'woo-gutenberg-products-block'
									),
									value: 'center',
								},
								{
									label: __(
										'Right',
										'woo-gutenberg-products-block'
									),
									value: 'right',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { saleBadgeAlign: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<ProductImage
					product={ product }
					productLink={ productLink }
					showSaleBadge={ showSaleBadge }
					saleBadgeAlign={ saleBadgeAlign }
				/>
			</Disabled>
		</>
	);
};

export default Edit;

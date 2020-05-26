/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ProductTitle } from '@woocommerce/atomic-components';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import HeadingToolbar from '@woocommerce/block-components/heading-toolbar';

const Edit = ( { attributes, setAttributes } ) => {
	const { headingLevel, productLink } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<p>{ __( 'Level', 'woo-gutenberg-products-block' ) }</p>
					<HeadingToolbar
						isCollapsed={ false }
						minLevel={ 2 }
						maxLevel={ 7 }
						selectedLevel={ headingLevel }
						onChange={ ( newLevel ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>
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
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<ProductTitle
					headingLevel={ headingLevel }
					productLink={ productLink }
				/>
			</Disabled>
		</>
	);
};

export default Edit;

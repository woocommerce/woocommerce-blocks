/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { HeadingSwitcher } from '@woocommerce/block-components/heading-control';

/**
 * Internal dependencies
 */
import Block from './block';

export default ( { attributes, setAttributes } ) => {
	const { headingLevel, productLink } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					<p>{ __( 'Level', 'woo-gutenberg-products-block' ) }</p>
					<HeadingSwitcher
						isCollapsed={ false }
						minLevel={ 1 }
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
				<Block { ...attributes } />
			</Disabled>
		</>
	);
};

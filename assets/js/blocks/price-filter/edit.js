/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

export default function( { attributes, setAttributes } ) {
	const getInspectorControls = () => {
		const { showInputFields } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Block Settings', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Show input fields', 'woo-gutenberg-products-block' ) }
						help={
							showInputFields ?
								__( 'Input fields are visible.', 'woo-gutenberg-products-block' ) :
								__( 'Input fields are hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ showInputFields }
						onChange={ () => setAttributes( { showInputFields: ! showInputFields } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<Fragment>
			{ getInspectorControls() }
			<Disabled>
				<Block attributes={ attributes } isPreview />
			</Disabled>
		</Fragment>
	);
}

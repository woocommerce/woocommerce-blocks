/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		name: string;
		label: string;
		size: string;
		type: string;
		required: boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	const { name, label, required } = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Field Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<TextControl
						label="Label"
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
					/>

					<TextControl
						label="Name"
						value={ name }
						onChange={ ( value ) =>
							setAttributes( { name: value } )
						}
					/>

					<ToggleControl
						label={ __(
							'Required?',
							'woo-gutenberg-products-block'
						) }
						checked={ required }
						onChange={ () =>
							setAttributes( { required: ! required } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<Block field={ attributes } section="shipping" />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};

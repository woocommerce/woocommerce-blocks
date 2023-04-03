/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PlainText,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		key: string;
		label: string;
		size: string;
		type: string;
		errorMessage: string;
		required: boolean;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	const { key, label, required, errorMessage } = attributes;

	const FieldControls = (): JSX.Element => (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Custom Form Field',
					'woo-gutenberg-products-block'
				) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Add custom form fields.',
						'woo-gutenberg-products-block'
					) }
				</p>

				<label htmlFor="wc-block-checkout__field-name">
					{ __( 'Field Name', 'woo-gutenberg-products-block' ) }
					<PlainText
						id="wc-block-checkout__field-name"
						className={ '' }
						value={ key }
						onChange={ ( value ) =>
							setAttributes( { key: value } )
						}
					/>
				</label>

				<label htmlFor="wc-block-checkout__field-label">
					{ __( 'Field Label', 'woo-gutenberg-products-block' ) }
					<PlainText
						id="wc-block-checkout__field-label"
						className={ '' }
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
					/>
				</label>

				<ToggleControl
					label={ __( 'Required', 'woo-gutenberg-products-block' ) }
					checked={ required }
					onChange={ () => setAttributes( { required: ! required } ) }
				/>

				<label htmlFor="wc-block-checkout__field-error-message">
					{ __( 'Error Message', 'woo-gutenberg-products-block' ) }
					<PlainText
						id="wc-block-checkout__field-error-message"
						className={ '' }
						value={ errorMessage }
						onChange={ ( value ) =>
							setAttributes( { errorMessage: value } )
						}
					/>
				</label>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<div>
			<FieldControls />
			<Block field={ attributes } section="shipping" />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};

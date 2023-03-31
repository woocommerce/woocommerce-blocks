/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
export interface FormStepBlockProps {
	attributes: { title: string; description: string; showStepNumber: boolean };
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	className?: string;
	children?: React.ReactNode;
	lock?: { move: boolean; remove: boolean };
}

/**
 * Custom Fields list for use in the editor.
 */
export const CustomFields = (): JSX.Element => {
	const [ fields, setFields ] = useState( [] );

	const addField = () => {
		setFields( [ ...fields, { name: 'test-field' } ] );
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Custom Fields', 'woo-gutenberg-products-block' ) }
			>
				{ fields.map( ( field, index ) => (
					<TextControl
						label={ __(
							'Field Name:',
							'woo-gutenberg-products-block'
						) }
						key={ index }
						value={ field.name }
						onChange={ () => void 0 }
					/>
				) ) }
				<Button
					variant="secondary"
					isBusy={ false }
					aria-disabled={ false }
					onClick={ addField }
				>
					{ __( 'Add Custom Field', 'woo-gutenberg-products-block' ) }
				</Button>
				<p className="wc-block-checkout__controls-text">
					{ __( 'Test.', 'woo-gutenberg-products-block' ) }
				</p>
			</PanelBody>
		</InspectorControls>
	);
};

/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RadioControl,
	FormFileUpload,
	DatePicker,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { TextInput } from '@woocommerce/blocks-checkout';
import { Textarea } from '@woocommerce/base-components/textarea';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const CustomField = ( { type, placeholder, label } ): JSX.Element | null => {
	switch ( type ) {
		case 'text':
			return (
				<TextInput
					value={ '' }
					placeholder={ placeholder }
					id="custom-field"
					onChange={ () => void 0 }
				/>
			);
		case 'file':
			return (
				<FormFileUpload onChange={ () => void 0 }>
					Upload
				</FormFileUpload>
			);
		case 'date':
			return (
				<>
					<p>{ label }</p>
					<DatePicker
						currentDate={ new Date() }
						onChange={ () => void 0 }
					/>
				</>
			);
		case 'textarea':
			return (
				<Textarea
					value={ '' }
					placeholder={ placeholder }
					disabled={ false }
					onTextChange={ () => void 0 }
				/>
			);
	}
	return null;
};

export const Edit = ( { attributes, setAttributes } ): JSX.Element => {
	const isSavingPost = select( 'core/editor' ).isSavingPost();
	const isSavingNonPostEntityChanges =
		select( 'core/editor' ).isSavingNonPostEntityChanges();

	// This doesn't work yet. isSavingPost doesn't refresh when the user hits the "Update" button.
	// https://a8c.slack.com/archives/C45SNKV4Z/p1669373002015959
	useEffect( () => {
		if ( isSavingPost ) {
		}
	}, [ isSavingPost, isSavingNonPostEntityChanges ] );

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Field Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<RadioControl
						label="Type"
						selected={ attributes.type }
						options={ [
							{ label: 'Text', value: 'text' },
							{ label: 'Textarea', value: 'textarea' },
							{ label: 'Date', value: 'date' },
							{ label: 'File', value: 'file' },
						] }
						onChange={ ( value ) =>
							setAttributes( { type: value } )
						}
					/>
					{ ( attributes.type === 'text' ||
						attributes.type === 'textarea' ) && (
						<TextControl
							label="Placeholder"
							value={ attributes.placeholder }
							onChange={ ( value ) =>
								setAttributes( { placeholder: value } )
							}
						/>
					) }
					{ attributes.type === 'date' && (
						<TextControl
							label="Label"
							value={ attributes.label }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
						/>
					) }
					<ToggleControl
						label="Required?"
						checked={ attributes.required }
						onChange={ () =>
							setAttributes( { required: ! attributes.required } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<CustomField
				type={ attributes.type }
				placeholder={ attributes.placeholder }
				label={ attributes.label }
			/>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};

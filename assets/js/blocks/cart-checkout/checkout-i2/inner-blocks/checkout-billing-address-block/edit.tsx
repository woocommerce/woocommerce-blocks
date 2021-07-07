/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Disabled,
	CheckboxControl,
	Notice,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { FormStepBlock } from '../../form-step';
import Block from './block';
import blockAttributes from './attributes';

export const Edit = ( {
	attributes: {
		showCompanyField,
		showApartmentField,
		showPhoneField,
		requireCompanyField,
		requirePhoneField,
		...attributes
	},
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
		showCompanyField: boolean;
		showApartmentField: boolean;
		showPhoneField: boolean;
		requireCompanyField: boolean;
		requirePhoneField: boolean;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const isDefaultConfig =
		showCompanyField === blockAttributes.showCompanyField.default &&
		showApartmentField === blockAttributes.showApartmentField.default &&
		showPhoneField === blockAttributes.showPhoneField.default &&
		requireCompanyField === blockAttributes.requireCompanyField.default &&
		requirePhoneField === blockAttributes.requirePhoneField.default;
	return (
		<FormStepBlock
			setAttributes={ setAttributes }
			attributes={ attributes }
			className="wc-block-checkout__billing-fields"
		>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Additional Fields',
						'woo-gutenberg-products-block'
					) }
				>
					<p className="wc-block-checkout__controls-text">
						{ __(
							'Show or hide additional fields in the billing address form.',
							'woo-gutenberg-products-block'
						) }
					</p>
					<ToggleControl
						label={ __(
							'Company',
							'woo-gutenberg-products-block'
						) }
						checked={ showCompanyField }
						onChange={ () =>
							setAttributes( {
								showCompanyField: ! showCompanyField,
							} )
						}
					/>
					{ showCompanyField && (
						<CheckboxControl
							label={ __(
								'Require company name?',
								'woo-gutenberg-products-block'
							) }
							checked={ requireCompanyField }
							onChange={ () =>
								setAttributes( {
									requireCompanyField: ! requireCompanyField,
								} )
							}
							className="components-base-control--nested"
						/>
					) }
					<ToggleControl
						label={ __(
							'Apartment, suite, etc.',
							'woo-gutenberg-products-block'
						) }
						checked={ showApartmentField }
						onChange={ () =>
							setAttributes( {
								showApartmentField: ! showApartmentField,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Phone', 'woo-gutenberg-products-block' ) }
						checked={ showPhoneField }
						onChange={ () =>
							setAttributes( {
								showPhoneField: ! showPhoneField,
							} )
						}
					/>
					{ showPhoneField && (
						<CheckboxControl
							label={ __(
								'Require phone number?',
								'woo-gutenberg-products-block'
							) }
							checked={ requirePhoneField }
							onChange={ () =>
								setAttributes( {
									requirePhoneField: ! requirePhoneField,
								} )
							}
							className="components-base-control--nested"
						/>
					) }
					{ ! isDefaultConfig && (
						<Notice
							className="wc-block-checkout__address-fields-notice"
							isDismissible={ false }
							status="warning"
						>
							{ __(
								'Changing the default fields may affect conversion. Customers will be shown both the billing and shipping forms if the fields do not match.',
								'woo-gutenberg-products-block'
							) }
						</Notice>
					) }
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<Block
					showCompanyField={ showCompanyField }
					showApartmentField={ showApartmentField }
					requireCompanyField={ requireCompanyField }
					showPhoneField={ showPhoneField }
					requirePhoneField={ requirePhoneField }
				/>
			</Disabled>
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};

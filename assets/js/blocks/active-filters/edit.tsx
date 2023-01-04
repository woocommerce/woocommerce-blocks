/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import BlockTitle from '@woocommerce/editor-components/block-title';
import { Disabled, PanelBody, withSpokenMessages } from '@wordpress/components';
import ToggleButtonControl from '@woocommerce/editor-components/toggle-button-control';

/**
 * Internal dependencies
 */
import Block from './block';
import type { Attributes } from './types';
import './editor.scss';
import { UpgradeNotice } from '../filter-wrapper/upgrade';

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const { className, displayStyle, heading, headingLevel } = attributes;

	const blockProps = useBlockProps( {
		className,
	} );

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __(
						'Display Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleButtonControl
						label={ __(
							'Display Style',
							'woo-gutenberg-products-block'
						) }
						value={ displayStyle }
						options={ [
							{
								label: __(
									'List',
									'woo-gutenberg-products-block'
								),
								value: 'list',
							},
							{
								/* translators: "Chips" is a tag-like display style for chosen attributes. */
								label: __(
									'Chips',
									'woo-gutenberg-products-block'
								),
								value: 'chips',
							},
						] }
						onChange={ ( value: Attributes[ 'displayStyle' ] ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
						className="wc-block-active-filter__style-toggle"
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }
			<UpgradeNotice
				attributes={ attributes }
				clientId={ clientId }
				setAttributes={ setAttributes }
				filterType="active-filters"
			/>
			{ heading && (
				<BlockTitle
					className="wc-block-active-filters__title"
					headingLevel={ headingLevel }
					heading={ heading }
					onChange={ ( value: Attributes[ 'heading' ] ) =>
						setAttributes( { heading: value } )
					}
				/>
			) }
			<Disabled>
				<Block attributes={ attributes } isEditor={ true } />
			</Disabled>
		</div>
	);
};

export default withSpokenMessages( Edit );

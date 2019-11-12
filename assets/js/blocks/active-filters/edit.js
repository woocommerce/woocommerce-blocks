/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { Disabled, PanelBody, withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block.js';
import ToggleButtonControl from '../../components/toggle-button-control';

const Edit = ( { attributes, setAttributes } ) => {
	const getInspectorControls = () => {
		const { displayStyle } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __(
						'Block Settings',
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
								label: __(
									'Chips',
									'woo-gutenberg-products-block'
								),
								value: 'chips',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
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
};

export default withSpokenMessages( Edit );

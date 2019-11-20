/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PlainText } from '@wordpress/block-editor';
import { Disabled, PanelBody, withSpokenMessages } from '@wordpress/components';
import HeadingToolbar from '@woocommerce/block-components/heading-toolbar';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Block from './block.js';
import ToggleButtonControl from '../../components/toggle-button-control';

const Edit = ( { attributes, setAttributes } ) => {
	const { className, displayStyle, heading, headingLevel } = attributes;

	const getInspectorControls = () => {
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
					<p>
						{ __(
							'Heading Level',
							'woo-gutenberg-products-block'
						) }
					</p>
					<HeadingToolbar
						isCollapsed={ false }
						minLevel={ 2 }
						maxLevel={ 7 }
						selectedLevel={ headingLevel }
						onChange={ ( newLevel ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const TagName = `h${ headingLevel }`;

	return (
		<div className={ classNames( 'is-loading', className ) }>
			{ getInspectorControls() }
			<TagName>
				<PlainText
					className="wc-block-attribute-filter-heading"
					value={ heading }
					onChange={ ( value ) =>
						setAttributes( { heading: value } )
					}
				/>
			</TagName>
			<Disabled>
				<Block attributes={ attributes } isPreview />
			</Disabled>
		</div>
	);
};

export default withSpokenMessages( Edit );

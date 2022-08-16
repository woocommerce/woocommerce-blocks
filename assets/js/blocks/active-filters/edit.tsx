/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import HeadingToolbar from '@woocommerce/editor-components/heading-toolbar';
import BlockTitle from '@woocommerce/editor-components/block-title';
import UpdateFilterHeadingsPrompt from '@woocommerce/base-components/filter-update-heading';
import { BlockEditProps } from '@wordpress/blocks';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean } from '@woocommerce/types';
import {
	Disabled,
	PanelBody,
	withSpokenMessages,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';
import type { Attributes } from './types';
import useUpdateFilterHeadings from '../../shared/hooks/use-update-filter-headings';

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
						'Block Settings',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleGroupControl
						label={ __(
							'Display Style',
							'woo-gutenberg-products-block'
						) }
						value={ displayStyle }
						onChange={ ( value: Attributes[ 'displayStyle' ] ) =>
							setAttributes( {
								displayStyle: value,
							} )
						}
					>
						<ToggleGroupControlOption
							value="list"
							label={ __(
								'List',
								'woo-gutenberg-products-block'
							) }
						/>
						<ToggleGroupControlOption
							value="chips"
							label={ __(
								'Chips',
								'woo-gutenberg-products-block'
							) }
						/>
					</ToggleGroupControl>
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
						onChange={ ( newLevel: Attributes[ 'headingLevel' ] ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	/*
		Since WooCommerce Blocks 8.2.0, we have decoupled the block title from the filter block itself.
		So we need to prompt users who are already using the block with title to click update,
		where we will create a title block for them.
	*/
	const shouldRemoveBlockTitle = getSettingWithCoercion(
		'shouldRemoveBlockTitle',
		false,
		isBoolean
	);
	const updateBlockHeading = useUpdateFilterHeadings( {
		heading,
		headingLevel,
		clientId,
		setAttributes,
	} );

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }
			{ shouldRemoveBlockTitle && heading && (
				<UpdateFilterHeadingsPrompt onClick={ updateBlockHeading } />
			) }
			{ heading && (
				<BlockTitle
					className="wc-block-active-filters__title"
					headingLevel={ headingLevel }
					heading={ heading }
					onChange={ ( value: Attributes[ 'heading' ] ) =>
						setAttributes( { heading: value } )
					}
					disabled={ shouldRemoveBlockTitle }
				/>
			) }
			<Disabled>
				<Block attributes={ attributes } isEditor={ true } />
			</Disabled>
		</div>
	);
};

export default withSpokenMessages( Edit );

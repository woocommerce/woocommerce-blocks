/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { BlockEditProps, createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import BlockTitle from '@woocommerce/editor-components/block-title';
import {
	Disabled,
	PanelBody,
	withSpokenMessages,
	ToolbarGroup,
	ToolbarButton,
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
import './editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const { className, displayStyle, heading, headingLevel } = attributes;

	const blockProps = useBlockProps( {
		className,
	} );

	const { replaceBlock } = useDispatch( 'core/block-editor' );

	const getInspectorControls = () => {
		return (
			<>
				<InspectorControls key="inspector">
					<PanelBody
						title={ __(
							'Display Settings',
							'woo-gutenberg-products-block'
						) }
					>
						<ToggleGroupControl
							label={ __(
								'Display Style',
								'woo-gutenberg-products-block'
							) }
							value={ displayStyle }
							onChange={ (
								value: Attributes[ 'displayStyle' ]
							) =>
								setAttributes( {
									displayStyle: value,
								} )
							}
							className="wc-block-active-filter__style-toggle"
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
					</PanelBody>
				</InspectorControls>
				{ heading && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								text={ __(
									'Upgrade block',
									'woo-gutenberg-products-block'
								) }
								showTooltip={ true }
								label={ __(
									'We have improved this block to make the styling easier. Upgrade to the new block to get started.',
									'woo-gutenberg-products-block'
								) }
								onClick={ () => {
									replaceBlock(
										clientId,
										createBlock(
											'woocommerce/filter-wrapper',
											{
												heading,
												filterType: 'active-filters',
											}
										)
									);
									setAttributes( {
										heading: '',
									} );
								} }
							/>
						</ToolbarGroup>
					</BlockControls>
				) }
			</>
		);
	};

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }
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

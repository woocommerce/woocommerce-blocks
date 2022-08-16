/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	Warning,
} from '@wordpress/block-editor';
import HeadingToolbar from '@woocommerce/editor-components/heading-toolbar';
import BlockTitle from '@woocommerce/editor-components/block-title';
import { BlockEditProps, createBlock } from '@wordpress/blocks';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean } from '@woocommerce/types';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	Button,
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

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const { className, displayStyle, heading, headingLevel } = attributes;

	const blockProps = useBlockProps( {
		className,
	} );

	const isHeadingRemoved = getSettingWithCoercion(
		'isHeadingRemoved',
		false,
		isBoolean
	);

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

	const { insertBlock } = useDispatch( 'core/block-editor' );
	const currentBlockIndex = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlockIndex( clientId )
	);

	const updateBlock = () => {
		const headingBlock = createBlock( 'core/heading', {
			content: heading,
			level: headingLevel,
		} );
		insertBlock( headingBlock, currentBlockIndex );
		setAttributes( {
			heading: '',
		} );
	};

	const actions = [
		<Button key="update" onClick={ updateBlock } variant="primary">
			{ __( 'Update block', 'woo-gutenberg-products-block' ) }
		</Button>,
	];

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }

			{ isHeadingRemoved ? (
				heading && (
					<>
						<Warning actions={ actions }>
							{ __(
								'This block has been updated!',
								'woo-gutenberg-products-block'
							) }
						</Warning>
						<Disabled>
							<BlockTitle
								className="wc-block-active-filters__title"
								headingLevel={ headingLevel }
								heading={ heading }
								onChange={ ( value: Attributes[ 'heading' ] ) =>
									setAttributes( { heading: value } )
								}
							/>
						</Disabled>
					</>
				)
			) : (
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

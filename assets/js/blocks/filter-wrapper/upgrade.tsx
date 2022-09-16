/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

interface UpgradeToolbarButtonProps {
	clientId: string;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	attributes: Record< string, unknown >;
	filterType: undefined | string;
}

export const UpgradeToolbarButton = ( {
	clientId,
	setAttributes,
	filterType,
	attributes,
}: UpgradeToolbarButtonProps ) => {
	const { replaceBlock } = useDispatch( 'core/block-editor' );
	const { heading, headingLevel } = attributes;

	const upgradeFilterBlockHandler = () => {
		const filterWrapperInnerBlocks: BlockInstance[] = [
			createBlock( `woocommerce/${ filterType }`, {
				...attributes,
				heading: '',
			} ),
		];

		if ( heading && heading !== '' ) {
			filterWrapperInnerBlocks.unshift(
				createBlock( 'core/heading', {
					content: heading,
					headingLevel: headingLevel ?? 2,
				} )
			);
		}

		replaceBlock(
			clientId,
			createBlock(
				'woocommerce/filter-wrapper',
				{
					heading,
					filterType,
				},
				[ ...filterWrapperInnerBlocks ]
			)
		);
		setAttributes( {
			heading: '',
		} );
	};

	if ( ! heading || ! filterType ) {
		return null;
	}

	return (
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
					onClick={ upgradeFilterBlockHandler }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

interface UpgradeToolbarButtonProps {
	heading: string;
	clientId: string;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

export const UpgradeToolbarButton = ( {
	heading,
	clientId,
	setAttributes,
}: UpgradeToolbarButtonProps ) => {
	const { replaceBlock } = useDispatch( 'core/block-editor' );

	const upgradeFilterBlockHandler = () => {
		replaceBlock(
			clientId,
			createBlock( 'woocommerce/filter-wrapper', {
				heading,
				filterType: 'active-filters',
			} )
		);
		setAttributes( {
			heading: '',
		} );
	};

	if ( ! heading ) {
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

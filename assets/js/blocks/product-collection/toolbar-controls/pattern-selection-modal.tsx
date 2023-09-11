/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';

const DisplayLayoutControl = ( props: {
	clientId: string;
	closePatternSelectionModal: () => void;
} ) => {
	const { clientId } = props;
	const blockName = 'woocommerce/product-collection';

	// const onBlockPatternSelect = ( pattern, blocks ) => {
	// 	const { newBlocks, queryClientIds } = getTransformedBlocksFromPattern(
	// 		blocks,
	// 		attributes
	// 	);
	// 	replaceBlock( clientId, newBlocks );
	// 	if ( queryClientIds[ 0 ] ) {
	// 		selectBlock( queryClientIds[ 0 ] );
	// 	}
	// };

	const blockPatterns = useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( 'core/block-editor' );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockName, rootClientId );
		},
		[ blockName, clientId ]
	);

	return (
		<Modal
			overlayClassName="block-library-query-pattern__selection-modal"
			title={ __( 'Choose a pattern', 'woo-gutenberg-products-block' ) }
			onRequestClose={ props.closePatternSelectionModal }
			isFullScreen={ true }
		>
			<div className="block-library-query-pattern__selection-content">
				{ /* <BlockContextProvider value={ blockPreviewContext }> */ }
				<BlockPatternsList
					blockPatterns={ blockPatterns }
					shownPatterns={ blockPatterns }
					// onClickPattern={  }
				/>
				{ /* </BlockContextProvider> */ }
			</div>
		</Modal>
	);
};

export default DisplayLayoutControl;

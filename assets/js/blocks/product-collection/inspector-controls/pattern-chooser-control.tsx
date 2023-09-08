/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

const DisplayLayoutControl = ( props: {
	clientId: string;
	openPatternSelectionModal: () => void;
} ) => {
	const { clientId } = props;
	const blockName = 'woocommerce/product-collection';

	const blockPatterns = useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( 'core/block-editor' );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockName, rootClientId );
		},
		[ blockName, clientId ]
	);

	console.log( blockPatterns );

	return (
		<ToolbarGroup>
			<ToolbarButton onClick={ props.openPatternSelectionModal }>
				{ __( 'Choose pattern', 'woo-gutenberg-products-block' ) }
			</ToolbarButton>
		</ToolbarGroup>
	);
};

export default DisplayLayoutControl;

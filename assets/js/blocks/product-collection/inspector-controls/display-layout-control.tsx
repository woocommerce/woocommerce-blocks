/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';
import { ToolbarGroup } from '@wordpress/components';
import { list, grid } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	ProductCollectionAttributes,
	ProductCollectionDisplayLayout,
} from '../types';

const DisplayLayoutControl = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const { type, columns } = props.attributes.displayLayout;
	const setLayout = ( displayLayout: ProductCollectionDisplayLayout ) => {
		props.setAttributes( { displayLayout } );
	};

	const displayLayoutControls = [
		{
			icon: list,
			title: __( 'List view', 'woo-gutenberg-products-block' ),
			onClick: () => setLayout( { type: 'list', columns } ),
			isActive: type === 'list',
		},
		{
			icon: grid,
			title: __( 'Grid view', 'woo-gutenberg-products-block' ),
			onClick: () => setLayout( { type: 'grid', columns } ),
			isActive: type === 'flex',
		},
	];

	return <ToolbarGroup controls={ displayLayoutControls } />;
};

export default DisplayLayoutControl;

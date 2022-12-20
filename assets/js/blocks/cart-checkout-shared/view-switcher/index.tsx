/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect, select as dataSelect } from '@wordpress/data';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import {
	store as blockEditorStore,
	BlockControls,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { Icon } from '@wordpress/icons';
import { eye } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import type { View } from './types';
import { getView } from './utils';

export const ViewSwitcher = ( {
	currentView,
	views,
	clientId,
}: {
	currentView: string;
	views: View[];
	clientId: string;
} ): JSX.Element | null => {
	const currentViewObject = getView( currentView, views ) || views[ 0 ];
	const currentViewLabel = currentViewObject.label;
	const { updateBlockAttributes, selectBlock } =
		useDispatch( blockEditorStore );

	/*useEffect( () => {
		if ( ! currentViewInContext ) {
			setViewInContext( initialView.view );
		}
	}, [ setViewInContext, currentViewInContext, initialView ] );
	const [ currentView, setCurrentView ] = useState( initialView );

	const { getBlock, getSelectedBlockClientId, getBlockParentsByBlockName } =
		select( blockEditorStore );
	const selectedBlockClientId = getSelectedBlockClientId();

	useEffect( () => {
		const selectedBlock = getBlock( selectedBlockClientId );

		if ( ! selectedBlock ) {
			return;
		}

		if ( currentView.view === selectedBlock.name ) {
			return;
		}

		const viewNames = views.map( ( { view } ) => view );

		if ( viewNames.includes( selectedBlock.name ) ) {
			const newView = getView( selectedBlock.name, views );
			if ( newView ) {
				return;
				//setViewInContext( newView.view );
				//return setCurrentView( newView );
			}
		}

		const parentBlockIds = getBlockParentsByBlockName(
			selectedBlockClientId,
			viewNames
		);

		if ( parentBlockIds.length !== 1 ) {
			return;
		}
		const parentBlock = getBlock( parentBlockIds[ 0 ] );

		if ( currentView.view === parentBlock.name ) {
			return;
		}

		const newView = getView( parentBlock.name, views );

		if ( newView ) {
			setViewInContext( newView.view );
			setCurrentView( newView );
		}
	}, [
		getBlockParentsByBlockName,
		selectedBlockClientId,
		getBlock,
		currentView.view,
		views,
	] );*/

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					label={ __(
						'Switch view',
						'woo-gutenberg-products-block'
					) }
					text={ currentViewLabel }
					icon={
						<Icon icon={ eye } style={ { marginRight: '8px' } } />
					}
					controls={ views.map( ( view ) => ( {
						...view,
						title: <span>{ view.label }</span>,
						isActive: view.view === currentView,
						onClick: () => {
							updateBlockAttributes( [ clientId ], {
								currentView: view.view,
							} );
							selectBlock(
								dataSelect( blockEditorStore )
									.getBlock( clientId )
									?.innerBlocks.find(
										( block: { name: string } ) =>
											block.name === view.view
									)?.clientId || clientId
							);
						},
					} ) ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

const withViewSwitcher = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
		const { views, currentView, viewClientId } = useSelect( ( select ) => {
			const { getBlock, getBlockRootClientId } =
				select( blockEditorStore );

			const findRootBlockWithViews = (
				currentClientId: string
			): {
				views: View[];
				currentView: string;
				viewClientId: string;
			} => {
				const currentBlock = getBlock( currentClientId );

				if ( currentBlock.attributes.views ) {
					return {
						views: currentBlock.attributes.views,
						currentView: currentBlock.attributes.currentView,
						viewClientId: currentClientId,
					};
				}

				const rootId = getBlockRootClientId( currentClientId );

				if ( rootId === null || rootId === '' ) {
					return {
						views: [],
						currentView: '',
						viewClientId: '',
					};
				}

				const rootBlock = getBlock( rootId );

				if ( rootBlock.attributes.views !== undefined ) {
					return {
						views: rootBlock.attributes.views,
						currentView: rootBlock.attributes.currentView,
						viewClientId: rootId,
					};
				}

				return findRootBlockWithViews( rootId );
			};

			return findRootBlockWithViews( clientId );
		} );

		if ( ! views || views.length === 0 ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<ViewSwitcher
					currentView={ currentView }
					views={ views }
					clientId={ viewClientId }
				/>
				<BlockEdit { ...props } />
			</>
		);
	},
	'withViewSwitcher'
);

if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/with-view-switcher' ) ) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/with-view-switcher',
		withViewSwitcher,
		11
	);
}

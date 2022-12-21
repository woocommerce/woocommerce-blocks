/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter, hasFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import Switcher from './switcher';
import { findParentBlockEditorViews } from './utils';

const withViewSwitcher = createHigherOrderComponent(
	( BlockEdit ) =>
		( props: Record< string, unknown > ): JSX.Element => {
			const { clientId } = props as { clientId: string };
			const { views, currentView, viewClientId } = useSelect(
				( select ) => {
					const blockAttributes =
						select( 'core/block-editor' ).getBlockAttributes(
							clientId
						);

					return blockAttributes?.editorViews
						? {
								views: blockAttributes.editorViews,
								currentView: blockAttributes.currentView,
								viewClientId: clientId,
						  }
						: findParentBlockEditorViews( clientId );
				}
			);

			if ( views.length === 0 ) {
				return <BlockEdit { ...props } />;
			}

			return (
				<>
					<Switcher
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

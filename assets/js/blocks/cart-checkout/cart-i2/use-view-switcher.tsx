/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { Toolbar, ToolbarDropdownMenu } from '@wordpress/components';
import { Icon, eye } from '@woocommerce/icons';

interface View {
	view: string;
	label: string;
	icon: string | JSX.Element;
	default?: boolean;
}

export const useViewSwitcher = (
	clientId: string,
	views: View[]
): {
	currentView: string;
	component: () => JSX.Element;
} => {
	const initialView =
		views?.find( ( view ) => view.default === true ) || views[ 0 ];
	const [ currentView, setCurrentView ] = useState( initialView );
	const { selectBlock } = useDispatch( 'core/block-editor' );

	const ViewSwitcherComponent = () => (
		<Toolbar>
			<ToolbarDropdownMenu
				label={ __( 'Switch view', 'woo-gutenberg-products-block' ) }
				text={ currentView.label }
				icon={
					<Icon srcElement={ eye } style={ { marginRight: '8px' } } />
				}
				controls={ views.map( ( view ) => ( {
					...view,
					title: view.label,
					onClick: () => {
						setCurrentView( view );
						selectBlock( clientId );
					},
				} ) ) }
			/>
		</Toolbar>
	);

	return {
		currentView: currentView.view,
		component: ViewSwitcherComponent,
	};
};

export default useViewSwitcher;

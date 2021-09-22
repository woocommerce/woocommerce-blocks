/**
 * External dependencies
 */
import classnames from 'classnames';
import { SidebarLayout } from '@woocommerce/base-components/sidebar-layout';

const FrontendBlock = ( {
	children,
}: {
	children: JSX.Element;
} ): JSX.Element => {
	// @todo pass attributes to inner most blocks.
	const hasDarkControls = false;
	return (
		<SidebarLayout
			className={ classnames( 'wc-block-cart', {
				'has-dark-controls': hasDarkControls,
			} ) }
		>
			{ children }
		</SidebarLayout>
	);
};

export default FrontendBlock;

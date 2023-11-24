/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { SidebarLayout } from '~/base/components/sidebar-layout';
import { useCartBlockContext } from '../../context';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element | JSX.Element[];
	className: string;
} ): JSX.Element | null => {
	const { cartItems, cartIsLoading } = useStoreCart();
	const { hasDarkControls } = useCartBlockContext();

	if ( cartIsLoading || cartItems.length >= 1 ) {
		return (
			<SidebarLayout
				className={ classnames( 'wc-block-cart', className, {
					'has-dark-controls': hasDarkControls,
				} ) }
			>
				{ children }
			</SidebarLayout>
		);
	}
	return null;
};

export default FrontendBlock;

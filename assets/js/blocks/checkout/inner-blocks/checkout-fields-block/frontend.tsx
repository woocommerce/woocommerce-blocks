/**
 * External dependencies
 */
import classnames from 'classnames';
import { Main } from '@woocommerce/base-components/sidebar-layout';
import { useEffect } from '@wordpress/element';
import { register, useRegistry } from '@wordpress/data';
import { useStoreOrder } from '@woocommerce/base-context/hooks/cart/use-store-order';

/**
 * Internal dependencies
 */
import './style.scss';
import { pushChanges } from '../../../../data/cart/push-changes';
import { STORE_KEY } from '../../../../data/cart/constants';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element;
	className?: string;
} ): JSX.Element => {
	const registry = useRegistry();
	const { orderId, orderKey } = useStoreOrder();

	useEffect( () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - Ignoring because stores are in the registry.
		const unsubscribe = registry.stores[ STORE_KEY ].subscribe( () =>
			pushChanges( orderId, orderKey )
		);
		return unsubscribe;
	}, [ orderId, orderKey ] );

	return (
		<Main className={ classnames( 'wc-block-checkout__main', className ) }>
			<form className="wc-block-components-form wc-block-checkout__form">
				{ children }
			</form>
		</Main>
	);
};

export default FrontendBlock;

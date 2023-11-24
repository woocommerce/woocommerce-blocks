/**
 * External dependencies
 */
import classnames from 'classnames';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useStoreEvents } from '~/base/context/hooks';
import { Main } from '~/base/components/sidebar-layout';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element;
	className?: string;
} ): JSX.Element => {
	const { dispatchCheckoutEvent } = useStoreEvents();

	// Ignore changes to dispatchCheckoutEvent callback so this is ran on first mount only.
	useEffect( () => {
		dispatchCheckoutEvent( 'render-checkout-form' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<Main className={ classnames( 'wc-block-checkout__main', className ) }>
			<form className="wc-block-components-form wc-block-checkout__form">
				{ children }
			</form>
		</Main>
	);
};

export default FrontendBlock;

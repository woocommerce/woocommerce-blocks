/**
 * External dependencies
 */
import { CartEventsProvider } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { DrawerCloseButton } from '~/base/components/drawer';
import './inner-blocks/register-components';

type MiniCartContentsBlockProps = {
	attributes: Record< string, unknown >;
	children: JSX.Element | JSX.Element[];
};

export const MiniCartContentsBlock = (
	props: MiniCartContentsBlockProps
): JSX.Element => {
	const { children } = props;

	return (
		<>
			<CartEventsProvider>
				<DrawerCloseButton />
				{ children }
			</CartEventsProvider>
		</>
	);
};

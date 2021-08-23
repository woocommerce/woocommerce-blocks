/**
 * External dependencies
 */
import { Modal } from '@wordpress/components';
import { useDebounce } from 'use-debounce';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

interface DrawerProps {
	children: JSX.Element;
	isOpen: boolean;
	onClose: () => void;
	slideIn?: boolean;
	slideOut?: boolean;
	title: string;
}

const Drawer = ( {
	children,
	isOpen,
	onClose,
	slideIn = true,
	slideOut = true,
	title,
}: DrawerProps ): JSX.Element | null => {
	const [ debouncedIsOpen ] = useDebounce< boolean >( isOpen, 300 );
	const isClosing = ! isOpen && debouncedIsOpen;

	if ( ! isOpen && ! isClosing ) {
		return null;
	}

	return (
		<Modal
			title={ title }
			focusOnMount={ true }
			onRequestClose={ onClose }
			className={ classNames( 'wc-block-components-drawer', {
				'wc-block-components-drawer--with-slide-in': slideIn,
				'wc-block-components-drawer--with-slide-out': slideOut,
			} ) }
			overlayClassName={ classNames(
				'wc-block-components-drawer__screen-overlay',
				{
					'wc-block-components-drawer__screen-overlay--is-hidden': ! isOpen,
				}
			) }
		>
			{ children }
		</Modal>
	);
};

export default Drawer;

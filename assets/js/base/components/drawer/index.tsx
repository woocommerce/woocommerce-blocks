/**
 * Some code of the Drawer component is based on the Modal component from Gutenberg:
 * https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/modal/index.tsx
 */
/**
 * External dependencies
 */
import classNames from 'classnames';
import { useDebounce } from 'use-debounce';
import type { ForwardedRef, KeyboardEvent } from 'react';
import { __ } from '@wordpress/i18n';
import {
	createPortal,
	useEffect,
	useRef,
	forwardRef,
} from '@wordpress/element';
import { close } from '@wordpress/icons';
import {
	useFocusReturn,
	useFocusOnMount,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseFocusOutside as useFocusOutside,
	useConstrainedTabbing,
	useMergeRefs,
} from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Button from '../button';
import * as ariaHelper from './utils/aria-helper';
import './style.scss';

interface DrawerProps {
	children: JSX.Element;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
	slideIn?: boolean;
	slideOut?: boolean;
}

const UnforwardedDrawer = (
	{
		children,
		className,
		isOpen,
		onClose,
		slideIn = true,
		slideOut = true,
	}: DrawerProps,
	forwardedRef: ForwardedRef< HTMLDivElement >
): JSX.Element | null => {
	const [ debouncedIsOpen ] = useDebounce< boolean >( isOpen, 300 );
	const isClosing = ! isOpen && debouncedIsOpen;
	const bodyOpenClassName = 'drawer-open';

	const onRequestClose = () => {
		document.body.classList.remove( bodyOpenClassName );
		ariaHelper.showApp();
		onClose();
	};

	const ref = useRef< HTMLDivElement >();
	const focusOnMountRef = useFocusOnMount();
	const constrainedTabbingRef = useConstrainedTabbing();
	const focusReturnRef = useFocusReturn();
	const focusOutsideProps = useFocusOutside( onRequestClose );
	const contentRef = useRef< HTMLDivElement >( null );

	useEffect( () => {
		if ( isOpen ) {
			ariaHelper.hideApp( ref.current );
			document.body.classList.add( bodyOpenClassName );
		}
	}, [ isOpen, bodyOpenClassName ] );

	const overlayRef = useMergeRefs( [ ref, forwardedRef ] );
	const drawerRef = useMergeRefs( [
		constrainedTabbingRef,
		focusReturnRef,
		focusOnMountRef,
	] );

	if ( ! isOpen && ! isClosing ) {
		return null;
	}

	function handleEscapeKeyDown( event: KeyboardEvent< HTMLDivElement > ) {
		if (
			// Ignore keydowns from IMEs
			event.nativeEvent.isComposing ||
			// Workaround for Mac Safari where the final Enter/Backspace of an IME composition
			// is `isComposing=false`, even though it's technically still part of the composition.
			// These can only be detected by keyCode.
			event.keyCode === 229
		) {
			return;
		}

		if ( event.code === 'Escape' && ! event.defaultPrevented ) {
			event.preventDefault();
			onRequestClose();
		}
	}

	return createPortal(
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			ref={ overlayRef }
			className={ classNames(
				'wc-block-components-drawer__screen-overlay',
				{
					'wc-block-components-drawer__screen-overlay--is-hidden':
						! isOpen,
					'wc-block-components-drawer__screen-overlay--with-slide-in':
						slideIn,
					'wc-block-components-drawer__screen-overlay--with-slide-out':
						slideOut,
				}
			) }
			onKeyDown={ handleEscapeKeyDown }
		>
			<div
				className={ classNames(
					className,
					'wc-block-components-drawer'
				) }
				ref={ drawerRef }
				role="dialog"
				tabIndex={ -1 }
				{ ...focusOutsideProps }
			>
				<div
					className="wc-block-components-drawer__content"
					role="document"
					ref={ contentRef }
				>
					<Button
						className="wc-block-components-drawer__close"
						onClick={ onRequestClose }
						icon={ close }
						label={ __( 'Close', 'woo-gutenberg-products-block' ) }
						showTooltip={ false }
					/>
					{ children }
				</div>
			</div>
		</div>,
		document.body
	);
};

export const Drawer = forwardRef( UnforwardedDrawer );

export default Drawer;

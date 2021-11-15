/**
 * External dependencies
 */
import { useRef, useLayoutEffect, useCallback } from '@wordpress/element';
import { debounce } from 'lodash';
import { focus } from '@wordpress/dom';

/**
 * Names of control nodes which need to be disabled.
 */
const INPUT_FIELD_NODE_NAMES = [
	'BUTTON',
	'FIELDSET',
	'INPUT',
	'OPTGROUP',
	'OPTION',
	'SELECT',
	'TEXTAREA',
];

/**
 * Noninteractive component
 *
 * Makes children elements Noninteractive, preventing both mouse and keyboard events without affecting how the elements
 * appear visually. Used for previews.
 *
 * Based on the <Disabled> component in WordPress.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/disabled/index.js
 */
const Noninteractive = ( {
	children,
}: {
	children: React.ReactChildren;
} ): JSX.Element => {
	const node = useRef( null );

	const disable = () => {
		if ( ! node.current ) {
			return;
		}

		focus.focusable.find( node.current ).forEach( ( focusable ) => {
			if (
				INPUT_FIELD_NODE_NAMES.includes( focusable.nodeName ) ||
				focusable.nodeName === 'A'
			) {
				focusable.setAttribute( 'tabindex', '-1' );
			}
			if ( focusable.hasAttribute( 'contenteditable' ) ) {
				focusable.setAttribute( 'contenteditable', 'false' );
			}
		} );
	};

	// Debounce re-disable since disabling process itself will incur additional mutations which should be ignored.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedDisable = useCallback(
		debounce( disable, undefined, { leading: true } ),
		[]
	);

	useLayoutEffect( () => {
		disable();
		let observer: MutationObserver | undefined;
		if ( node.current ) {
			observer = new window.MutationObserver( debouncedDisable );
			observer.observe( node.current, {
				childList: true,
				attributes: true,
				subtree: true,
			} );
		}
		return () => {
			if ( observer ) {
				observer.disconnect();
			}
			debouncedDisable.cancel();
		};
	}, [ debouncedDisable ] );

	return (
		<div
			ref={ node }
			style={ {
				userSelect: 'none',
				pointerEvents: 'none',
			} }
		>
			{ children }
		</div>
	);
};

export default Noninteractive;

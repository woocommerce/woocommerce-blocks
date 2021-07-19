/**
 * External dependencies
 */
import { useRef, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';

const WithScrollToTopComponent = ( { OriginalComponent, ...props } ) => {
	const scrollPointRef = useRef( null );

	const scrollToTopIfNeeded = useCallback( () => {
		if ( scrollPointRef.current === null ) {
			return;
		}
		const scrollPointRefYPosition = scrollPointRef.current.getBoundingClientRect()
			.bottom;
		const isScrollPointRefVisible =
			scrollPointRefYPosition >= 0 &&
			scrollPointRefYPosition <= window.innerHeight;
		if ( ! isScrollPointRefVisible ) {
			scrollPointRef.current.scrollIntoView();
		}
	}, [] );

	const moveFocusToTop = useCallback( ( focusableSelector ) => {
		if ( scrollPointRef.current === null ) {
			return;
		}
		const focusableElements = scrollPointRef.current.parentElement.querySelectorAll(
			focusableSelector
		);
		if ( focusableElements.length ) {
			focusableElements[ 0 ].focus();
		}
	}, [] );

	const scrollToTop = useCallback(
		( args ) => {
			if ( ! window || ! Number.isFinite( window.innerHeight ) ) {
				return;
			}

			scrollToTopIfNeeded();

			if ( args && args.focusableSelector ) {
				moveFocusToTop( args.focusableSelector );
			}
		},
		[ scrollToTopIfNeeded, moveFocusToTop ]
	);

	return (
		<>
			<div
				className="with-scroll-to-top__scroll-point"
				ref={ scrollPointRef }
				aria-hidden
			/>
			<OriginalComponent { ...props } scrollToTop={ scrollToTop } />
		</>
	);
};

/**
 * HOC that provides a function to scroll to the top of the component.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withScrollToTop = ( OriginalComponent ) => {
	return ( props ) => {
		return (
			<WithScrollToTopComponent
				{ ...props }
				OriginalComponent={ OriginalComponent }
			/>
		);
	};
};

export default withScrollToTop;

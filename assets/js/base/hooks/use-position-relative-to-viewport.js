/**
 * External dependencies
 */
import { useRef, useEffect, useState } from '@wordpress/element';

/** @type {React.CSSProperties} */
const style = {
	bottom: 0,
	left: 0,
	opacity: 0,
	pointerEvents: 'none',
	position: 'absolute',
	right: 0,
	top: 0,
	zIndex: -1,
};

/**
 * Returns a positionObserver element and a string  (`above`, `visible` or
 * `below`) based on the element position relative to the viewport.
 * _Note: `usePositionRelativeToViewport` will return an empty position ``
 * until after first render_
 *
 * @return {Array} An array of {Element} `positionObserver` and {string} `position`.
 *
 * @example
 *
 * ```js
 * const App = () => {
 * 	const [ positionObserver, position ] = useContainerQueries();
 *
 * 	return (
 * 		<>
 * 			{ positionObserver }
 * 			{ position === 'below' && <p>Observer is below the viewport.</p> }
 * 			{ position === 'visible' && <p>Observer is visible in the viewport.</p> }
 * 			{ position === 'above' && <p>Observer is above the viewport.</p> }
 * 		</>
 * 	);
 * };
 * ```
 */
export const usePositionRelativeToViewport = () => {
	const [ position, setPosition ] = useState( '' );
	const visibilityObserverRef = useRef( null );
	const intersectionObserver = useRef(
		new IntersectionObserver(
			( entries ) => {
				if ( entries[ 0 ].isIntersecting ) {
					setPosition( 'visible' );
				} else {
					setPosition(
						entries[ 0 ].boundingClientRect.top > 0
							? 'below'
							: 'above'
					);
				}
			},
			{ threshold: 1.0 }
		)
	);

	useEffect( () => {
		const visibilityObserverNode = visibilityObserverRef.current;
		const observer = intersectionObserver.current;

		if ( visibilityObserverNode ) {
			observer.observe( visibilityObserverNode );
		}

		return () => {
			observer.unobserve( visibilityObserverNode );
		};
	}, [] );

	const positionObserver = (
		<div
			aria-hidden={ true }
			ref={ visibilityObserverRef }
			style={ style }
		></div>
	);

	return [ positionObserver, position ];
};

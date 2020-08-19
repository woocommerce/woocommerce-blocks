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
 * Returns an element and a string (`above`, `visible` or `below`) based on the
 * element position relative to the viewport.
 * _Note: `usePositionRelativeToViewport` will return an empty position (``)
 * until after first render_
 *
 * @return {Array} An array of {Element} `referenceElement` and {string} `positionRelativeToViewport`.
 *
 * @example
 *
 * ```js
 * const App = () => {
 * 	const [ referenceElement, positionRelativeToViewport ] = useContainerQueries();
 *
 * 	return (
 * 		<>
 * 			{ referenceElement }
 * 			{ positionRelativeToViewport === 'below' && <p>Reference element is below the viewport.</p> }
 * 			{ positionRelativeToViewport === 'visible' && <p>Reference element is visible in the viewport.</p> }
 * 			{ positionRelativeToViewport === 'above' && <p>Reference element is above the viewport.</p> }
 * 		</>
 * 	);
 * };
 * ```
 */
export const usePositionRelativeToViewport = () => {
	const [
		positionRelativeToViewport,
		setPositionRelativeToViewport,
	] = useState( '' );
	const visibilityObserverRef = useRef( null );
	const intersectionObserver = useRef(
		new IntersectionObserver(
			( entries ) => {
				if ( entries[ 0 ].isIntersecting ) {
					setPositionRelativeToViewport( 'visible' );
				} else {
					setPositionRelativeToViewport(
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

	const referenceElement = (
		<div
			aria-hidden={ true }
			ref={ visibilityObserverRef }
			style={ style }
		></div>
	);

	return [ referenceElement, positionRelativeToViewport ];
};

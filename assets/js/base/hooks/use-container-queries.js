/**
 * External dependencies
 */
import { useResizeObserver } from 'wordpress-compose';

/**
 * Returns a resizeListener element and a class name based on its width.
 * Class names are based on the smaller of the breakpoints:
 * https://github.com/WordPress/gutenberg/tree/master/packages/viewport#usage
 * _Note: `useContainerQueries` will return an empty class name `` until after
 * first render_
 *
 * @return {Array} An array of {Element} `resizeListener` and {string} `className`.
 *
 * @example
 *
 * ```js
 * const App = () => {
 * 	const [ resizeListener, containerQueryClassName ] = useContainerQueries();
 *
 * 	return (
 * 		<div className={ containerQueryClassName }>
 * 			{ resizeListener }
 * 			Your content here
 * 		</div>
 * 	);
 * };
 * ```
 */
export const useContainerQueries = () => {
	const [ resizeListener, { width } ] = useResizeObserver();

	let className = '';
	if ( width > 782 ) {
		className = 'is-large';
	} else if ( width > 600 ) {
		className = 'is-medium';
	} else if ( width > 480 ) {
		className = 'is-small';
	} else if ( width ) {
		className = 'is-mobile';
	}

	return [ resizeListener, className ];
};

/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import preloadScript from './preload-script';
import lazyLoadScript from './lazy-load-script';

interface dependencyData {
	src: string;
	version?: string;
	after?: string;
	before?: string;
	translations?: string;
}

// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', () => {
	const miniCartBlocks = document.querySelectorAll( '.wc-blocks-mini-cart' );

	if ( miniCartBlocks.length === 0 ) {
		return;
	}

	const dependencies = getSetting(
		'mini_cart_block_frontend_dependencies',
		{}
	) as Record< string, dependencyData >;

	// Preload scripts
	for ( const dependencyHandle in dependencies ) {
		const dependency = dependencies[ dependencyHandle ];
		preloadScript( {
			handle: dependencyHandle,
			...dependency,
		} );
	}

	miniCartBlocks.forEach( ( miniCartBlock ) => {
		const miniCartButton = miniCartBlock.querySelector(
			'.wc-blocks-mini-cart-button'
		);
		const miniCartContents = miniCartBlock.querySelector(
			'.wc-blocks-mini-cart-contents'
		);

		if ( ! miniCartButton || ! miniCartContents ) {
			// Markup is not correct, abort.
			return;
		}

		const showContents = async () => {
			miniCartContents.removeAttribute( 'hidden' );

			// Load scripts
			for ( const dependencyHandle in dependencies ) {
				const dependency = dependencies[ dependencyHandle ];
				await lazyLoadScript( {
					handle: dependencyHandle,
					...dependency,
				} );
			}
		};
		const hideContents = () =>
			miniCartContents.setAttribute( 'hidden', 'true' );

		miniCartButton.addEventListener( 'mouseover', showContents );
		miniCartButton.addEventListener( 'mouseleave', hideContents );

		miniCartContents.addEventListener( 'mouseover', showContents );
		miniCartContents.addEventListener( 'mouseleave', hideContents );

		miniCartButton.addEventListener( 'focus', showContents );
		miniCartButton.addEventListener( 'blur', hideContents );
	} );
} );

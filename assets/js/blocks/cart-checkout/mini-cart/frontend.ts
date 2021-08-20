/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import preloadScript from '@woocommerce/base-utils/preload-script';
import lazyLoadScript from '@woocommerce/base-utils/lazy-load-script';

interface dependencyData {
	src: string;
	version?: string;
	after?: string;
	before?: string;
	translations?: string;
}

window.wcBlocksMiniCartDrawerOpen = false;

// eslint-disable-next-line @wordpress/no-global-event-listener
window.onload = () => {
	const miniCartBlocks = document.querySelectorAll( '.wc-block-mini-cart' );

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

	const loadScripts = async () => {
		for ( const dependencyHandle in dependencies ) {
			const dependency = dependencies[ dependencyHandle ];
			await lazyLoadScript( {
				handle: dependencyHandle,
				...dependency,
			} );
		}
	};

	miniCartBlocks.forEach( ( miniCartBlock ) => {
		const miniCartButton = miniCartBlock.querySelector(
			'.wc-block-mini-cart__button'
		);
		const miniCartOverlay = miniCartBlock.querySelector(
			'.wc-block-components-drawer'
		);

		if ( ! miniCartButton || ! miniCartOverlay ) {
			// Markup is not correct, abort.
			return;
		}

		const showContents = async () => {
			miniCartOverlay.classList.add(
				'wc-block-components-drawer--with-slide-in'
			);
			miniCartOverlay.classList.remove(
				'wc-block-components-drawer--is-hidden'
			);
			window.wcBlocksMiniCartDrawerOpen = true;
		};

		miniCartButton.addEventListener( 'mouseover', loadScripts );
		miniCartButton.addEventListener( 'focus', loadScripts );
		miniCartButton.addEventListener( 'click', showContents );
	} );
};

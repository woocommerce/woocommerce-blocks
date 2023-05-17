/**
 * External dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import preloadScript from '@woocommerce/base-utils/preload-script';
import lazyLoadScript from '@woocommerce/base-utils/lazy-load-script';
import getNavigationType from '@woocommerce/base-utils/get-navigation-type';
import { translateJQueryEventToNative } from '@woocommerce/base-utils/legacy-events';
import {
	getCurrencyFromPriceResponse,
	formatPrice,
} from '@woocommerce/price-format';
import { CartResponse } from '@woocommerce/types';

interface dependencyData {
	src: string;
	version?: string;
	after?: string;
	before?: string;
	translations?: string;
}

const getMiniCartTotals = async (): Promise< [ string, number ] | void > => {
	return fetch( '/wp-json/wc/store/v1/cart/' )
		.then( ( response ) => {
			// Check if the response was successful.
			if ( ! response.ok ) {
				throw new Error();
			}

			return response.json();
		} )
		.then( ( data: CartResponse ) => {
			const currency = getCurrencyFromPriceResponse( data.totals );
			const formattedPrice = formatPrice(
				data.totals.total_price,
				currency
			);
			return [ formattedPrice, data.items_count ] as [ string, number ];
		} )
		.catch( ( error ) => {
			// eslint-disable-next-line no-console
			console.error( error );
		} );
};

function getClosestColor(
	element: Element | null,
	colorType: 'color' | 'backgroundColor'
): string | null {
	if ( ! element ) {
		return null;
	}
	const color = window.getComputedStyle( element )[ colorType ];
	if ( color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent' ) {
		return color;
	}
	return getClosestColor( element.parentElement, colorType );
}

window.addEventListener( 'load', () => {
	const miniCartBlocks = document.querySelectorAll( '.wc-block-mini-cart' );
	let wasLoadScriptsCalled = false;

	if ( miniCartBlocks.length === 0 ) {
		return;
	}

	// Fill data.
	getMiniCartTotals().then( ( totals: [ string, number ] | void ) => {
		if ( ! totals ) {
			return;
		}
		const [ amount, quantity ] = totals;
		const miniCartButtons = document.querySelectorAll(
			'.wc-block-mini-cart__button'
		);
		const miniCartQuantities = document.querySelectorAll(
			'.wc-block-mini-cart__badge'
		);
		const miniCartAmounts = document.querySelectorAll(
			'.wc-block-mini-cart__amount'
		);

		miniCartButtons.forEach( ( miniCartButton ) => {
			miniCartButton.setAttribute(
				'aria-label',
				sprintf(
					/* translators: %s number of products in cart. */
					_n(
						'%1$d item in cart, total price of %2$s',
						'%1$d items in cart, total price of %2$s',
						quantity,
						'woo-gutenberg-products-block'
					),
					quantity,
					amount
				)
			);
		} );
		miniCartQuantities.forEach( ( miniCartQuantity ) => {
			miniCartQuantity.textContent = quantity.toString();
		} );
		miniCartAmounts.forEach( ( miniCartAmount ) => {
			miniCartAmount.textContent = amount;
		} );

		// Show the tax label only if there are products in the cart.
		if ( quantity > 0 ) {
			const miniCartTaxLabels = document.querySelectorAll(
				'.wc-block-mini-cart__tax-label'
			);
			miniCartTaxLabels.forEach( ( miniCartTaxLabel ) => {
				miniCartTaxLabel.removeAttribute( 'hidden' );
			} );
		}
	} );

	const dependencies = window.wcBlocksMiniCartFrontendDependencies as Record<
		string,
		dependencyData
	>;

	// Preload scripts
	for ( const dependencyHandle in dependencies ) {
		const dependency = dependencies[ dependencyHandle ];
		preloadScript( {
			handle: dependencyHandle,
			...dependency,
		} );
	}

	// Make it so we can read jQuery events triggered by WC Core elements.
	const removeJQueryAddingToCartEvent = translateJQueryEventToNative(
		'adding_to_cart',
		'wc-blocks_adding_to_cart'
	);
	const removeJQueryAddedToCartEvent = translateJQueryEventToNative(
		'added_to_cart',
		'wc-blocks_added_to_cart'
	);
	const removeJQueryRemovedFromCartEvent = translateJQueryEventToNative(
		'removed_from_cart',
		'wc-blocks_removed_from_cart'
	);

	const loadScripts = async () => {
		// Ensure we only call loadScripts once.
		if ( wasLoadScriptsCalled ) {
			return;
		}
		wasLoadScriptsCalled = true;

		// Remove adding to cart event handler.
		document.body.removeEventListener(
			'wc-blocks_adding_to_cart',
			loadScripts
		);
		removeJQueryAddingToCartEvent();

		// Lazy load scripts.
		for ( const dependencyHandle in dependencies ) {
			const dependency = dependencies[ dependencyHandle ];
			await lazyLoadScript( {
				handle: dependencyHandle,
				...dependency,
			} );
		}
	};

	document.body.addEventListener( 'wc-blocks_adding_to_cart', loadScripts );

	// Load scripts if a page is reloaded via the back button (potentially out of date cart data).
	// Based on refreshCachedCartData() in assets/js/base/context/cart-checkout/cart/index.js.
	window.addEventListener(
		'pageshow',
		( event: PageTransitionEvent ): void => {
			if ( event?.persisted || getNavigationType() === 'back_forward' ) {
				loadScripts();
			}
		}
	);

	miniCartBlocks.forEach( ( miniCartBlock, i ) => {
		if ( ! ( miniCartBlock instanceof HTMLElement ) ) {
			return;
		}

		const miniCartButton = miniCartBlock.querySelector(
			'.wc-block-mini-cart__button'
		);
		const miniCartDrawerPlaceholderOverlay = miniCartBlock.querySelector(
			'.wc-block-components-drawer__screen-overlay'
		);

		if ( ! miniCartButton || ! miniCartDrawerPlaceholderOverlay ) {
			// Markup is not correct, abort.
			return;
		}

		const loadContents = () => {
			if ( ! wasLoadScriptsCalled ) {
				loadScripts();
			}
			document.body.removeEventListener(
				'wc-blocks_added_to_cart',
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				funcOnAddToCart
			);
			document.body.removeEventListener(
				'wc-blocks_removed_from_cart',
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				loadContentsWithRefresh
			);
			removeJQueryAddedToCartEvent();
			removeJQueryRemovedFromCartEvent();
		};

		const openDrawer = () => {
			miniCartBlock.dataset.isInitiallyOpen = 'true';

			miniCartDrawerPlaceholderOverlay.classList.add(
				'wc-block-components-drawer__screen-overlay--with-slide-in'
			);
			miniCartDrawerPlaceholderOverlay.classList.remove(
				'wc-block-components-drawer__screen-overlay--is-hidden'
			);

			loadContents();
		};

		const openDrawerWithRefresh = () => {
			miniCartBlock.dataset.isDataOutdated = 'true';
			openDrawer();
		};

		const loadContentsWithRefresh = () => {
			miniCartBlock.dataset.isDataOutdated = 'true';
			miniCartBlock.dataset.isInitiallyOpen = 'false';
			loadContents();
		};

		miniCartButton.addEventListener( 'mouseover', loadScripts );
		miniCartButton.addEventListener( 'focus', loadScripts );
		miniCartButton.addEventListener( 'click', openDrawer );

		const funcOnAddToCart =
			miniCartBlock.dataset.addToCartBehaviour === 'open_drawer'
				? openDrawerWithRefresh
				: loadContentsWithRefresh;

		// There might be more than one Mini-Cart block in the page. Make sure
		// only one opens when adding a product to the cart.
		if ( i === 0 ) {
			document.body.addEventListener(
				'wc-blocks_added_to_cart',
				funcOnAddToCart
			);
			document.body.addEventListener(
				'wc-blocks_removed_from_cart',
				loadContentsWithRefresh
			);
		}
	} );

	/**
	 * Get the background color of the body then set it as the background color
	 * of the Mini-Cart Contents block.
	 *
	 * We only set the background color, instead of the whole background. As
	 * we only provide the option to customize the background color.
	 */
	const style = document.createElement( 'style' );
	const backgroundColor = getComputedStyle( document.body ).backgroundColor;
	// For simplicity, we only consider the background color of the first Mini-Cart button.
	const firstMiniCartButton = document.querySelector(
		'.wc-block-mini-cart__button'
	);
	const badgeTextColor = firstMiniCartButton
		? getClosestColor( firstMiniCartButton, 'backgroundColor' )
		: 'inherit';
	const badgeBackgroundColor = firstMiniCartButton
		? getClosestColor( firstMiniCartButton, 'color' )
		: 'inherit';

	// We use :where here to reduce specificity so customized colors and theme
	// CSS take priority.
	style.appendChild(
		document.createTextNode(
			`:where(.wp-block-woocommerce-mini-cart-contents) {
				background-color: ${ backgroundColor };
			}
			:where(.wc-block-mini-cart__badge) {
				background-color: ${ badgeBackgroundColor };
				color: ${ badgeTextColor };
			}`
		)
	);

	document.head.appendChild( style );
} );

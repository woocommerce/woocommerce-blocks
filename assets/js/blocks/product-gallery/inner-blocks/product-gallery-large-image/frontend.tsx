/**
 * External dependencies
 */
import {
	store as interactivityStore,
	navigate,
} from '@woocommerce/interactivity';

type Context = {
	woocommerce: {
		styles: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'transform-origin': string;
			transform: string;
			transition: string;
		};
	};
};

type State = {
	woocommerce: {
		isProductGalleryModalOpen: boolean;
	};
};

type Store = {
	context: Context;
	selectors: typeof productButtonSelectors;
	state: State;
	ref: HTMLElement;
};

const productButtonSelectors = {
	woocommerce: {
		styles: ( { context }: Store ) => {
			const { styles } = context.woocommerce;

			return Object.entries( styles ).reduce( ( acc, [ key, value ] ) => {
				const style = `${ key }:${ value };`;
				return acc.length > 0 ? `${ acc } ${ style }` : style;
			}, '' );
		},
	},
};

interactivityStore(
	// @ts-expect-error: Store function isn't typed.
	{
		selectors: productButtonSelectors,
		actions: {
			woocommerce: {
				handleMouseMove: ( {
					event,
					context,
				}: {
					event: MouseEvent;
					context: Context;
				} ) => {
					if ( ( event.target as HTMLElement ).tagName === 'IMG' ) {
						const element = event.target as HTMLElement;
						const percentageX =
							( event.offsetX / element.clientWidth ) * 100;
						const percentageY =
							( event.offsetY / element.clientHeight ) * 100;

						context.woocommerce.styles.transform = `scale(1.3)`;

						context.woocommerce.styles[
							'transform-origin'
						] = `${ percentageX }% ${ percentageY }%`;
					}
				},
				handleMouseLeave: ( { context }: { context: Context } ) => {
					context.woocommerce.styles.transform = `scale(1.0)`;
					context.woocommerce.styles[ 'transform-origin' ] = '';
				},
				handleClick: async ( { state }: { state: State } ) => {
					if ( state.woocommerce.isProductGalleryModalOpen ) {
						return;
					}
					const dialog = document.createElement( 'dialog' );
					dialog.setAttribute(
						'data-wc-navigation-id',
						'wc-block-product-gallery-full-view'
					);
					document.body.appendChild( dialog );

					await navigate( '?product-id=10', { replace: false } );
					state.woocommerce.isProductGalleryModalOpen = true;
					dialog.showModal();
				},
			},
		},
	}
);

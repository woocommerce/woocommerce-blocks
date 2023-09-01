/**
 * External dependencies
 */
import { store as interactivityApiStore } from '@woocommerce/interactivity';

interface State {
	[ key: string ]: unknown;
}

interface Context {
	woocommerce: {
		productGallery: {
			numberOfThumbnails: number;
			activeProductGalleryImage: number;
			productGalleryImages: string[];
		};
		productGalleryThumbnailId?: number;
	};
}

interface Selectors {
	woocommerce: {
		productGallery: {
			numberOfPages: ( store: unknown ) => number;
		};
	};
}

interface Actions {
	woocommerce: {
		productGallery: {
			updateActiveProductGalleryImage: ( context: Context ) => void;
		};
	};
}

interface Effects {
	woocommerce: {
		productGallery: {
			updateProductGalleryLargeImage: (
				context: Context,
				ref: HTMLElement
			) => void;
		};
	};
}

interface Store {
	state: State;
	context?: Context;
	selectors: Selectors;
	actions: Actions;
	effects: Effects;
	ref?: HTMLElement;
}

type SelectorsStore = Pick<
	Store,
	'state' | 'context' | 'selectors' | 'actions' | 'effects' | 'ref'
>;

interactivityApiStore( {
	state: {},
	selectors: {
		woocommerce: {
			productGallery: {
				numberOfPages: ( store: SelectorsStore ) => {
					const { context } = store;

					return context.woocommerce.productGallery
						.numberOfThumbnails;
				},
			},
		},
	},
	actions: {
		woocommerce: {
			productGallery: {
				updateActiveProductGalleryImage: ( { context } ) => {
					context.woocommerce.productGallery.activeProductGalleryImage =
						context.productGalleryThumbnailId;
				},
			},
		},
	},
	effects: {
		woocommerce: {
			productGallery: {
				updateProductGalleryLargeImage: ( { context, ref } ) => {
					const activeImage =
						context.woocommerce.productGallery
							.activeProductGalleryImage;
					const activeImageMarkup =
						context.woocommerce.productGallery.productGalleryImages[
							activeImage
						];

					ref.querySelector(
						'.wp-block-woocommerce-product-gallery-large-image__image'
					).outerHTML = activeImageMarkup;
				},
			},
		},
	},
} as Store );

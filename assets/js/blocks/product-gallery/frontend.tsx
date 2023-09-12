/**
 * External dependencies
 */
import { store as interactivityApiStore } from '@woocommerce/interactivity';

interface State {
	[ key: string ]: unknown;
}

interface Context {
	isSelected: boolean;
	productGallery: {
		selectedThumbnailIndex: number;
		numberOfThumbnails: number;
		pager: {
			isSelected: boolean;
		};
	};
	woocommerce: {
		selectedImage: string;
		imageId: string;
	};
}

interface Selectors {
	productGallery: {
		getNumberOfPages: ( store: SelectorsStore ) => number;
		pager: {
			getDotFillOpacity: ( store: SelectorsStore ) => number;
		};
	};
	woocommerce: {
		isSelected: ( store: unknown ) => boolean;
	};
}

interface Actions {
	productGallery: {
		selectThumbnail: ( store: SelectorsStore ) => void;
	};
}

interface Effects {
	productGallery: {
		checkSelectedThumbnail: ( store: SelectorsStore ) => void;
	};
	woocommerce: {
		handleClick: ( context: Context ) => void;
	};
}

interface Store {
	state: State;
	context: Context;
	selectors: Selectors;
	actions: Actions;
	effects: Effects;
	ref?: HTMLElement;
}

type SelectorsStore = Pick< Store, 'context' | 'selectors' | 'ref' >;

interactivityApiStore( {
	state: {},
	selectors: {
		woocommerce: {
			isSelected: ( { context }: Store ) => {
				return (
					context?.woocommerce.selectedImage ===
					context?.woocommerce.imageId
				);
			},
			pager: {
				getDotFillOpacity( store: SelectorsStore ) {
					const { context } = store;

					return context.isSelected ? 1 : 0.2;
				},
			},
		},
	},
	actions: {
		productGallery: {
			selectThumbnail: ( store: SelectorsStore ) => {
				const { ref, context } = store;
				context.productGallery.selectedThumbnailIndex =
					ref?.attributes[ 'data-page-index' ];
			},
		},
	},
	effects: {
		productGallery: {
			checkSelectedThumbnail: ( store: SelectorsStore ) => {
				if (
					store.ref?.attributes[ 'data-page-index' ] ===
					store.context.productGallery.selectedThumbnailIndex
				) {
					store.context.isSelected = true;
				} else {
					store.context.isSelected = false;
				}
			},
		},
	},
	actions: {
		woocommerce: {
			handleClick: ( { context }: Store ) => {
				context.woocommerce.selectedImage = context.woocommerce.imageId;
			},
		},
	},
} );

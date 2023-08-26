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
}

interface Selectors {
	productGallery: {
		getNumberOfPages: ( store: SelectorsStore ) => number;
		pager: {
			getDotFillOpacity: ( store: SelectorsStore ) => number;
		};
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
}

interface Store {
	state: State;
	context: Context;
	selectors: Selectors;
	actions: Actions;
	effects: Effects;
	ref: HTMLElement;
}

type SelectorsStore = Pick< Store, 'context' | 'selectors' | 'ref' >;

interactivityApiStore( {
	selectors: {
		productGallery: {
			getNumberOfPages: ( store: SelectorsStore ) => {
				const { context } = store;

				return context.productGallery.numberOfThumbnails;
			},
			pager: {
				getDotFillOpacity( store: SelectorsStore ) {
					const { context, ref } = store;

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
					ref.attributes[ 'data-page-index' ];
			},
		},
	},
	effects: {
		productGallery: {
			checkSelectedThumbnail: ( store: SelectorsStore ) => {
				console.log( { store } );
				if (
					store.ref.attributes[ 'data-page-index' ] ===
					store.context.productGallery.selectedThumbnailIndex
				) {
					store.context.isSelected = true;
				} else {
					store.context.isSelected = false;
				}
			},
		},
	},
} as Store );

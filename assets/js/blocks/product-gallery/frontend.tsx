/**
 * External dependencies
 */
import { store as interactivityApiStore } from '@woocommerce/interactivity';

interface State {
	[ key: string ]: unknown;
}

interface Context {
	woocommerce: {
		selectedImage: string;
		imageId: string;
		visibleImagesIds: string[];
		isDialogOpen: boolean;
	};
}

interface Selectors {
	woocommerce: {
		isSelected: ( store: unknown ) => boolean;
		pagerDotFillOpacity: ( store: SelectorsStore ) => number;
		selectedImageIndex: ( store: SelectorsStore ) => number;
		isDialogOpen: ( store: unknown ) => boolean;
	};
}

interface Actions {
	woocommerce: {
		thumbnails: {
			handleClick: ( context: Context ) => void;
		};
		handlePreviousImageButtonClick: {
			( store: Store ): void;
		};
		handleNextImageButtonClick: {
			( store: Store ): void;
		};
	};
}

interface Store {
	state: State;
	context: Context;
	selectors: Selectors;
	actions: Actions;
	ref?: HTMLElement;
}

interface Event {
	keyCode: number;
}

type SelectorsStore = Pick< Store, 'context' | 'selectors' | 'ref' >;

interactivityApiStore( {
	state: {},
	effects: {
		woocommerce: {
			keyboardAccess: ( store: Store ) => {
				const { context, actions } = store;
				let allowNavigation = true;

				const handleKeyEvents = ( event: Event ) => {
					if (
						! allowNavigation ||
						! context.woocommerce.isDialogOpen
					) {
						return;
					}

					// Disable navigation for a brief period to prevent spamming
					allowNavigation = false;

					setTimeout( () => {
						allowNavigation = true;
					}, 300 );

					// Check if the esc key is pressed.
					if ( event.keyCode === 27 ) {
						context.woocommerce.isDialogOpen = false;
					}

					// Check if left arrow key is pressed.
					if ( event.keyCode === 37 ) {
						actions.woocommerce.handlePreviousImageButtonClick(
							store
						);
					}

					// Check if right arrow key is pressed.
					if ( event.keyCode === 39 ) {
						actions.woocommerce.handleNextImageButtonClick( store );
					}
				};

				document.addEventListener( 'keydown', handleKeyEvents );
			},
		},
	},
	selectors: {
		woocommerce: {
			isSelected: ( { context }: Store ) => {
				return (
					context?.woocommerce.selectedImage ===
					context?.woocommerce.imageId
				);
			},
			pagerDotFillOpacity( store: SelectorsStore ) {
				const { context } = store;

				return context?.woocommerce.selectedImage ===
					context?.woocommerce.imageId
					? 1
					: 0.2;
			},
			isDialogOpen: ( { context }: Store ) => {
				return context.woocommerce.isDialogOpen;
			},
		},
	},
	actions: {
		woocommerce: {
			thumbnails: {
				handleClick: ( { context }: Store ) => {
					context.woocommerce.selectedImage =
						context.woocommerce.imageId;
				},
			},
			dialog: {
				handleCloseButtonClick: ( { context }: Store ) => {
					context.woocommerce.isDialogOpen = false;
				},
			},
			handleSelectImage: ( { context }: Store ) => {
				context.woocommerce.selectedImage = context.woocommerce.imageId;
			},
			handleNextImageButtonClick: ( store: Store ) => {
				const { context } = store;
				const selectedImageIdIndex =
					context.woocommerce.visibleImagesIds.indexOf(
						context.woocommerce.selectedImage
					);
				const nextImageIndex = Math.min(
					selectedImageIdIndex + 1,
					context.woocommerce.visibleImagesIds.length - 1
				);

				context.woocommerce.selectedImage =
					context.woocommerce.visibleImagesIds[ nextImageIndex ];
			},
			handlePreviousImageButtonClick: ( store: Store ) => {
				const { context } = store;
				const selectedImageIdIndex =
					context.woocommerce.visibleImagesIds.indexOf(
						context.woocommerce.selectedImage
					);
				const previousImageIndex = Math.max(
					selectedImageIdIndex - 1,
					0
				);
				context.woocommerce.selectedImage =
					context.woocommerce.visibleImagesIds[ previousImageIndex ];
			},
		},
	},
} );

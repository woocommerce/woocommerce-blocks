/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';

export interface ProductGalleryContext {
	selectedImage: string;
	imageId: string;
	visibleImagesIds: string[];
	dialogVisibleImagesIds: string[];
	isDialogOpen: boolean;
	productId: string;
}

interface Event {
	keyCode: number;
}

enum Keys {
	ESC = 27,
	LEFT_ARROW = 37,
	RIGHT_ARROW = 39,
}

const getContext = ( ns?: string ) =>
	getContextFn< ProductGalleryContext >( ns );

const selectImage = (
	context: ProductGalleryContext,
	select: 'next' | 'previous'
) => {
	const imagesIds =
		context[
			context.isDialogOpen ? 'dialogVisibleImagesIds' : 'visibleImagesIds'
		];
	const selectedImageIdIndex = imagesIds.indexOf( context.selectedImage );
	const nextImageIndex =
		select === 'next'
			? Math.min( selectedImageIdIndex + 1, imagesIds.length - 1 )
			: Math.max( selectedImageIdIndex - 1, 0 );
	context.selectedImage = imagesIds[ nextImageIndex ];
};

const productGallery = {
	state: {
		get isSelected() {
			const { selectedImage, imageId } = getContext();
			return selectedImage === imageId;
		},
		get pagerDotFillOpacity() {
			return state.isSelected ? 1 : 0.2;
		},
	},
	actions: {
		closeDialog: () => {
			const context = getContext();
			context.isDialogOpen = false;
		},
		openDialog: () => {
			const context = getContext();
			context.isDialogOpen = true;
		},
		selectImage: () => {
			const context = getContext();
			context.selectedImage = context.imageId;
		},
		selectNextImage: ( event: MouseEvent ) => {
			event.stopPropagation();
			const context = getContext();
			selectImage( context, 'next' );
		},
		selectPreviousImage: ( event: MouseEvent ) => {
			event.stopPropagation();
			const context = getContext();
			selectImage( context, 'previous' );
		},
	},
	callbacks: {
		watchForChangesOnAddToCartForm: () => {
			const context = getContext();
			const variableProductCartForm = document.querySelector(
				`form[data-product_id="${ context.productId }"]`
			);

			if ( ! variableProductCartForm ) {
				return;
			}

			// TODO: Replace with an interactive block that calls `actions.selectImage`.
			const observer = new MutationObserver( function ( mutations ) {
				for ( const mutation of mutations ) {
					const mutationTarget = mutation.target as HTMLElement;
					const currentImageAttribute =
						mutationTarget.getAttribute( 'current-image' );
					if (
						mutation.type === 'attributes' &&
						currentImageAttribute &&
						context.visibleImagesIds.includes(
							currentImageAttribute
						)
					) {
						context.selectedImage = currentImageAttribute;
					}
				}
			} );

			observer.observe( variableProductCartForm, {
				attributes: true,
			} );

			return () => {
				observer.disconnect();
			};
		},
		keyboardAccess: () => {
			const context = getContext();
			let allowNavigation = true;

			const handleKeyEvents = ( event: Event ) => {
				if ( ! allowNavigation || ! context.isDialogOpen ) {
					return;
				}

				// Disable navigation for a brief period to prevent spamming.
				allowNavigation = false;

				requestAnimationFrame( () => {
					allowNavigation = true;
				} );

				// Check if the esc key is pressed.
				if ( event.keyCode === Keys.ESC ) {
					context.isDialogOpen = false;
				}

				// Check if left arrow key is pressed.
				if ( event.keyCode === Keys.LEFT_ARROW ) {
					selectImage( context, 'previous' );
				}

				// Check if right arrow key is pressed.
				if ( event.keyCode === Keys.RIGHT_ARROW ) {
					selectImage( context, 'next' );
				}
			};

			document.addEventListener( 'keydown', handleKeyEvents );

			return () =>
				document.removeEventListener( 'keydown', handleKeyEvents );
		},
	},
};

const { state } = store( 'woocommerce/product-gallery', productGallery );

export type ProductGallery = typeof productGallery;

/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';

interface Context {
	selectedImage: string;
	imageId: string;
	isDialogOpen: boolean;
}

const getContext = ( ns?: string ) => getContextFn< Context >( ns );

store( 'woocommerce', {
	state: {
		get isSelected() {
			const { selectedImage, imageId } = getContext();
			return selectedImage === imageId;
		},
		get pagerDotFillOpacity() {
			const { selectedImage, imageId } = getContext();

			return selectedImage === imageId ? 1 : 0.2;
		},
		get isDialogOpen() {
			const { isDialogOpen } = getContext();
			return isDialogOpen;
		},
	},
	actions: {
		thumbnails: {
			handleClick: () => {
				const context = getContext();
				context.selectedImage = context.imageId;
			},
		},
		handleSelectImage: () => {
			const context = getContext();
			context.selectedImage = context.imageId;
		},
	},
} );

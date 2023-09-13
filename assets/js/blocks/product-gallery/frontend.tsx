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
	};
}

interface Selectors {
	woocommerce: {
		isSelected: ( store: unknown ) => boolean;
		pagerDotFillOpacity: ( store: SelectorsStore ) => number;
		selectedImageIndex: ( store: SelectorsStore ) => number;
	};
}

interface Actions {
	woocommerce: {
		handleClick: ( context: Context ) => void;
	};
}

interface Store {
	state: State;
	context: Context;
	selectors: Selectors;
	actions: Actions;
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
			pagerDotFillOpacity( store: SelectorsStore ) {
				const { context } = store;

				return context?.woocommerce.selectedImage ===
					context?.woocommerce.imageId
					? 1
					: 0.2;
			},
		},
	},
	actions: {
		woocommerce: {
			handleClick: ( { context }: Store ) => {
				context.woocommerce.selectedImage = context.woocommerce.imageId;
			},
			onNextImageButtonClick: ( store: Store ) => {
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
			onPreviousImageButtonClick: ( store: Store ) => {
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

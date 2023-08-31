/**
 * External dependencies
 */
import { store as interactivityStore } from '@woocommerce/interactivity';

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

type Store = {
	context: Context;
	selectors: typeof productButtonSelectors;
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
				handleMouseMove: async ( {
					event,
					context,
				}: {
					event: MouseEvent;
					context: Context;
				} ) => {
					if ( ( event.target as HTMLElement ).tagName === 'IMG' ) {
						const element = event.target as HTMLElement;
						const left = element.offsetLeft;
						const top = element.offsetTop;
						const width = element.clientWidth;
						const height = element.clientHeight;

						const offsetX = event.clientX - left;
						const offsetY = event.clientY - top;

						const percentageX = ( offsetX / width ) * 100;
						const percentageY = ( offsetY / height ) * 100;

						const maxPercentageX =
							percentageX > 100 ? 100 : percentageX;
						const maxPercentageY =
							percentageY > 100 ? 100 : percentageY;

						context.woocommerce.styles.transform = `scale(1.3)`;

						context.woocommerce.styles[
							'transform-origin'
						] = `${ maxPercentageX }% ${ maxPercentageY }%`;
					}
				},
				handleMouseLeave: async ( {
					context,
				}: {
					context: Context;
				} ) => {
					context.woocommerce.styles.transform = `scale(1.0)`;
					context.woocommerce.styles[ 'transform-origin' ] = '';
				},
			},
		},
	}
);

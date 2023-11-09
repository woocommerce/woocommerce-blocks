/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';

type Context = {
	styles: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'transform-origin': string;
		transform: string;
		transition: string;
	};
	isDialogOpen: boolean;
};

const getContext = ( ns?: string ) => getContextFn< Context >( ns );

store( 'woocommerce', {
	state: {
		get styles() {
			const { styles } = getContext();

			return Object.entries( styles ).reduce( ( acc, [ key, value ] ) => {
				const style = `${ key }:${ value };`;
				return acc.length > 0 ? `${ acc } ${ style }` : style;
			}, '' );
		},
	},
	actions: {
		handleMouseMove: ( event: MouseEvent ) => {
			const context = getContext();
			if ( ( event.target as HTMLElement ).tagName === 'IMG' ) {
				const element = event.target as HTMLElement;
				const percentageX =
					( event.offsetX / element.clientWidth ) * 100;
				const percentageY =
					( event.offsetY / element.clientHeight ) * 100;

				context.styles.transform = `scale(1.3)`;

				context.styles[
					'transform-origin'
				] = `${ percentageX }% ${ percentageY }%`;
			}
		},
		handleMouseLeave: () => {
			const context = getContext();
			context.styles.transform = `scale(1.0)`;
			context.styles[ 'transform-origin' ] = '';
		},
		handleClick: () => {
			const context = getContext();
			context.isDialogOpen = true;
		},
	},
} );

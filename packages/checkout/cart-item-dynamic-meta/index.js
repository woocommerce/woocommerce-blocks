/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import { Children, cloneElement, useEffect } from '@wordpress/element';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';
const components = [];

function CartItemDynamicMeta( { FillComponent } ) {
	useEffect(() => {
		console.log( 'create CartItemDynamicMeta' );
		return () => {
			console.log( 'destroy CartItemDynamicMeta' );
		};
	  }, []);
	return (
		<FillComponent>
			{ ( fillProps ) => {
				console.log( 'fill', fillProps );
				return Children.map( components, ( fill ) => {
					return (
						<BlockErrorBoundary
							renderError={
								CURRENT_USER_IS_ADMIN ? null : () => null
							}
						>
							{ cloneElement( fill, fillProps ) }
						</BlockErrorBoundary>
					);
				} );
			} }
		</FillComponent>
	);
}

function SlotProvider( { SlotComponent, className, extensions } ) {
	console.log('slot');
	return (
		<SlotComponent
			bubblesVirtually
			className={ classnames(
				className,
				'wc-block-components-cart-item-dynamic-meta'
			) }
			fillProps={ extensions }
		/>
	);
}

export function ExperimentalCartItemMeta( { children } ) {
	useEffect(() => {
		if ( Array.isArray( children ) ) {
			components.push( ...children );
		} else {
			components.push( children );
		}
		console.log( 'create' );
		return () => {
			components.length = 0;
			console.log( 'destroy' );
		};
	  }, []);
	return null;
}

const ExperimentalCartItemDynamicMeta = ( { slotName, extensions, className = '' } ) => {
	if ( slotName === '' ) {
		return null;
	}
	console.log( {slotName, extensions});
	const { Fill, Slot } = createSlotFill( slotName );

	return (
		<>
			<CartItemDynamicMeta FillComponent={ Fill }/>
			<SlotProvider 
				className={ className }
				SlotComponent={ Slot }
				extensions={ extensions }/>
		</>
	)
}

export default ExperimentalCartItemDynamicMeta;

/**
 * External dependencies
 */
import { createSlotFill } from 'wordpress-components';
import {
	Children,
	cloneElement,
	useEffect,
	useState,
} from '@wordpress/element';
import classnames from 'classnames';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { uniqueId } from 'lodash';
/**
 * Internal dependencies
 */
import BlockErrorBoundary from '../error-boundary';
import ProductBadge from '../../../assets/js/base/components/cart-checkout/product-badge';

const componentsRegistry = {};

function getAllComponentsFromRegistry() {
	return Object.values( componentsRegistry ).flat();
}

/**
 * Component responsible for registering the 3rd party integration components.
 * 
 * @param {Array[Object]|Object} children Items to render inside the slot.
 */
const ExperimentalCartItemMeta = ( { children } ) => {
	const [ id ] = useState( uniqueId( 'cart-item-meta-' ) );
	useEffect( () => {
		if ( Array.isArray( children ) ) {
			componentsRegistry[ id ] = children;
		} else {
			componentsRegistry[ id ] = [ children ];
		}
		return () => {
			componentsRegistry[ id ].length = 0;
		};
	}, [] );
	return null;
};

/**
 * This component is used as a child of ExperimentalCartItemMeta.
 * It is the only component type that will be allowed to render.
 * 
 * It functions using a badgeCallback that receives all the remaining props.
 * The callback needs to return an object that has className to style the badge
 * and the text that will be used to display the text inside the badge.
 * 
 */
const BadgeGenerator = ( { badgeCallback, ...props } ) => {
	if ( ! ( typeof badgeCallback === 'function' ) ) {
		return null;
	}
	const badgeParameters = badgeCallback( props );
	if ( badgeParameters === null ) {
		return null;
	}
	return (
		<ProductBadge className={ badgeParameters?.className }>
			{ badgeParameters?.text }
		</ProductBadge>
	);
};

ExperimentalCartItemMeta.BadgeGenerator = BadgeGenerator;

/**
 * This component is a slotFill generator. It generate both the Slot and the Fill component and renders them.
 * Fill component is automatically populated with the components in the registry.
 * Each instance of ExperimentalCartItemDynamicMeta will receive all of the components currently registered
 * inside the componentsRegistry. Each instance will pass to the components distinct set of props. This allows
 * to components to render different information for each ExperimentalCartItemDynamicMeta instance.
 * This pattern allows dynamic instantiation of multiple dynamic slot fills.
 *  
 */
const ExperimentalCartItemDynamicMeta = ( {
	slotName,
	extensions,
	className = '',
} ) => {
	if ( slotName === '' ) {
		return null;
	}
	const { Fill, Slot } = createSlotFill( slotName );
	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-cart-item-dynamic-meta'
			) }
		>
			{ /*<CartItemDynamicMeta FillComponent={ Fill } /> */ }
			<Slot fillProps={ extensions } />
			<Fill>
				{ ( fillProps ) => {
					return Children.map(
						getAllComponentsFromRegistry(),
						( fill ) => {
							/**
							 * If we disable this check we open the Slot for any component type not just
							 * the Badge we are generating in BadgeGenerator.
							 */
							if (
								! (
									fill.type ===
									ExperimentalCartItemMeta.BadgeGenerator
								)
							) {
								return null; // Fail silently.
							}
							return (
								<BlockErrorBoundary
									renderError={
										CURRENT_USER_IS_ADMIN
											? null
											: () => null
									}
								>
									{ cloneElement( fill, fillProps ) }
								</BlockErrorBoundary>
							);
						}
					);
				} }
			</Fill>
		</div>
	);
};

export { ExperimentalCartItemMeta };
export default ExperimentalCartItemDynamicMeta;

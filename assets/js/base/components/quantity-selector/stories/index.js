/**
 * Internal dependencies
 */
import QuantitySelector from '../';
import './style.scss';

export default {
	title: 'WooCommerce Blocks/@base-components/QuantitySelector',
	component: QuantitySelector,
};

export const Default = () => (
	<QuantitySelector itemName='widgets'></QuantitySelector>
);

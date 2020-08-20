/**
 * External dependencies
 */
import { text, select } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import * as components from '../';

export default {
	title: 'WooCommerce Blocks/@base-components/Chip',
	component: Chip,
};

const radii = [ 'none', 'small', 'medium', 'large' ];

export const Chip = () => (
	<components.Chip
		text={ text( 'Text', 'example' ) }
		radius={ select( 'Radius', radii ) }
	/>
);

export const RemovableChip = () => (
	<components.RemovableChip
		text={ text( 'Text', 'example' ) }
		radius={ select( 'Radius', radii ) }
	/>
);

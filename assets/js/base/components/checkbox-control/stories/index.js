/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import Component from '../';

export default {
	title: 'WooCommerce Blocks/@base-components/CheckboxControl',
	component: CheckboxControl,
};

export const CheckboxControl = () => {
	const [ checked, setChecked ] = useState( false );

	return (
		<Component
			label={ text( 'Label', 'Yes please' ) }
			checked={ checked }
			onChange={ ( value ) => setChecked( value ) }
		/>
	);
};

/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '@woocommerce/base-components/combobox';

describe( 'ComboBox', () => {
	const options = [
		{ value: 'AA', label: 'A value A' },
		{ value: 'BB', label: 'B value B' },
		{ value: 'CC', label: 'C value C' },
		{ value: 'DD', label: 'D value D' },
		{ value: 'EE', label: 'E value E' },
		{ value: 'FF', label: 'F value F' },
	];

	beforeEach( () => {
		jest.resetAllMocks();
	} );

	it( 'calls onChange as soon as a value is changed if requireExactMatch is false or undefined', async () => {
		const onChange = jest.fn();
		const label = 'combo-box';
		render(
			<Combobox
				options={ options }
				value=""
				onChange={ onChange }
				label={ label }
			/>
		);
		const input = await screen.findByLabelText( label );
		await userEvent.type( input, 'A ' );
		expect( onChange ).toHaveBeenCalledWith( 'AA' );
	} );

	it( 'calls onChange only when the value is equal to one of the options when requireExactMatch is true', async () => {
		const onChange = jest.fn();
		const label = 'combo-box';
		render(
			<Combobox
				options={ options }
				value=""
				onChange={ onChange }
				label={ label }
				requireExactMatch={ true }
			/>
		);
		const input = await screen.findByLabelText( label );
		await userEvent.type( input, 'B ' );
		expect( onChange ).not.toHaveBeenCalled();
		await userEvent.type( input, 'value B' );
		expect( onChange ).toHaveBeenCalledWith( 'BB' );
	} );
} );

/**
 * External dependencies
 */
import { act, render, screen } from '@testing-library/react';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';
import { dispatch, select } from '@wordpress/data';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import { __ValidatedTexInputWithoutId as ValidatedTextInput } from '../validated-text-input';

describe( 'ValidatedTextInput', () => {
	it( 'Hides related validation error on change', async () => {
		render(
			<ValidatedTextInput
				instanceId={ '0' }
				accept={ 'image/*' }
				onChange={ () => void 0 }
				value={ 'Test' }
				id={ 'test-input' }
				label={ 'Test Input' }
			/>
		);

		await act( () =>
			dispatch( VALIDATION_STORE_KEY ).setValidationErrors( {
				'test-input': {
					message: 'Error message',
					hidden: false,
				},
			} )
		);
		const textInputElement = await screen.getByLabelText( 'Test Input' );
		await userEvent.type( textInputElement, 'New value' );
		await expect(
			select( VALIDATION_STORE_KEY ).getValidationError( 'test-input' )
				.hidden
		).toBe( true );
	} );
	it( 'Hides related validation error on change when id is not specified', async () => {
		render(
			<ValidatedTextInput
				instanceId={ '1' }
				accept={ 'image/*' }
				onChange={ () => void 0 }
				value={ 'Test' }
				label={ 'Test Input' }
			/>
		);

		await act( () =>
			dispatch( VALIDATION_STORE_KEY ).setValidationErrors( {
				'textinput-1': {
					message: 'Error message',
					hidden: false,
				},
			} )
		);
		const textInputElement = await screen.getByLabelText( 'Test Input' );
		await userEvent.type( textInputElement, 'New value' );
		await expect(
			select( VALIDATION_STORE_KEY ).getValidationError( 'textinput-1' )
				.hidden
		).toBe( true );
	} );
	it( 'Displays a passed error message', async () => {
		render(
			<ValidatedTextInput
				instanceId={ '2' }
				accept={ 'image/*' }
				onChange={ () => void 0 }
				value={ 'Test' }
				label={ 'Test Input' }
				errorMessage={ 'Custom error message' }
			/>
		);
		await act( () =>
			dispatch( VALIDATION_STORE_KEY ).setValidationErrors( {
				'textinput-2': {
					message: 'Error message in data store',
					hidden: false,
				},
			} )
		);
		const customErrorMessageElement = await screen.getByText(
			'Custom error message'
		);
		expect(
			screen.queryByText( 'Error message in data store' )
		).not.toBeInTheDocument();
		await expect( customErrorMessageElement ).toBeInTheDocument();
	} );
	it( 'Displays an error message from the data store', async () => {
		render(
			<ValidatedTextInput
				instanceId={ '3' }
				accept={ 'image/*' }
				onChange={ () => void 0 }
				value={ 'Test' }
				label={ 'Test Input' }
			/>
		);
		await act( () =>
			dispatch( VALIDATION_STORE_KEY ).setValidationErrors( {
				'textinput-3': {
					message: 'Error message 3',
					hidden: false,
				},
			} )
		);
		const errorMessageElement = await screen.getByText( 'Error message 3' );
		await expect( errorMessageElement ).toBeInTheDocument();
	} );
} );

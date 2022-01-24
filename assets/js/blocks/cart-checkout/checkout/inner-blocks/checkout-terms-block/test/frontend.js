/**
 * External dependencies
 */
import { render, findByLabelText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import FrontendBlock from '../frontend';

describe( 'FrontendBlock', () => {
	let validationData = {
		hasValidationErrors: false,
		getValidationError: jest.fn(),
		clearValidationError: jest.fn(),
		hideValidationError: jest.fn(),
		setValidationErrors: jest.fn(),
	};
	beforeEach( () => {
		validationData = {
			hasValidationErrors: false,
			getValidationError: jest.fn(),
			clearValidationError: jest.fn(),
			hideValidationError: jest.fn(),
			setValidationErrors: jest.fn(),
		};
	} );

	it( "Renders a checkbox if the checkbox prop is passed and doesn't if it's not.", async () => {
		const { container, rerender } = render(
			<FrontendBlock
				checkbox={ true }
				text={ 'I agree to the terms and conditions' }
				validation={ validationData }
			/>
		);

		const checkbox = await findByLabelText(
			container,
			'I agree to the terms and conditions'
		);

		expect( checkbox ).toBeTruthy();
		expect( checkbox.getAttribute( 'type' ) ).toEqual( 'checkbox' );

		rerender(
			<FrontendBlock
				checkbox={ true }
				text={ 'I agree to the terms and conditions' }
				validation={ validationData }
			/>
		);
		const textOnly = await screen.findByLabelText(
			'I agree to the terms and conditions'
		);
		expect( textOnly.tagName ).not.toEqual( 'input' );
	} );

	it( 'Clears any validation errors when the checkbox is checked', async () => {
		validationData.getValidationError.mockImplementation( () => {
			return {
				message: 'Please read and accept the terms and conditions.',
				hidden: false,
			};
		} );
		const { container } = render(
			<FrontendBlock
				checkbox={ true }
				text={ 'I agree to the terms and conditions' }
				validation={ validationData }
			/>
		);
		const checkbox = await findByLabelText(
			container,
			'I agree to the terms and conditions'
		);
		userEvent.click( checkbox );
		expect( validationData.clearValidationError ).toHaveBeenLastCalledWith(
			expect.stringMatching( /terms-and-conditions-\d/ )
		);
	} );
} );

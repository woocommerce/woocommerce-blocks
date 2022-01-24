/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Block from '../edit';

jest.mock( '../constants', () => ( {
	get termsConsentDefaultText() {
		return 'test'; // set some default value
	},
} ) );

describe( 'Edit', () => {
	it( 'Renders', () => {
		//	jest.mock( './constants', () => mockTrue );

		const { container, debug } = render(
			<Block
				attributes={ { text: '111', checkbox: true } }
				setAttributes={ () => {} }
			/>
		);
		console.log( debug( container ) );
	} );
} );

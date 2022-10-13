/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import * as hooks from '@woocommerce/base-context/hooks';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import {
	setWindowUrl,
	stubProductsAttributesTerms,
	stubCollectionData,
} from './test-utils';
import AttributeFilterBlock from '../block';
import { BlockAttributes } from '../types';

jest.mock( '@woocommerce/base-context/hooks', () => ( {
	__esModule: true,
	...jest.requireActual( '@woocommerce/base-context/hooks' ),
} ) );

interface SetupParams {
	initialUrl: string;
}

const setup = ( params: SetupParams ) => {
	const setupParams: SetupParams = {
		initialUrl: params.initialUrl || 'https://woo.local',
	};
	const url =
		setupParams.initialUrl ||
		'http://woo.local/?filter_size=large&query_type_size=or';
	setWindowUrl( { url } );

	const attributes: BlockAttributes = {
		attributeId: 2,
		showCounts: true,
		queryType: 'or',
		heading: 'Size',
		headingLevel: 3,
		displayStyle: 'list',
		showFilterButton: true,
		selectType: 'single',
		isPreview: false,
	};
	jest.spyOn( hooks, 'useCollection' ).mockReturnValue( {
		results: stubProductsAttributesTerms(),
		isLoading: false,
	} );

	jest.spyOn( hooks, 'useCollectionData' ).mockReturnValue( {
		results: stubCollectionData(),
		isLoading: false,
	} );
	const utils = render( <AttributeFilterBlock attributes={ attributes } /> );
	const applyButton = screen.getByRole( 'button', { name: /apply/i } );
	const smallAttributeCheckbox = screen.getByRole( 'checkbox', {
		name: /small/i,
	} );

	return {
		...utils,
		applyButton,
		smallAttributeCheckbox,
	};
};

const setupWithSelectedFilterAttributes = () => {
	const utils = setup( {
		initialUrl: 'http://woo.local/?filter_size=large&query_type_size=or',
	} );

	return {
		...utils,
	};
};

const setupWithoutSelectedFilterAttributes = () => {
	const utils = setup( { initialUrl: 'http://woo.local/' } );

	return {
		...utils,
	};
};

describe( 'AttributeFilterBlock', () => {
	describe( 'Given no filter attribute is selected when page loads', () => {
		test( 'should disable Apply button when page loads', () => {
			const { applyButton } = setupWithoutSelectedFilterAttributes();

			expect( applyButton ).toBeDisabled();
		} );

		test( 'should enable Apply button when filter attributes are changed', () => {
			const { applyButton, smallAttributeCheckbox } =
				setupWithoutSelectedFilterAttributes();
			userEvent.click( smallAttributeCheckbox );

			expect( applyButton ).not.toBeDisabled();
		} );
	} );

	describe( 'Given filter attribute is already selected when page loads', () => {
		test( 'should disable Apply button when page loads', () => {
			const { applyButton } = setupWithSelectedFilterAttributes();

			expect( applyButton ).toBeDisabled();
		} );

		test( 'should enable Apply button when filter attributes are changed', () => {
			const { applyButton, smallAttributeCheckbox } =
				setupWithSelectedFilterAttributes();
			userEvent.click( smallAttributeCheckbox );

			expect( applyButton ).not.toBeDisabled();
		} );

		test( 'should disable Apply button when deselecting the same previously selected attribute', () => {
			const { applyButton, smallAttributeCheckbox } =
				setupWithSelectedFilterAttributes();
			userEvent.click( smallAttributeCheckbox );
			expect( applyButton ).not.toBeDisabled();

			userEvent.click( smallAttributeCheckbox );
			expect( applyButton ).toBeDisabled();
		} );
	} );
} );

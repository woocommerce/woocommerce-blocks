/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import withAttributes from '../with-attributes';
import * as mockUtils from '../../components/utils';
import * as mockBaseUtils from '../../base/utils/errors';

jest.mock( '../../components/utils', () => ( {
	getAttributes: jest.fn(),
	getTerms: jest.fn(),
} ) );

jest.mock( '../../base/utils/errors', () => ( {
	formatError: jest.fn(),
} ) );

jest.mock( 'lodash', () => ( {
	...jest.requireActual( 'lodash' ),
	debounce: ( func ) => func,
} ) );

const mockAttributes = [ { id: 1, name: 'Color', slug: 'color' }, { id: 2, name: 'Size', slug: 'size' } ];
const mockAttributesWithParent = [ { id: 1, name: 'Color', slug: 'color', parent: 0 }, { id: 2, name: 'Size', slug: 'size', parent: 0 } ];
const selected = [ { id: 11, attr_slug: 'color' } ];
const TestComponent = withAttributes( ( props ) => {
	return <div
		attributes={ props.attributes }
		error={ props.error }
		expandedAttribute={ props.expandedAttribute }
		onExpandAttribute={ props.onExpandAttribute }
		isLoading={ props.isLoading }
		termsAreLoading={ props.termsAreLoading }
		termsList={ props.termsList }
	/>;
} );

describe( 'withAttributes Component', () => {
	afterEach( () => {
		mockUtils.getAttributes.mockReset();
		mockUtils.getTerms.mockReset();
		mockBaseUtils.formatError.mockReset();
	} );

	describe( 'lifecycle events', () => {
		let getAttributesPromise;
		let testComponent;

		beforeEach( () => {
			getAttributesPromise = Promise.resolve( mockAttributes );
			mockUtils.getAttributes.mockImplementation(
				() => getAttributesPromise
			);
			mockUtils.getTerms.mockImplementation(
				() => Promise.resolve()
			);
		} );

		it( 'getAttributes is called on mount', () => {
			testComponent = shallow( <TestComponent /> );
			const { getAttributes } = mockUtils;

			expect( getAttributes ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'getTerms is called on component update', () => {
			testComponent = shallow( <TestComponent /> );
			const { onExpandAttribute } = testComponent.props();

			onExpandAttribute( 1 );

			const element = testComponent.getElement();
			const { getTerms } = mockUtils;

			expect( getTerms ).toHaveBeenCalledWith( 1 );
			expect( getTerms ).toHaveBeenCalledTimes( 1 );
			expect( element.props.expandedAttribute ).toBe( 1 );
		} );

		it( 'getTerms is called on mount if there was an attribute selected', ( done ) => {
			testComponent = shallow( <TestComponent selected={ selected } /> );

			getAttributesPromise.then( () => {
				const { getTerms } = mockUtils;

				expect( getTerms ).toHaveBeenCalledWith( 1 );
				expect( getTerms ).toHaveBeenCalledTimes( 1 );
				expect( testComponent.state( 'expandedAttribute' ) ).toBe( 1 );
				done();
			} );
		} );
	} );

	describe( 'when the API returns attributes data', () => {
		let testComponent;

		beforeEach( () => {
			mockUtils.getAttributes.mockImplementation(
				() => Promise.resolve( mockAttributes )
			);
			testComponent = shallow( <TestComponent /> );
		} );

		it( 'sets the attributes props', () => {
			const element = testComponent.getElement();

			expect( element.props.error ).toBeNull();
			expect( element.props.isLoading ).toBe( false );
			expect( element.props.attributes ).toEqual( mockAttributesWithParent );
		} );
	} );

	describe( 'when the API returns an error', () => {
		const error = { message: 'There was an error.' };
		const getAttributesPromise = Promise.reject( error );
		const formattedError = { message: 'There was an error.', type: 'api' };
		let testComponent;

		beforeEach( () => {
			mockUtils.getAttributes.mockImplementation(
				() => getAttributesPromise
			);
			mockBaseUtils.formatError.mockImplementation(
				() => formattedError,
			);
			testComponent = shallow( <TestComponent /> );
		} );

		it( 'sets the error prop', ( done ) => {
			const { formatError } = mockBaseUtils;
			getAttributesPromise.catch( () => {
				const element = testComponent.getElement();

				expect( formatError ).toHaveBeenCalledWith( error );
				expect( formatError ).toHaveBeenCalledTimes( 1 );
				expect( element.props.error ).toEqual( formattedError );
				expect( element.props.isLoading ).toBe( false );
				expect( element.props.attributes ).toEqual( [] );

				done();
			} );
		} );
	} );
} );

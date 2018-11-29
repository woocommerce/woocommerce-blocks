/**
 * Internal dependencies
 */
import { buildTermsTree } from '../hierarchy';

describe( 'buildTermsTree', () => {
	test( 'should return an empty array on empty input', () => {
		const tree = buildTermsTree( [] );
		expect( tree ).toEqual( [] );
	} );

	test( 'should return a tree of items', () => {
		const items = [
			{ id: 1, name: 'Apricots', parent: 0 },
			{ id: 2, name: 'Clementine', parent: 0 },
			{ id: 3, name: 'Elderberry', parent: 2 },
			{ id: 4, name: 'Guava', parent: 2 },
			{ id: 5, name: 'Lychee', parent: 3 },
			{ id: 6, name: 'Mulberry', parent: 0 },
		];
		const tree = buildTermsTree( items );
		expect( tree ).toEqual( [
			{ id: 1, name: 'Apricots', parent: 0, children: [] },
			{
				id: 2,
				name: 'Clementine',
				parent: 0,
				children: [
					{
						id: 3,
						name: 'Elderberry',
						parent: 2,
						children: [ { id: 5, name: 'Lychee', parent: 3, children: [] } ],
					},
					{ id: 4, name: 'Guava', parent: 2, children: [] },
				],
			},
			{ id: 6, name: 'Mulberry', parent: 0, children: [] },
		] );
	} );

	test( 'should return a tree of items, with orphan categories appended to the end', () => {
		const items = [
			{ id: 1, name: 'Apricots', parent: 0 },
			{ id: 2, name: 'Clementine', parent: 0 },
			{ id: 4, name: 'Guava', parent: 2 },
			{ id: 5, name: 'Lychee', parent: 3 },
			{ id: 6, name: 'Mulberry', parent: 0 },
		];
		const tree = buildTermsTree( items );
		expect( tree ).toEqual( [
			{ id: 1, name: 'Apricots', parent: 0, children: [] },
			{
				id: 2,
				name: 'Clementine',
				parent: 0,
				children: [ { id: 4, name: 'Guava', parent: 2, children: [] } ],
			},
			{ id: 6, name: 'Mulberry', parent: 0, children: [] },
			{ id: 5, name: 'Lychee', parent: 3, children: [] },
		] );
	} );

	test( 'should return a tree of items, with orphan categories appended to the end, with children of thier own', () => {
		const items = [
			{ id: 1, name: 'Apricots', parent: 0 },
			{ id: 3, name: 'Elderberry', parent: 2 },
			{ id: 4, name: 'Guava', parent: 2 },
			{ id: 5, name: 'Lychee', parent: 3 },
			{ id: 6, name: 'Mulberry', parent: 0 },
		];
		const tree = buildTermsTree( items );
		expect( tree ).toEqual( [
			{ id: 1, name: 'Apricots', parent: 0, children: [] },
			{ id: 6, name: 'Mulberry', parent: 0, children: [] },
			{
				id: 3,
				name: 'Elderberry',
				parent: 2,
				children: [ { id: 5, name: 'Lychee', parent: 3, children: [] } ],
			},
			{ id: 4, name: 'Guava', parent: 2, children: [] },
		] );
	} );
} );

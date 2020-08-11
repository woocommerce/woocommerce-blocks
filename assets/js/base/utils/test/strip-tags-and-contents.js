/**
 * Internal dependencies
 */
import { stripTagsAndContents } from '../strip-tags-and-contents';

describe( 'stripTagsAndContents', () => {
	test.each`
		entry                                                            | expected
		${'Hello world!'}                                                | ${'Hello world!'}
		${'<a href="https://www.woocommerce.com/">Hello</a> world!'}     | ${' world!'}
		${'<a href="https://www.woocommerce.com/">Hello</a> w<br>orld!'} | ${' world!'}
	`(
		'correctly formats price given "$value", "$prefix" prefix, and "$suffix" suffix',
		( { entry, expected } ) => {
			const strippedText = stripTagsAndContents( entry );

			expect( strippedText ).toEqual( expected );
		}
	);
} );

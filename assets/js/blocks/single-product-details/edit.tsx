/**
 * External dependencies
 */
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
import { Attributes } from './types';
import './editor.scss';

const Edit = ( { attributes, ...rest }: BlockEditProps< Attributes > ) => {
	console.log( { attributes } );
	console.log( { rest } );
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-single-product-details', className ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<Block />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;

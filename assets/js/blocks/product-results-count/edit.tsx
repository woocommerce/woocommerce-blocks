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

export interface Attributes {
	className?: string;
}

const Edit = ( { attributes }: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-product-results-count', className ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<Block attributes={ attributes } />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;

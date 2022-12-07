/**
 * External dependencies
 */
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled, withSpokenMessages } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
import { Attributes } from './types';

const Edit = ( { attributes }: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-customer-account', className ),
	} );
	return (
		<>
			{
				<div { ...blockProps }>
					<Disabled>
						<Block />
					</Disabled>
				</div>
			}
		</>
	);
};

export default withSpokenMessages( Edit );

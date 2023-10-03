/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { Disabled, withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';
import './editor.scss';
import { BlockProps } from './types';
import { Inspector } from './inspector';

const Edit = ( props: BlockEditProps< BlockProps > & { context: Context } ) => {
	const blockProps = useBlockProps( {
		className: classnames(
			'wc-block-stock-filter',
			props.attributes.className
		),
	} );

	return (
		<>
			{
				<div { ...blockProps }>
					<Inspector { ...props } />
					<Disabled>
						<Block { ...props.attributes } isEditor={ true } />
					</Disabled>
				</div>
			}
		</>
	);
};

export default withSpokenMessages( Edit );

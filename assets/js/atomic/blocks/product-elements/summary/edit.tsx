/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import {
	BLOCK_TITLE as label,
	BLOCK_ICON as icon,
	BLOCK_DESCRIPTION as description,
} from './constants';
import './editor.scss';
import type { BlockAttributes } from './types';

interface Props {
	attributes: BlockAttributes;
}

const Edit = ( { attributes, context, setAttributes }: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	useEffect(
		() => setAttributes( { isDescendentOfQueryLoop } ),
		[ setAttributes, isDescendentOfQueryLoop ]
	);
	return (
		<div { ...blockProps }>
			<Block { ...blockAttrs } />
		</div>
	);
};

// @todo: Refactor this to remove the HOC 'withProductSelector()' component as users will not see this block in the inserter. Therefore, we can export the Edit component by default. The HOC 'withProductSelector()' component should also be removed from other `product-elements` components. See also https://github.com/woocommerce/woocommerce-blocks/pull/7566#pullrequestreview-1168635469.
export default withProductSelector( { icon, label, description } )( Edit );

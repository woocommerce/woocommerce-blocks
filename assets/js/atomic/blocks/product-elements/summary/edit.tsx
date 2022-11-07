/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

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

const Edit = ( { attributes }: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Block { ...attributes } />
		</div>
	);
};

// @todo: Refactor this to remove the HOC 'withProductSelector()' component.
export default withProductSelector( { icon, label, description } )( Edit );

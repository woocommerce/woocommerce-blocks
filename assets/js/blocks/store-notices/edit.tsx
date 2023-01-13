/**
 * External dependencies
 */
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

interface Props {
	attributes: {
		className?: string;
	};
}

const Edit = ( { attributes }: Props ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-store-notices', className ),
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<Block />
			</Disabled>
		</div>
	);
};

export default Edit;

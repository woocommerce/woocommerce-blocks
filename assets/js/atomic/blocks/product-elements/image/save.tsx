/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

type Props = {
	attributes: Record< string, unknown > & {
		className?: string;
	};
};

export const Save = ( { attributes }: any ): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: classnames( 'is-loading', attributes.className ),
				postId: attributes.postId,
			} ) }
		/>
	);
};

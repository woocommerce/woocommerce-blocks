/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

type Props = {
	attributes: Record< string, unknown > & {
		className: string;
	};
};

export const Save = ( { attributes }: Props ): JSX.Element | null => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: classnames( 'is-loading', attributes.className ),
			} ) }
		/>
	);
};

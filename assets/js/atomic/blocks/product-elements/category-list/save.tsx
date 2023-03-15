/**
 * External dependencies
 */
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

type Props = {
	attributes: Record< string, unknown > & {
		className: string;
		renderOnServerSide: boolean;
	};
};

export const Save = ( { attributes }: Props ): JSX.Element | null => {
	// if ( attributes.renderOnServerSide ) {
	// 	return null;
	// }

	return (
		<div
			{ ...useBlockProps.save( {
				className: classnames( 'is-loading', attributes.className ),
			} ) }
		/>
	);
};

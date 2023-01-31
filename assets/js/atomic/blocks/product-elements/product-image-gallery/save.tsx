/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

type Props = {
	attributes: Record< string, unknown > & {
		className?: string;
	};
};

export const Save = ( { attributes }: Props ): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: attributes.className,
			} ) }
		/>
	);
};

export default Save;

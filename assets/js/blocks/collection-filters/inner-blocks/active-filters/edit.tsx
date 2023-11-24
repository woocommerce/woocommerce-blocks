/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { EditProps } from './types';
import { Inspector } from './components/inspector';

const Edit = ( props: EditProps ) => {
	const { displayStyle } = props.attributes;

	const blockProps = useBlockProps( {
		className: `style-${ displayStyle }`,
	} );

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			Active filters
		</div>
	);
};

export default Edit;

/**
 * External dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	attributes: {
		align: string;
		className: string;
		isPreview: boolean;
	};
	name: string;
}

const Edit = ( props: Props ): JSX.Element => {
	const { attributes, name } = props;
	// Remove style because its handled by the server-side render.
	const { style, ...blockProps } = useBlockProps( {
		className: 'wc-block-order-confirmation-summary',
	} );

	return (
		<div { ...blockProps }>
			<ServerSideRender
				block={ name }
				attributes={ {
					...attributes,
					isPreview: true,
				} }
			/>
		</div>
	);
};

export default Edit;

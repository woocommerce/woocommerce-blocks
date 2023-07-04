/**
 * External dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = ( props: Props ): JSX.Element => {
	const { attributes, name } = props;
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-downloads',
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

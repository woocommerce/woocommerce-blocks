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
	const blockProps = useBlockProps( {
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

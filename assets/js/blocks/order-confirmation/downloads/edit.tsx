/**
 * External dependencies
 */
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

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
		className: 'wc-block-order-confirmation-downloads',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<ServerSideRender
					block={ name }
					attributes={ {
						...attributes,
						isPreview: true,
					} }
				/>
			</Disabled>
		</div>
	);
};

export default Edit;

/**
 * External dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes } from '../types';

const InheritQueryControl = (
	props: BlockEditProps< ProductCollectionAttributes >
) => {
	const { attributes, setAttributes } = props;
	const { inherit } = attributes.query;
	return (
		<ToggleControl
			label={ __(
				'Inherit query from template',
				'woo-gutenberg-products-block'
			) }
			help={ __(
				'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.',
				'woo-gutenberg-products-block'
			) }
			checked={ !! inherit }
			onChange={ ( newInherit ) =>
				setAttributes( {
					query: {
						...props.attributes.query,
						inherit: newInherit,
					},
				} )
			}
		/>
	);
};

export default InheritQueryControl;

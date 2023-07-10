/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import {
	TextControl,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { QueryControlProps } from '../types';

const KeywordControl = ( props: QueryControlProps ) => {
	const { query, setQueryAttribute } = props;
	const [ querySearch, setQuerySearch ] = useState( query.search );

	const onChangeDebounced = useDebounce( () => {
		if ( query.search !== querySearch ) {
			setQueryAttribute( {
				search: querySearch,
			} );
		}
	}, 250 );

	useEffect( () => {
		onChangeDebounced();
		return onChangeDebounced.cancel;
	}, [ querySearch, onChangeDebounced ] );

	return (
		<ToolsPanelItem
			hasValue={ () => !! querySearch }
			label={ __( 'Keyword', 'woo-gutenberg-products-block' ) }
			onDeselect={ () => setQuerySearch( '' ) }
			resetAllFilter={ () => setQuerySearch( '' ) }
		>
			<TextControl
				label={ __( 'Keyword', 'woo-gutenberg-products-block' ) }
				value={ querySearch }
				onChange={ setQuerySearch }
			/>
		</ToolsPanelItem>
	);
};

export default KeywordControl;

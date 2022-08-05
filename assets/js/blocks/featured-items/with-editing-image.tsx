/**
 * External dependencies
 */
import { ComponentType, useEffect, useState } from 'react';
import type { EditorBlock } from '@woocommerce/types';

interface EditingImageRequiredProps {
	isSelected: boolean;
}

type EditingImageProps< T extends EditorBlock< T > > = T &
	EditingImageRequiredProps;

export const withEditingImage =
	< T extends EditorBlock< T > >( Component: ComponentType< T > ) =>
	( props: EditingImageProps< T > ) => {
		const [ isEditingImage, setIsEditingImage ] = useState( false );
		const { isSelected } = props;

		useEffect( () => {
			setIsEditingImage( false );
		}, [ isSelected ] );

		return (
			<Component
				{ ...props }
				useEditingImage={ [ isEditingImage, setIsEditingImage ] }
			/>
		);
	};

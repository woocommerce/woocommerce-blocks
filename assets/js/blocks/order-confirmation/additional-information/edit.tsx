/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';
import { Skeleton } from '~/base/components/skeleton';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-additional-information',
	} );

	return (
		<div { ...blockProps }>
			<Skeleton tag="h3" numberOfLines={ 1 } maxWidth="25%" />
			<Skeleton numberOfLines={ 3 } />
		</div>
	);
};

export default Edit;

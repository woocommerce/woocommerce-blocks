/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	InnerBlockLayoutContextProvider,
	useInnerBlockLayoutContext,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { useStoreProducts } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import {
	originalPriceName,
	currentPriceName,
	priceDiscount,
} from './inner-blocks';
import { TEMPLATE } from './template';
import './editor.scss';

interface Attributes {
	isDescendentOfSingleProductBlock: boolean;
	isDescendentOfSingleProductTemplate: boolean;
	withSuperScriptStyle: boolean;
	productId?: number;
}

interface Context {
	postId?: number;
	queryId?: number;
}

interface Props {
	context: Context;
	attributes: Attributes;
	setAttributes: ( attributes: Partial< Attributes > ) => void;
}

interface ContextProviderProps extends Props {
	children: JSX.Element | JSX.Element[] | undefined;
}

type ProductIdProps = Partial< ContextProviderProps > & { productId: number };

const deriveSuperScriptFromClass = ( className: string ): boolean => {
	if ( className ) {
		const classList = className.split( ' ' );
		return classList.includes( 'is-style-price-super' );
	}
	return false;
};

const ProviderFromAPI = ( {
	productId,
	children,
}: ProductIdProps ): JSX.Element => {
	// TODO: this would be good to derive from the WP entity store at some point.
	const { products, productsLoading } = useStoreProducts( {
		include: productId,
	} );
	let product = null;
	if ( products.length > 0 ) {
		product =
			products.find(
				( productIteration ) => productIteration.id === productId
			) || null;
	}

	return (
		<ProductDataContextProvider
			product={ product }
			isLoading={ productsLoading }
		>
			{ children }
		</ProductDataContextProvider>
	);
};

const DerivedProductDataContextProvider = ( {
	context,
	attributes,
	setAttributes,
	children,
}: ContextProviderProps & { withSuperScript: boolean } ): JSX.Element => {
	const { queryId, postId } = context;
	const { productId } = attributes;
	const isDescendentOfQueryLoop = Number.isFinite( queryId );
	const id = isDescendentOfQueryLoop ? postId : productId;
	const isDescendentOfSingleProductTemplate = useSelect(
		( select ) => {
			const editSiteStore = select( 'core/edit-site' );
			const editorPostId = editSiteStore?.getEditedPostId<
				string | undefined
			>();

			return Boolean(
				editorPostId?.includes( '//single-product' ) &&
					! isDescendentOfQueryLoop
			);
		},
		[ isDescendentOfQueryLoop ]
	);

	useEffect(
		() =>
			setAttributes( {
				isDescendentOfSingleProductTemplate,
			} ),
		[ isDescendentOfSingleProductTemplate, setAttributes ]
	);
	if ( id && id > 0 ) {
		return <ProviderFromAPI productId={ id }>{ children }</ProviderFromAPI>;
	}
	return (
		<ProductDataContextProvider isLoading={ false }>
			{ children }
		</ProductDataContextProvider>
	);
};

const EditBlock = ( {
	context,
	attributes,
	setAttributes,
	withSuperScript,
}: Props & { withSuperScript: boolean } ): JSX.Element => {
	const { parentClassName } = useInnerBlockLayoutContext();
	return (
		<DerivedProductDataContextProvider
			context={ context }
			attributes={ attributes }
			setAttributes={ setAttributes }
			withSuperScript={ withSuperScript }
		>
			<div className={ parentClassName }>
				<InnerBlocks
					allowedBlocks={ [
						originalPriceName,
						currentPriceName,
						priceDiscount,
					] }
					// todo add template for initial price layout
					template={ TEMPLATE }
				/>
			</div>
		</DerivedProductDataContextProvider>
	);
};

const Edit = ( {
	setAttributes,
	attributes,
	...props
}: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const withSuperScript = useMemo(
		() => deriveSuperScriptFromClass( blockProps.className ),
		[ blockProps.className ]
	);
	useEffect( () => {
		setAttributes( { withSuperScriptStyle: withSuperScript } );
	}, [ withSuperScript, setAttributes ] );
	return (
		<div { ...blockProps }>
			<InnerBlockLayoutContextProvider
				parentName={ 'woocommerce/price-block' }
				parentClassName={ 'wc-block-price-element' }
			>
				<EditBlock
					{ ...props }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InnerBlockLayoutContextProvider>
		</div>
	);
};

export default Edit;

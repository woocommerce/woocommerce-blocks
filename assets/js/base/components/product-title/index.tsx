/**
 * External dependencies
 */
import classnames from 'classnames';
import ProductName from '@woocommerce/base-components/product-name';
import { useStoreEvents } from '@woocommerce/base-context/hooks';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import type { HTMLAttributes } from 'react';

interface TagNameProps extends HTMLAttributes< HTMLOrSVGElement > {
	headingLevel: number | boolean;
	elementType?: keyof JSX.IntrinsicElements;
}

const TagName = ( {
	children,
	headingLevel,
	elementType: ElementType = ( headingLevel
		? `h${ headingLevel }`
		: 'span' ) as keyof JSX.IntrinsicElements,

	...props
}: TagNameProps ): JSX.Element => {
	return <ElementType { ...props }>{ children }</ElementType>;
};

export interface ProductTitleProps {
	headingLevel: number | boolean;
	className?: string | undefined;
	colorProps?:
		| {
				className?: string | undefined;
				style: React.CSSProperties;
		  }
		| undefined;
	spacingProps?:
		| {
				style: React.CSSProperties;
		  }
		| undefined;
	typographyProps?:
		| {
				style: React.CSSProperties;
		  }
		| undefined;
	align?: string;
	parentClassName?: string;
	product?: {
		id: number;
		name: string;
		permalink: string;
	};
	showProductLink: boolean;
	linkTarget?: string | undefined;
}

const ProductTitle = ( {
	headingLevel,
	className,
	colorProps,
	spacingProps,
	typographyProps,
	align,
	parentClassName,
	product,
	showProductLink,
	linkTarget,
}: ProductTitleProps ): JSX.Element => {
	const { dispatchStoreEvent } = useStoreEvents();

	if ( ! product?.id ) {
		return (
			<TagName
				headingLevel={ headingLevel }
				className={ classnames(
					className,
					colorProps?.className,
					'wc-block-components-product-title',
					{
						[ `${ parentClassName }__product-title` ]:
							parentClassName,
						[ `wc-block-components-product-title--align-${ align }` ]:
							align && isFeaturePluginBuild(),
					}
				) }
				style={
					isFeaturePluginBuild()
						? {
								...spacingProps?.style,
								...typographyProps?.style,
								...colorProps?.style,
						  }
						: {}
				}
			/>
		);
	}

	return (
		<TagName
			headingLevel={ headingLevel }
			className={ classnames(
				className,
				colorProps?.className,
				'wc-block-components-product-title',
				{
					[ `${ parentClassName }__product-title` ]: parentClassName,
					[ `wc-block-components-product-title--align-${ align }` ]:
						align && isFeaturePluginBuild(),
				}
			) }
			style={
				isFeaturePluginBuild()
					? {
							...spacingProps?.style,
							...typographyProps?.style,
							...colorProps?.style,
					  }
					: {}
			}
		>
			<ProductName
				disabled={ ! showProductLink }
				name={ product.name }
				permalink={ product.permalink }
				target={ linkTarget }
				onClick={ () => {
					dispatchStoreEvent( 'product-view-link', {
						product,
					} );
				} }
			/>
		</TagName>
	);
};

export default ProductTitle;

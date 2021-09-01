/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';
import {
	Fragment,
	Suspense,
	cloneElement,
	isValidElement,
} from '@wordpress/element';
import parse from 'html-react-parser';

interface renderBlockProps {
	// Parent Block Name. Used for inner block component mapping.
	blockName: string;
	// Map of block names to block components for children.
	blockMap: Record< string, React.ReactNode >;
	// Wrapper for inner components.
	blockWrapper?: React.ElementType;
}

interface renderParentBlockProps extends renderBlockProps {
	// React component to use as a replacement.
	Block: React.FunctionComponent;
	// CSS selector to match the elements to replace.
	selector: string;
	// Function to generate the props object for the block.
	getProps: ( el: Element, i: number ) => Record< string, unknown >;
}

interface renderInnerBlockProps extends renderBlockProps {
	children: HTMLCollection;
	depth?: number;
}

// Temporary block map for areas.
const temporaryForcedBlockComponents = {
	'woocommerce/checkout-shipping-address-block': [
		'woocommerce/checkout-sample-block',
		'woocommerce/checkout-sample-block',
		'woocommerce/checkout-sample-block',
	],
	'woocommerce/checkout-totals-block': [
		'woocommerce/checkout-sample-block',
		'woocommerce/checkout-sample-block',
	],
} as Record< string, string[] >;

const getInnerBlockComponent = (
	blockName: string,
	blockMap: Record< string, React.ReactNode >
): React.ElementType | null => {
	return blockName && blockMap[ blockName ]
		? ( blockMap[ blockName ] as React.ElementType )
		: null;
};

const getMissingForcedBlocks = (
	blockName: string,
	blockMap: Record< string, React.ReactNode >,
	blockChildren: HTMLCollection | null
) => {
	const currentBlocks = Array.from( blockChildren )
		.map( ( element: Element ) =>
			element instanceof HTMLElement
				? element?.dataset.blockName || null
				: null
		)
		.filter( Boolean ) as string[];

	const forcedBlocks = (
		temporaryForcedBlockComponents[ blockName ] || []
	).filter(
		( forcedBlockName ) => ! currentBlocks.includes( forcedBlockName )
	);

	return forcedBlocks.map(
		( forcedBlockName: string, index: number ): JSX.Element | null => {
			const ForcedComponent = getInnerBlockComponent(
				forcedBlockName,
				blockMap
			);
			return ForcedComponent ? (
				<ForcedComponent key={ `${ blockName }_forced_${ index }` } />
			) : null;
		}
	);
};

/**
 * Replaces saved block HTML markup with Inner Block Components.
 *
 * This is called on the main parent block (e.g. woocommerce/checkout) and then works it's way through in the hierarchy.
 */
const renderInnerBlocks = ( {
	blockName: parentBlockName,
	blockMap,
	blockWrapper,
	depth = 1,
	children,
}: renderInnerBlockProps ): ( JSX.Element | null )[] | null => {
	return Array.from( children ).map( ( element: Element, index: number ) => {
		const { blockName = '', ...componentProps } = {
			key: `${ parentBlockName }_${ depth }_${ index }`,
			...( element instanceof HTMLElement ? element.dataset : {} ),
		};

		const innerBlockChildren =
			element.children && element.children.length
				? renderInnerBlocks( {
						children: element.children,
						blockName: parentBlockName,
						blockMap,
						depth: depth + 1,
						blockWrapper,
				  } )
				: undefined;

		const InnerBlockComponent = getInnerBlockComponent(
			blockName,
			blockMap
		);

		// If there is no inner block component to render, just return the children.
		if ( ! InnerBlockComponent ) {
			const elementOuterHtml = parse( element.outerHTML );

			return isValidElement( elementOuterHtml )
				? cloneElement(
						elementOuterHtml,
						componentProps,
						innerBlockChildren
				  )
				: null;
		}

		const InnerBlockComponentWrapper = blockWrapper
			? blockWrapper
			: Fragment;

		return (
			<Suspense
				key={ `${ parentBlockName }_${ depth }_${ index }_suspense` }
				fallback={ <div className="wc-block-placeholder" /> }
			>
				<InnerBlockComponentWrapper>
					<InnerBlockComponent { ...componentProps }>
						{ innerBlockChildren }
						{ getMissingForcedBlocks(
							blockName,
							blockMap,
							element.children
						) }
					</InnerBlockComponent>
				</InnerBlockComponentWrapper>
			</Suspense>
		);
	} );
};

/**
 * Renders a block component in the place of a specified set of selectors.
 */
export const renderParentBlock = ( {
	Block,
	selector,
	blockName,
	getProps = () => ( {} ),
	blockMap,
	blockWrapper,
}: renderParentBlockProps ): void => {
	const getPropsWithChildren = ( element: Element, i: number ) => {
		const children =
			element.children && element.children.length
				? renderInnerBlocks( {
						blockName,
						blockMap,
						children: element.children,
						blockWrapper,
				  } )
				: null;
		return { ...getProps( element, i ), children };
	};
	renderFrontend( {
		Block,
		selector,
		getProps: getPropsWithChildren,
	} );
};

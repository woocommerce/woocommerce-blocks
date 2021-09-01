/**
 * External dependencies
 */
import { renderFrontend } from '@woocommerce/base-utils';
import { Fragment, Suspense, isValidElement } from '@wordpress/element';
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
	shippingAddress: [
		'woocommerce/checkout-sample-block',
		'woocommerce/checkout-sample-block',
	],
	totals: [
		'woocommerce/checkout-sample-block',
		'woocommerce/checkout-sample-block',
	],
} as Record< string, string[] >;

const getInnerBlockComponent = (
	blockName: string,
	blockMap: Record< string, React.ReactNode >,
	element?: Element
): React.ElementType => {
	if ( blockName && blockMap[ blockName ] ) {
		return blockMap[ blockName ] as React.ElementType;
	}

	const fallback = ( props: Record< string, unknown > ): JSX.Element => (
		<div { ...props } />
	);

	if ( element ) {
		const parsedElement = parse( element.outerHTML );
		return isValidElement( parsedElement )
			? ( props: Record< string, unknown > ): JSX.Element => (
					<parsedElement.type
						{ ...parsedElement.props }
						{ ...props }
					/>
			  )
			: fallback;
	}

	return fallback;
};

/**
 * Appends forced blocks which are missing from the template.
 */
const renderForcedBlocks = (
	innerBlockArea: string,
	blockMap: Record< string, React.ReactNode >,
	blockChildren: HTMLCollection | null
) => {
	const currentBlocks = blockChildren
		? ( Array.from( blockChildren )
				.map( ( element: Element ) =>
					element instanceof HTMLElement
						? element?.dataset.blockName || null
						: null
				)
				.filter( Boolean ) as string[] )
		: [];

	const forcedBlocks = (
		temporaryForcedBlockComponents[ innerBlockArea ] || []
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
				<ForcedComponent
					key={ `${ innerBlockArea }_forced_${ index }` }
				/>
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
	if ( ! children || children.length === 0 ) {
		return null;
	}
	return Array.from( children ).map( ( element: Element, index: number ) => {
		const { blockName = '', innerBlockArea = '', ...componentProps } = {
			key: `${ parentBlockName }_${ depth }_${ index }`,
			...( element instanceof HTMLElement ? element.dataset : {} ),
		};

		const InnerBlockComponent = getInnerBlockComponent(
			blockName,
			blockMap,
			element
		);

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
						{ renderInnerBlocks( {
							children: element.children,
							blockName: parentBlockName,
							blockMap,
							depth: depth + 1,
							blockWrapper,
						} ) }
						{ innerBlockArea &&
							renderForcedBlocks(
								innerBlockArea,
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

/**
 * External dependencies
 */
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import ProductTitle from '@woocommerce/base-components/product-title';
import {
	useSpacingProps,
	useTypographyProps,
	useColorProps,
} from '@woocommerce/base-hooks';
import type { HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';
import { Attributes } from './types';

type Props = Attributes & HTMLAttributes< HTMLDivElement >;

/**
 * Product Title Block Component.
 *
 * @param {Object}  props                   Incoming props.
 * @param {string}  [props.className]       CSS Class name for the component.
 * @param {number}  [props.headingLevel]    Heading level (h1, h2, etc.)
 * @param {boolean} [props.showProductLink] Whether or not to display a link to the product page.
 * @param {string}  [props.linkTarget]      Specifies where to open the linked URL.
 * @param {string}  [props.align]           Title alignment.
 *                                          will be used if this is not provided.
 * @return {*} The component.
 */
export const Block = ( props: Props ): JSX.Element => {
	const {
		className,
		headingLevel = 2,
		showProductLink = true,
		linkTarget,
		align,
	} = props;

	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();

	const colorProps = useColorProps( props );
	const spacingProps = useSpacingProps( props );
	const typographyProps = useTypographyProps( props );

	return (
		<ProductTitle
			headingLevel={ headingLevel }
			className={ className }
			colorProps={ colorProps }
			spacingProps={ spacingProps }
			typographyProps={ typographyProps }
			align={ align }
			parentClassName={ parentClassName }
			product={ product }
			showProductLink={ showProductLink }
			linkTarget={ linkTarget }
		/>
	);
};

export default withProductDataContext( Block );

/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import type { HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import { blocksConfig } from '~/settings/blocks';
import { useStyleProps } from '~/base/hooks';
import './style.scss';
import type { BlockAttributes } from './types';
import Summary from '~/base/components/summary';

type Props = BlockAttributes & HTMLAttributes< HTMLDivElement >;

const Block = ( props: Props ): JSX.Element | null => {
	const { className } = props;
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();
	const styleProps = useStyleProps( props );

	if ( ! product ) {
		return (
			<div
				className={ classnames(
					className,
					`wc-block-components-product-summary`,
					{
						[ `${ parentClassName }__product-summary` ]:
							parentClassName,
					}
				) }
			/>
		);
	}

	const source = product.short_description
		? product.short_description
		: product.description;

	if ( ! source ) {
		return null;
	}

	return (
		<Summary
			className={ classnames(
				className,
				styleProps.className,
				`wc-block-components-product-summary`,
				{
					[ `${ parentClassName }__product-summary` ]:
						parentClassName,
				}
			) }
			source={ source }
			maxLength={ 150 }
			countType={ blocksConfig.wordCountType || 'words' }
			style={ styleProps.style }
		/>
	);
};

export default withProductDataContext( Block );

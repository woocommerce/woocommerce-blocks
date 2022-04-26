/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { withProduct } from '@woocommerce/block-hocs';
import { getImageSrcFromProduct } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import Block from './block';
import './editor.scss';

function backgroundImageStyles( url ) {
	return url ? { backgroundImage: `url(${ url })` } : {};
}

const Edit = withProduct(
	( props: unknown ): JSX.Element => {
		const blockProps = useBlockProps();

		const {
			attributes: { hasParallax, isRepeated, mediaSrc },
		} = props;

		const isImgElement = ! ( hasParallax || isRepeated );

		const backgroundImageSrc =
			mediaSrc || getImageSrcFromProduct( props.product );

		const style = {
			...( ! isImgElement
				? backgroundImageStyles( backgroundImageSrc )
				: {} ),
		};

		return (
			<div
				{ ...blockProps }
				style={ { ...style, ...blockProps.style } }
				className={ classnames( blockProps.className, {
					'has-parallax': hasParallax,
				} ) }
				data-url={ backgroundImageSrc }
			>
				<Block { ...props } />
			</div>
		);
	}
);

export { Edit };

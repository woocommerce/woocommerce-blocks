/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Template } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

const TEMPLATE: Template[] = [
	[
		'core/group',
		{
			layout: {
				type: 'flex',
				orientation: 'vertical',
				justifyContent: 'center',
				flexWrap: 'wrap',
			},
		},
		[
			[
				'core/paragraph',
				{
					textAlign: 'center',
					fontSize: 'medium',
					content: `<strong>${ __(
						'No results found.',
						'woo-gutenberg-products-block'
					) }</strong>`,
				},
			],
			[
				'core/group',
				{
					layout: {
						type: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
					},
					style: { spacing: { blockGap: '0.5rem' } },
				},
				[
					[
						'core/paragraph',
						{
							content: __(
								'You can try',
								'woo-gutenberg-products-block'
							),
						},
					],
					[
						'core/paragraph',
						{
							content: `<a href="#" class="wc-link-clear-any-filters">${ __(
								'clearing any filters',
								'woo-gutenberg-products-block'
							) }</a>`,
						},
					],
					[
						'core/paragraph',
						{
							content: __(
								'or head to our',
								'woo-gutenberg-products-block'
							),
						},
					],
					[
						'core/paragraph',
						{
							content: `<a href="#" class="wc-link-stores-home">${ __(
								"store's home",
								'woo-gutenberg-products-block'
							) }</a>`,
						},
					],
				],
			],
		],
	],
];

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-product-collection-no-results',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export default Edit;

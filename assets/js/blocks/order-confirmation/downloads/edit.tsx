/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-downloads',
	} );

	const borderStyles = ( ( {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} ) => ( {
		borderBottomColor,
		borderLeftColor,
		borderRightColor,
		borderTopColor,
		borderWidth,
	} ) )( blockProps.style );

	return (
		<div { ...blockProps }>
			<Disabled>
				<table
					style={ borderStyles }
					cellSpacing="0"
					className="wc-block-order-confirmation-downloads__table"
				>
					<thead>
						<tr>
							<th className="download-product">
								<span className="nobr">Product</span>
							</th>
							<th className="download-remaining">
								<span className="nobr">
									Downloads remaining
								</span>
							</th>
							<th className="download-expires">
								<span className="nobr">Expires</span>
							</th>
							<th className="download-file">
								<span className="nobr">Download</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								className="download-product"
								data-title="Product"
							>
								<a href="https://example.com">Test Product</a>
							</td>
							<td
								className="download-remaining"
								data-title="Downloads remaining"
							>
								∞
							</td>
							<td
								className="download-expires"
								data-title="Expires"
							>
								Never
							</td>
							<td className="download-file" data-title="Download">
								<a
									href="https://example.com"
									className="woocommerce-MyAccount-downloads-file button alt"
								>
									Test Download
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</Disabled>
		</div>
	);
};

export default Edit;

/**
 * External dependencies
 */
import LoadingPlaceHolder from '@woocommerce/base-components/loading-placeholder';

interface Props {
	showInputFields: boolean;
	inlineInput: boolean;
	showFilterButton: boolean;
	isEditor?: boolean;
}

const PriceFilterLoadingPlaceholder = ( {
	showInputFields,
	inlineInput,
	showFilterButton,
	isEditor = false,
}: Props ) => (
	<>
		{ ! isEditor && (
			<LoadingPlaceHolder
				height="35px"
				width="200px"
				style={ { marginBottom: '20px' } }
			/>
		) }

		<div className="wc-block-price-slider">
			<LoadingPlaceHolder
				height="8px"
				isLoading={ ! inlineInput || ! showInputFields }
			/>
			<div className="wc-block-components-price-slider__controls">
				<LoadingPlaceHolder width="120px" height="34px" />
				<LoadingPlaceHolder height="8px" isLoading={ inlineInput } />
				<LoadingPlaceHolder width="120px" height="34px" />
			</div>
			<div className="wc-block-components-price-slider__controls">
				<LoadingPlaceHolder
					isLoading={ ! showInputFields }
					width="200px"
					height="25px"
				/>
				<LoadingPlaceHolder
					isLoading={ showFilterButton }
					width="100px"
					height="50px"
					style={ {
						marginLeft: 'auto',
					} }
				/>
			</div>
		</div>
	</>
);

export default PriceFilterLoadingPlaceholder;

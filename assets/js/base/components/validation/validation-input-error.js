/**
 * Internal dependencies
 */
import './style.scss';

export const ValidationInputError = ( { errorMessage = '' } ) => {
	if ( ! errorMessage ) {
		return null;
	}
	return (
		<div className="wc-block-form-input-validation-error" role="alert">
			{ errorMessage }
		</div>
	);
};

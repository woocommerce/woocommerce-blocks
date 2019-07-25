const avatarTemplate = ( { isLoading, avatarUrls } ) => {
	return isLoading ? (
		<div className="wc-block-reviews-by-product__avatar" width="48" height="48" />
	) : (
		<img alt="" src={ avatarUrls[ '48' ] } srcSet={ avatarUrls[ '96' ] + ' 2x' } className="wc-block-reviews-by-product__avatar" width="48" height="48" />
	);
};

export default avatarTemplate;

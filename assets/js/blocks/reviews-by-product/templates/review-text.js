const reviewTextTemplate = ( { text } ) => {
	return (
		<span
			className="wc-block-reviews-by-product__text"
			dangerouslySetInnerHTML={ {
				// `text` is the `review` parameter returned by the `reviews` endpoint.
				// It's filtered with `wp_filter_post_kses()`, which removes dangerous HTML tags,
				// so using it inside `dangerouslySetInnerHTML` is safe.
				__html: text || '',
			} }
		/>
	);
};

export default reviewTextTemplate;

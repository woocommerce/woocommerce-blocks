/**
 * External dependencies
 */

export const ProductGallery = ( { attributes, setAttributes, context } ) => {
	const { postId } = context;

	if ( ! postId ) {
		return <div>Product Gallery PlaceHolder</div>;
	}

	return <img src="https://picsum.photos/200/300"></img>;
};

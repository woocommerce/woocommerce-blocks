const CatalogSorting = () => {
	return (
		<form className="woocommerce-ordering" method="get">
			<select name="orderby" className="orderby" aria-label="Shop order">
				<option value="menu_order" selected="selected">
					Default sorting
				</option>
			</select>
		</form>
	);
};

export default CatalogSorting;

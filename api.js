import products from "../products.json";

export default function handler(req, res) {
  let result = products;
  const { device_type, brand, min_price, max_price, q, page=1, per_page=10 } = req.query;

  // Filter by device_type
  if(device_type) result = result.filter(p => p.device_type === device_type);
  // Filter by brand
  if(brand) result = result.filter(p => p.brand === brand);
  // Filter by price
  if(min_price) result = result.filter(p => p.price >= parseFloat(min_price));
  if(max_price) result = result.filter(p => p.price <= parseFloat(max_price));
  // Search by name or brand
  if(q){
    const query = q.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
  }

  // Pagination
  const total = result.length;
  const start = (page-1)*per_page;
  const end = start + parseInt(per_page);
  const paginated = result.slice(start, end);

  res.status(200).json({
    page: parseInt(page),
    per_page: parseInt(per_page),
    total,
    products: paginated
  });
}

import { Container,Typography } from '@mui/material';
// components
import {useLoaderData} from 'react-router-dom'
import { ProductList} from '../sections/@dashboard/products';
// mock

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const products=useLoaderData()
  const PRODUCTS=products.map((item)=>{
    return {
      id:item._id,
      barcode:item.barcode,
      name:item.brandName,
      cover:`http://localhost:3500/products/${item.imgUrl[0]}`
    }
  })
  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <ProductList products={PRODUCTS} />
      </Container>
    </>
  );
}

import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/thunks/productThunks';
import { ProductForm } from '../components/product/ProductForm';
import { ProductTable } from '../components/product/ProductTable';

export const ProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mb={4}>
        Gestión de Productos
      </Typography>
      <ProductForm />
      <ProductTable />
    </Container>
  );
};

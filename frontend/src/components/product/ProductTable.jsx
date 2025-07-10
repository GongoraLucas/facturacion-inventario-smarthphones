import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductById } from '../../redux/thunks/productThunks';

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.product);

  if (loading) return <Typography>Cargando productos...</Typography>;
  if (!products.length) return <Typography>No hay productos registrados.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((prod) => (
            <TableRow key={prod._id}>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.description}</TableCell>
              <TableCell>${prod.price.toFixed(2)}</TableCell>
              <TableCell>{prod.stock}</TableCell>
              <TableCell>{prod.category}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteProductById(prod._id))}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

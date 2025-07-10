import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { createNewProduct } from '../../redux/thunks/productThunks';

const initialForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: 'Otros',
};

export const ProductForm = () => {
  const dispatch = useDispatch();
  const { name, description, price, stock, category, onInputChange, onResetForm } =
    useForm(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createNewProduct({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
      })
    );
    onResetForm();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Agregar nuevo producto
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre"
          name="name"
          value={name}
          onChange={onInputChange}
          required
          fullWidth
        />
        <TextField
          label="Descripción"
          name="description"
          value={description}
          onChange={onInputChange}
          fullWidth
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          inputProps={{ min: 0, step: '0.01' }}
          value={price}
          onChange={onInputChange}
           placeholder="100.00"
          required
          fullWidth
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          inputProps={{ min: 0 }}
          value={stock}
          onChange={onInputChange}
          placeholder='100'
         
          required
          fullWidth
        />
        <TextField
          label="Categoría"
          name="category"
          select
          value={category}
          onChange={onInputChange}
          fullWidth
        >
          <MenuItem value="Xiaomi">Xiaomi</MenuItem>
          <MenuItem value="Samsung">Samsung</MenuItem>
          <MenuItem value="IPhone">IPhone</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </TextField>

        <Button variant="contained" type="submit">
          Guardar producto
        </Button>
      </Box>
    </Box>
  );
};

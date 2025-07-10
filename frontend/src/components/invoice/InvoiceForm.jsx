import { Box, Button, MenuItem, Select, TextField, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { InvoiceProductRow } from './InvoiceProductRow';
import { createNewInvoice } from '../../redux/thunks/invoiceThunks';
import { showSnackbar } from '../../redux/slices/uiSlice';

const initialForm = {
  client: '',
  date: new Date().toISOString().split('T')[0], // yyyy-mm-dd
};

export const InvoiceForm = () => {
  const dispatch = useDispatch();
  const { data: clients } = useSelector((state) => state.client);
  const { data: products } = useSelector((state) => state.product);

  const { client, date, onInputChange } = useForm(initialForm);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems([...items, { product: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((acc, item) => {
      const prod = products.find((p) => p._id === item.product);
      const price = prod?.price || 0;
      return acc + price * (item.quantity || 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!client || items.length === 0) {
      dispatch(showSnackbar({ msg: 'Cliente y productos requeridos', severity: 'warning' }));
      return;
    }

    const invoiceData = {
      client,
      date,
      items: items.map((item) => {
        const selectedProduct = products.find((p) => p._id === item.product);
        return {
          product: item.product,
          quantity: item.quantity,
          price: selectedProduct?.price || 0,
        };
      }),
    };

    dispatch(createNewInvoice(invoiceData));
    setItems([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Crear nueva factura
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
          <Select name="client" value={client} onChange={onInputChange} fullWidth displayEmpty>
            <MenuItem value="">-- Selecciona cliente --</MenuItem>
            {clients.map((cli) => (
              <MenuItem key={cli._id} value={cli._id}>
                {cli.name} ({cli.cedula})
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="date" value={date} onChange={onInputChange} fullWidth />
        </Grid>
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        Productos a facturar
      </Typography>

      {items.map((item, idx) => (
        <InvoiceProductRow
          key={idx}
          index={idx}
          item={item}
          onChange={handleItemChange}
          onRemove={handleRemoveItem}
          products={products}
        />
      ))}

      <Button onClick={handleAddItem} variant="outlined" sx={{ mt: 2 }}>
        + Agregar producto
      </Button>

      <Typography variant="h6" mt={3}>
        Total: ${getTotal().toFixed(2)}
      </Typography>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Registrar factura
      </Button>
    </Box>
  );
};

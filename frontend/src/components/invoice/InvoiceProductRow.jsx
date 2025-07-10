import { Box, Grid, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

export const InvoiceProductRow = ({ index, item, onChange, onRemove, products }) => {
  const handleChange = (field) => (e) => {
    const value = field === 'quantity' ? parseInt(e.target.value, 10) : e.target.value;
    onChange(index, field, value);
  };

  return (
    <Grid container spacing={2} alignItems="center" mt={1}>
      <Grid item xs={12} sm={5}>
        <Select
          fullWidth
          value={item.product}
          onChange={handleChange('product')}
          displayEmpty
        >
          <MenuItem value="">-- Selecciona producto --</MenuItem>
          {products.map((prod) => (
            <MenuItem key={prod._id} value={prod._id}>
              {prod.name} (${prod.price})
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          type="number"
          label="Cantidad"
          value={item.quantity}
          onChange={handleChange('quantity')}
          fullWidth
          inputProps={{ min: 1 }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box textAlign="right">
          <strong>
            ${(() => {
              const prod = products.find((p) => p._id === item.product);
              return prod ? (prod.price * item.quantity).toFixed(2) : '0.00';
            })()}
          </strong>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1}>
        <IconButton color="error" onClick={() => onRemove(index)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
};

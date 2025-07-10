import { Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export const SalesPage = () => {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [items, setItems] = useState([]);

  const productosDisponibles = [
    { nombre: 'iPhone 13', precio: 900 },
    { nombre: 'Samsung Galaxy A54', precio: 650 },
    { nombre: 'Redmi Note 12', precio: 280 },
  ];

  const agregarProducto = () => {
    const productoSeleccionado = productosDisponibles.find((p) => p.nombre === producto);
    if (!productoSeleccionado || cantidad < 0) return;
    setItems((items) => [...items, { ...productoSeleccionado, cantidad }]);
    setProducto('');
    setCantidad(1);
  };

  const eliminarItem = (index) => {
    const nuevos = [...items];
    nuevos.splice(index, 1);
    setItems(nuevos);
  };

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Generar Factura
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Cliente"
            name="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Autocomplete
            options={productosDisponibles.map((prod) => prod.nombre)}
            value={producto}
            onChange={(event, newValue) => setProducto(newValue)}
            renderInput={(params) => <TextField {...params} label="Producto" fullWidth />}
            freeSolo // Permite escribir texto libre además de seleccionar
          />
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            type="number"
            label="Cantidad"
            name="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 1 }}>
          <Button variant="contained" onClick={agregarProducto} fullWidth sx={{ height: '100%' }}>
            Agregar
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Unitario</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{(item.precio * item.cantidad).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => eliminarItem(index)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total</strong>
                </TableCell>
                <TableCell colSpan={2}>
                  <strong>{total.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="success" onClick={() => alert('factura enviada')}>
          Confirmar Factura
        </Button>
      </Box>
    </Box>
  );
};

import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InvoiceForm } from '../components/invoice/InvoiceForm';
import { confirmDeleteInvoice, deleteInvoiceById, fetchInvoices } from '../redux/thunks/invoiceThunks';
import { fetchProducts } from '../redux/thunks/productThunks';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

export const SalesPage = () => {
  const dispatch = useDispatch();
  const { data: invoices } = useSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Facturación
      </Typography>

      <InvoiceForm />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Facturas recientes
      </Typography>

      {invoices.length === 0 ? (
        <Typography>No hay facturas registradas.</Typography>
      ) : (
        invoices.map((inv, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: 2,
              px: 2,
              my: 2,
            }}
          >
            <Box sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1">Cliente: {inv.client?.name || 'N/A'}</Typography>
              <Typography>Fecha: {new Date(inv.createdAt).toLocaleDateString()}</Typography>
              <Typography>Productos:</Typography>
              <ul>
                {inv.items.map((p, i) => (
                  <li key={i}>
                    {p.product?.name || 'Desconocido'} x {p.quantity}
                  </li>
                ))}
              </ul>
              <Typography fontWeight="bold">Total: ${inv.total?.toFixed(2)}</Typography>
            </Box>
            <Box>
              <IconButton color="error" onClick={() => dispatch(confirmDeleteInvoice(inv._id))}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

import { useTheme } from '@emotion/react';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchProducts } from '../redux/thunks/productThunks';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const DashboardAdmin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {data:products} = useSelector(state=>state.product)
  useEffect(()=>{
    dispatch(fetchProducts())

  },[dispatch])
  const productosBajoStock = useMemo(()=>{
    return products.filter(product => product.stock <= 5 )
  },[products])

  const kpis = [
    // { label: 'Ventas Totales', value: 345, color: 'primary' },
    // { label: 'Ingresos Totales (USD)', value: 14832.75, color: 'secondary' },
    // { label: 'Usuarios registrados', value: 14832.75, color: 'success' },
    { label: 'Productos con bajo stock', value: productosBajoStock.length, color: 'error' },
  ];

  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: [45, 62, 48, 70, 90, 85],
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Historico de Ventas',
        font: { size: 18 },
      },
    },
  };

  const productosVendidos = [
    { nombre: 'iPhone 13', vendidos: 85 },
    { nombre: 'Samsung Galaxy A54', vendidos: 74 },
    { nombre: 'Redmi Note 12', vendidos: 65 },
  ];

  const productosRecientes = useMemo(() => {
    if (!products) return [];
    return products.map((product) => {
      return {
        name: product.name,
        date: product.createdAt || 'N/A',
      };
    });
  }, [products]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Panel de Administrador
      </Typography>
      <Grid container spacing={3}>
        {kpis.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderLeft: `5px solid`,
                borderColor: kpi.color + '.main',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h5">
                  {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={5} size={{xs: 12, md: 6}}>
        <Bar data={chartData} options={chartOptions}  />
      </Box>
      <Grid container spacing={3} mt={3}>
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Productos más vendidos
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Vendidos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosVendidos.map((prod) => (
                  <TableRow key={prod.nombre}>
                    <TableCell>{prod.nombre}</TableCell>
                    <TableCell>{prod.vendidos}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid> */}

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Últimos productos añadidos
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosRecientes.map((prod) => (
                  <TableRow key={prod.date}>
                    <TableCell>{prod.name}</TableCell>
                    <TableCell>{prod.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

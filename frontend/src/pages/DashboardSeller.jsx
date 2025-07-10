import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../redux/thunks/invoiceThunks';
import { fetchClients } from '../redux/thunks/clientThunks';
import PeopleIcon from '@mui/icons-material/People';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const DashboardSeller = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: invoices } = useSelector((state) => state.invoice);
  const { data:  clients } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchClients());
  }, [dispatch]);

  const ingresos = useMemo(() => {
    return invoices.reduce((acc, invoice) => acc + (invoice.total || 0), 0);
  }, [invoices]);

  const clientesAtendidos = useMemo(() => {
    if (!invoices || invoices.length === 0) return 0;
    const clientesSet = new Set(invoices.map((inv) => inv.cliente));
    return clientesSet.size;
  }, [invoices]);

  // KPIs simulados
  const kpis = [
    { label: 'Ventas realizadas 💲', value: invoices.length, color: 'primary' },
    { label: 'Ingresos generados 💲', value: ingresos, color: 'secondary' },
    { label: 'Clientes atendidos', value: clientesAtendidos, color: 'success' },
  ];

  const chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas esta semana',
        data: [3, 5, 2, 6, 4, 3, 4],
        fill: false,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Ventas semanales',
        font: { size: 18 },
      },
    },
  };

  const clientesRecientes = useMemo(() => {
    if (!invoices || !clients) return [];
    return invoices.map((invoice) => {
      const cliente = clients.find((c) => c._id === invoice.client);
      return {
        name: cliente ? cliente.name : invoice.client.name,
        date: invoice.createdAt || 'N/A',
      };
    });
  }, [invoices, clients]);

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Typography variant="h4" mb={3}>
        Panel del Vendedor
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3}>
        {kpis.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <Card
              sx={{
                borderLeft: `5px solid`,
                borderColor: kpi.color + '.main',
                height: '100%',
                flex: 1,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary" sx={{display:"flex", alignItems:"center"}}>
                  {kpi.label}
                  {kpi.label === "Clientes atendidos" && <PeopleIcon sx={{marginLeft:2}}/>}
                </Typography>
                <Typography variant="h5">
                  {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

     

      {/* Últimos clientes */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" gutterBottom>
          Últimos clientes atendidos
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientesRecientes.map((cli) => (
                <TableRow key={cli.date}>
                  <TableCell>{cli.name}</TableCell>
                  <TableCell>{new Date(cli.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
       {/* Gráfico */}
      <Box mt={5} size={{ xs: 12, md: 6 }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

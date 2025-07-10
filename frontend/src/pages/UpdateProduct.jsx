import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProductById } from "../redux/thunks/productThunks";
import { useForm } from "../hooks/useForm";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: products } = useSelector((state) => state.product);

  const [visible, setVisible] = useState(true);

  const productSelected = useMemo(
    () => products.find((product) => product._id === id),
    [products, id]
  );

  if (!productSelected)
    return <Typography>Cargando producto...</Typography>;

  const {
    name,
    description,
    price,
    stock,
    category,
    onInputChange,
  } = useForm(productSelected);

  const handleClose = () => {
    setVisible(false);
    navigate(-1); // regresar a la página anterior al cerrar
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProductById(id, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
      })
    );

    handleClose();
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Actualizar producto</Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nombre"
          name="name"
          value={name}
          onChange={onInputChange}
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={description}
          onChange={onInputChange}
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          inputProps={{ min: 0, step: "0.01" }}
          value={price}
          onChange={onInputChange}
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          inputProps={{ min: 0 }}
          value={stock}
          onChange={onInputChange}
          required
        />
        <TextField
          label="Categoría"
          name="category"
          select
          value={category}
          onChange={onInputChange}
        >
          <MenuItem value="Xiaomi">Xiaomi</MenuItem>
          <MenuItem value="Samsung">Samsung</MenuItem>
          <MenuItem value="IPhone">IPhone</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </TextField>

        <Button variant="contained" type="submit">
          Actualizar producto
        </Button>
      </Box>
    </Box>
  );
};

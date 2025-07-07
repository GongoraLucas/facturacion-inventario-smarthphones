import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export const Title = ({
  fontSize = { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
  backgroundColor = "#455A64",
  textColor = "#fff",

}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const currentFontSize =
    typeof fontSize === "object"
      ? isXs
        ? fontSize.xs
        : fontSize.sm
      : fontSize;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="center"
      gap={2}
      px={2}
      py={2}
      sx={{
        backgroundColor: "#1669bb",
        textAlign: { xs: "center", sm: "left" },
        width:"100%"
       
      }}
    >
      {/* Texto izquierdo: Smartphones */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize,
          color: textColor,
        }}
      >
        Smartphones
      </Typography>

      {/* Texto derecho: Facturación y gestión del Inventario */}
      <Box
        sx={{
          backgroundColor,
          borderRadius: "12px",
          px: 2,
          py: 0.5,
          minHeight: "1.5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: textColor,
            fontWeight: 700,
            fontSize: currentFontSize,
            whiteSpace: "nowrap",
          }}
        >
          Facturación / Inventario
        </Typography>
      </Box>
    </Box>
  );
};

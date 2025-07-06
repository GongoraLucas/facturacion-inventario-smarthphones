import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const splitIntoCharacters = (text) => {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }
  return Array.from(text);
};

export const AnimationTitle = ({
  staticText = "Creative",
  animatedWords = ["thinking", "building", "designing"],
  duration = 2500,
  fontSize = { xs: "2rem", sm: "2.5rem", md: "3rem" },
  backgroundColor = "#455A64",
  textColor = "#fff",
  staticColor = "#fff",
}) => {
  const [index, setIndex] = useState(0);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, duration);
    return () => clearInterval(id);
  }, [animatedWords.length, duration]);

  const characters = useMemo(
    () => splitIntoCharacters(animatedWords[index]),
    [animatedWords, index]
  );

  // Para igualar el tamaño del texto animado con el estático
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
        borderRadius: "15px",
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      {/* Texto estático */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize,
          color: staticColor,
        }}
      >
        {staticText}
      </Typography>

      {/* Contenedor del bloque animado */}
      <Box
        sx={{
          position: "relative",
          backgroundColor,
          borderRadius: "12px",
          px: 2,
          py: 0.5,
          minHeight: "1.5em",
          minWidth: "8ch",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            style={{
              display: "flex",
              gap: "0.05em",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            {characters.map((char, i) => (
              <motion.span
                key={char + i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: i * 0.04,
                }}
                style={{
                  color: textColor,
                  fontWeight: 700,
                  fontSize: currentFontSize,
                  lineHeight: 1.2,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Texto fantasma para mantener tamaño del contenedor */}
        <Typography
          component="span"
          sx={{
            opacity: 0,
            visibility: "hidden",
            fontWeight: 700,
            fontSize: currentFontSize,
            whiteSpace: "nowrap",
          }}
        >
          {animatedWords.reduce((a, b) => (a.length > b.length ? a : b))}
        </Typography>
      </Box>
    </Box>
  );
};

import { useEffect, useState } from 'react';

/**
 * Custom hook para el manejo de formularios
 * @param {Object} initialForm - Valores iniciales del formulario
 * @returns {Object} formData, onInputChange, onResetForm
 */
export const useForm = (initialForm = {}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    setFormData(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const onResetForm = () => {
    setFormData(initialForm);
  };

  return {
    ...formData,
    onInputChange,
    onResetForm,
  };
};

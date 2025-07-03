import { useEffect, useState } from "react"


/**
 * Custom hook para el manejo de formularios
 * @param {Object} initialForm - Valores iniciales del formulario
 * @returns {Object} formData, onInputChange, onResetForm
 */
export const useForm = (initialForm={})=>{
    const [formData,setFormData] =useState(initialForm);

    useEffect(()=>{
        setFormData(initialForm)
    },[Object.keys(initialForm).join(",")])

    const onInputChange = ({target})=>{
        const {name,value,type,checked}=target;

        setFormData(current => ({... current,[name]:type === "checkbox" ? checked : value}))
    }

    const onResetForm = ()=>{
        setFormData(initialForm);
    }

    return {
        ...formData,
        onInputChange,
        onResetForm
    }

}
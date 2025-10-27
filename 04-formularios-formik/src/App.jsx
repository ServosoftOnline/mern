/*
  FORMIK:

    - Documentación: https://www.npmjs.com/package/formik?activeTab=dependencies
    - npm i formik
    - Permite gestionar un formulario teniendor diferentes eventos para diferentes cosas y un hook para gestionarlo

  - YUP:

    - Documentación: https://www.npmjs.com/package/yup
    - npm i yup
    - Permite hacer validaciones 
      - Estas se harán en tiempo real mostrando los mensajes de error en pantalla

*/
import React, {useState} from 'react';
import './App.css';

// Importo formik
import {useFormik} from 'formik';

// Importo yup
import * as Yup from 'yup';

// Componente ppal
const App = () => {

  // Estado que almacena los datos enviados por el formularionull.
  const [submittedData, setSubmittedData] = useState(null);

  // Esquema de validación
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'Nombre muy corto')
      .max(40, 'Nombre muy largo')
      .required('Campo obligatorio'),

    email: Yup.string()
      .email('Formato inválido')
      .required('Campo obligatorio')
  });

  // Declaro la constante formik con los valores iniciales, el esquema de validación y onsubmit que recoge los valores del formulario
  const formik = useFormik({

    // Valores iniciales del formulario
    initialValues: {
      nombre: '',
      email: ''
    },

    // Constante de validación
    validationSchema,

    // Recoge los valores, los muestra en consola, actualiza el estado con los valores y resetea el formulario
    onSubmit: values => {
      console.log('Datos enviados:', values);      
      setSubmittedData(values);      
      formik.resetForm(); 
    }

  });
  
  
  // Renderizo
  return (
    <>
      
      <h1>Formik:</h1>
      <h2>Librería para facilitar el trabajo con formularios</h2>

      <div>
        <h2>Formulario con formik:</h2>

        {/* En el onSubmit añado formik */}
        <form onSubmit={formik.handleSubmit}>

          {/* Primer campo */}
          <div className='form-group'>
            
            {/* Contenedor para la etiqueta y el error */}
            <div className="label-container">

              <label htmlFor='nombre'>Nombre</label>
              {/* Si hay errores en el campo nombre y hubiera modificado los valores iniciales del nombre, muestro los errores del nombre */}
              <div className='error'>
                {formik.errors.nombre && formik.touched.nombre ? formik.errors.nombre : ''}
              </div>

            </div>

            {/* Value añade el valor sacado por formik, en onChange el metodo handleChange de formik y el onBlur actualiza tras perder el foco*/}  
            <input
              type='text'
              name='nombre'
              id='nombre'
              value={formik.values.nombre}
              onChange={formik.handleChange}    
              onBlur={formik.handleBlur} 
            />
            
          </div>

          {/* Segundo campo */}
          <div className='form-group'>

            {/* Contenedor para la etiqueta y el error */}
            <div className="label-container">

              <label htmlFor='email'>Email</label>

              {/* Si hay errores en el campo email y hubiera modificado los valores iniciales del email, muestro los errores del email */}
              <div className='error'>
                {formik.errors.email && formik.touched.email ? formik.errors.email : ''}
              </div>

            </div>
            
            <input
              type='text'
              name='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
            />

          </div>

          <input type='submit' value='Enviar' />

        </form>

        {/* 3. Renderizado Condicional: Mostramos los datos si submittedData no es null */}
        {submittedData && (
          <div className="results-container">
            <h3>Datos Enviados Correctamente:</h3>
            <p><strong>Nombre:</strong> {submittedData.nombre}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
          </div>
        )}

      </div>
      
    </>
  )
}

export default App

import React from "react";
import shortid from "shortid";

function App() {
  const [Tarea, setTarea] = React.useState('');
  const [tareas,settareas] = React.useState([]);
  const [modoEdicion,setModoEdicion] = React.useState(false);
  const [id,setId] = React.useState('');
  const [error,setError] = React.useState(null);
  const agregarTarea = e => {
    e.preventDefault();
    if(!Tarea.trim())
    {
      console.log('Elemento Vacio');
      setError('El campo no puede estar Vacío');
      return
    }
    console.log(Tarea);
    settareas([
      ...tareas,
      {Tarea, id: shortid.generate()}
    ])
    setTarea('');
    setError(null);
  }
  const EliminarTarea = id =>{
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    settareas(arrayFiltrado);
  }
  const Editar  = item =>{
    setModoEdicion(true);
    setTarea(item.Tarea);
    setId(item.id);
  }
  const editarTarea = e =>{
    e.preventDefault();
    if(!Tarea.trim())
    {
      console.log('Elemento Vacio');
      setError('El campo no puede estar Vacío');
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? {id, Tarea} : item)
    settareas(arrayEditado);
    setModoEdicion(false);
    setTarea('');
    setId('');
    setError(null);

  }
  

  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">CRUD SIMPLE</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Listas de Tareas</h4>
            <ul className="list-group">
              {
                tareas.length === 0 ? (
                  <li className="list-group-item">Sin Tareas</li>
                ) :
                (
                  tareas.map( item => (
                    <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.Tarea}</span>
                    <button className="btn btn-sm btn-danger mx-2" onClick={()  => EliminarTarea(item.id)}>Eliminar</button>
                    <button className="btn btn-sm btn-warning" onClick={() => Editar(item)}>Editar</button>
                    </li>
                  ))
                )
                
              }
            </ul>
          </div>
          <div className="col-4">
           <h4 className="text-center">
             {
               modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
             }
           </h4>
           <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
             {
               error ? <span className="text-danger">{error}</span> : null
             }
           <input type="text" className="form-control mb-2" placeholder="Ingrese Tarea" onChange={e => setTarea(e.target.value) } value={Tarea} />
            {
              modoEdicion ? (
                // MODO EDICION VERDADERO
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
              // MODO EDICION FALSO
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
            }
           </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [datos, setDatos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const agregarDato = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido) return;

    if (modoEdicion) {
      const ref = doc(db, 'personas', idEditar);
      await updateDoc(ref, { nombre, apellido });
      setModoEdicion(false);
      setIdEditar(null);
    } else {
      await addDoc(collection(db, 'personas'), { nombre, apellido });
    }

    setNombre('');
    setApellido('');
  };

  const eliminarDato = async (id) => {
    await deleteDoc(doc(db, 'personas', id));
  };

  const cargarParaEditar = (item) => {
    setNombre(item.nombre);
    setApellido(item.apellido);
    setModoEdicion(true);
    setIdEditar(item.id);
  };

  const cancelarEdicion = () => {
    setNombre('');
    setApellido('');
    setModoEdicion(false);
    setIdEditar(null);
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'personas'), (snapshot) => {
      setDatos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <h1>{'React CRUD - Nombres Personas'}</h1>
      <form onSubmit={agregarDato}>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
        {modoEdicion && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
      </form>

      <ul>
        {datos.map((item) => (
          <li key={item.id}>
            {item.nombre} {item.apellido}
            <button onClick={() => eliminarDato(item.id)}>Eliminar</button>
            <button onClick={() => cargarParaEditar(item)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

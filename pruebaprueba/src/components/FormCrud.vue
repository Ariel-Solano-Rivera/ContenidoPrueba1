<template>
  
  <div>
  <h1>VUE CRUD - Nombres Persona</h1>
    <form @submit.prevent="modoEdicion ? actualizarDato() : agregarDato()">
      <input v-model="nombre" placeholder="Nombre" />
      <input v-model="apellido" placeholder="Apellido" />
      <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Agregar' }}</button>
      <button v-if="modoEdicion" type="button" @click="cancelarEdicion">Cancelar</button>
    </form>

    <ul>
      <li v-for="item in datos" :key="item.id">
        {{ item.nombre }} {{ item.apellido }}
        <button @click="eliminarDato(item.id)">Eliminar</button>
        <button @click="cargarParaEditar(item)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      datos: [],
      idEditar: null,
      modoEdicion: false
    };
  },
  methods: {
    async agregarDato() {
      await addDoc(collection(db, "personas"), {
        nombre: this.nombre,
        apellido: this.apellido
      });
      this.nombre = "";
      this.apellido = "";
    },
    async eliminarDato(id) {
      await deleteDoc(doc(db, "personas", id));
    },
    cargarParaEditar(item) {
      this.nombre = item.nombre;
      this.apellido = item.apellido;
      this.idEditar = item.id;
      this.modoEdicion = true;
    },
    async actualizarDato() {
      const referencia = doc(db, "personas", this.idEditar);
      await updateDoc(referencia, {
        nombre: this.nombre,
        apellido: this.apellido
      });
      this.nombre = "";
      this.apellido = "";
      this.idEditar = null;
      this.modoEdicion = false;
    },
    cancelarEdicion() {
      this.nombre = "";
      this.apellido = "";
      this.idEditar = null;
      this.modoEdicion = false;
    }
  },
  mounted() {
    onSnapshot(collection(db, "personas"), (snapshot) => {
      this.datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }
};
</script>

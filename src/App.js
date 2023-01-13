import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, ModalBody, ModalHeader, FormGroup, ModalFooter, Modal} from 'reactstrap';
import React from 'react';
import { render } from '@testing-library/react';

const data = [
  { id: 1, nombre: "Juan", apellido: "Lopez"},
  { id: 2, nombre: "Carlos", apellido: "Lopera"},
  { id: 3, nombre: "Sebastian", apellido: "Castro"},
  { id: 4, nombre: "Stiven", apellido: "Martinez"},
  { id: 5, nombre: "David", apellido: "Castaño"},
];

class App extends React.Component{
  state={
    data: data,
    form:{
      id: "",
      nombre: "",
      apellido: "",
  },
  modalInsertar: false,
  modalEditar: false,
};

handlechange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]:e.target.value,
    }
  });
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}
ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}
mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form:registro});
}
ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista= this.state.data;
  lista.push(valorNuevo);
  this.setState({data:lista, modalInsertar: false});
}

editar = (dato) => {
  var contador = 0;
  var lista = this.state.data;
  lista.map((registro) =>{
    if (dato.id == registro.id) {
      lista[contador].nombre = dato.nombre;
      lista[contador].apellido = dato.apellido;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar = (dato) => {
  var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
  if (opcion) {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({ data: lista});
  }
}

  render(){
  return (
    <>
    <Container>
    <br />
      <Button color= "success" onClick={()=>this.mostrarModalInsertar()}>insertar nuevo empleado</Button>
      <br /><br/>

      <Table>
        <thead><tr><th>Id</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Acciones</th></tr></thead>
        <tbody>
         {
            this.state.data.map( elemento => (
          <tr key={elemento.id}>
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.apellido}</td>
            <td><Button color ="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
            <Button color ="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>

          </tr>
         ))}


        </tbody>
      </Table>
    </Container>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='nombre' type="text" onChange={this.handlechange}/>
          </FormGroup>

          <FormGroup>
            <label>Apellido:</label>
            <input className='form-control' name='apellido' type="text" onChange={this.handlechange}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type="text" value={this.state.form.id} />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='nombre' type="text" onChange={this.handlechange} value={this.state.form.nombre}/>
          </FormGroup>

          <FormGroup>
            <label>Apellido:</label>
            <input className='form-control' name='apellido' type="text" onChange={this.handlechange} value={this.state.form.apellido}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>

    </>
  );
 }
}

export default App;

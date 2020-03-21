import React, { Component } from 'react';
import { Tabs, Tab, Table, Card, Container, Row, Col, Accordion } from 'react-bootstrap';

class DataShow extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.device_data
        }
        this.getTabs = this.getTabs.bind(this);
        this.getDataTab = this.getDataTab.bind(this);
        this.getDescription = this.getDescription.bind(this);
        this.getComponents = this.getComponents.bind(this);
        this.getComponentsAxes = this.getComponentsAxes.bind(this);

        this.getHAttrTable = this.getHAttrTable.bind(this);
        this.getVAttrTable = this.getVAttrTable.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.state.data){
            this.setState({
                data: nextProps.device_data
            });
        }
    }

    /*
        Genera el componente de pestañas para los datos del dispositivo.
        La funcion retorna un componente de pestaña de datos REACT 
    */
    getTabs(){
        this.getVAttrTable({}, {headers: ['attr_1','attr_1']})
        let tabs = []
        let index = 0;
        for( const property in this.state.data){
            const data_tab = this.getDataTab(property, this.state.data[property]);
            tabs.push(<Tab key={index++} eventKey={ index } title={ data_tab.title }>
                <Card className="bg-primary text-white">
                    <Card.Body>
                        { data_tab.content }
                    </Card.Body>
                </Card>
            </Tab>);
            index++;
        }
        if(tabs.length<1){
            tabs.push(<Tab eventKey="no_found_tabs" title="Sin pestañas">
                <Card bg="danger">
                    <Card.text>Este dispositivo no tiene contenido para mostrar</Card.text>
                </Card>
            </Tab>);
        }
        return tabs;
    }

    /*
        Genera las pestañas de datos para el dispositivo, se definieron 4 pestañas 
        por defecto que generan titulo modificado según la sentencia CASE, por defecto si no hay 
        concidencias se da como titulo a la pestaña el nombre del nodo.
        La funcion retorna una estructura con el titulo y contenido de la pestaña
    */
    getDataTab(prop, data){
        let title = '';
        let content = <></>;
        switch (prop.toString()) {
            case '_attributes':
                title = 'Atributos';
                content = this.getVAttrTable(data, {});
                break;
            case 'Description':
                title = 'Descripción';
                content = this.getDescription(data);
                break;
            case 'DataItems':
                title = 'Elementos de datos';
                content = this.getHAttrTable(data, { 
                    headers: [
                        {id: 'id', text: 'Id'},
                        {id: 'type', text: 'Tipo'},
                        {id: 'category', text: 'Categoría'}
                    ] 
                });
                break;
            case 'Components':
                title = 'Componentes';
                content = this.getComponents(data);
                break;
            default:
                title = prop;
                content = prop;
                break;
        }
        return {
            title,
            content
        };
    }

    /*
        Obtener una tabla horizontal de atributos a partir de un nodo json ejemplo:
        nodo = { attr_1="valor 1", attr_2="valor 2"}
        tabla = | # |  attr  |  value  |
                | 1 | attr_1 | valor 1 |
                | 2 | attr_2 | valor 2 |
        #, attr y value son configurables a traves de atributo options de la funcion
        el # puede ser seccionado si se mostrara o no a traves de las opciones
    */
    getVAttrTable(data, options){
        let defaults = {
            show_index: true,
            _index: '#',
            _attr: 'Atributos',
            _value: 'Valor'
        };
        options = Object.assign({}, defaults, options);
        let row_table = [];
        let index = 0;
        for( const property in data){
            row_table.push(
                <tr key={index++}>
                    { options.show_index ? <td>{ index }</td> : null }
                    <td>{ property }</td>
                    <td>{ data[property] }</td>
                </tr>
            );
        }
        if(row_table.length<1){
            return (
                <p>{ options._attr } no disponibles</p>
            );
        }else{
            return (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                { options.show_index ? <th>{ options._index }</th> : null }
                                <th>{ options._attr }</th>
                                <th>{ options._value }</th>
                            </tr>
                        </thead>
                        <tbody>
                            { row_table }
                        </tbody>
                    </Table>
                </>
            );
        }
    }

    /*
        Obtener una tabla vertical de atributos a partir de un nodo tipo array json ejemplo:
        nodo = [ { attr_1="valor 1", attr_2="valor 2"}, { attr_1="valor 3", attr_2="valor 4"}]
        tabla = | # |  attr_1  |  attr_2  |
                | 1 |  valor 1 | valor 2  |
                | 2 |  valor 3 | valor 4  |
        #, attr_1 y attr_2 son configurables a traves de atributo options de la funcion
        el # puede ser seccionado si se mostrara o no a traves de las opciones
        notas: los nodos internos del array deben tener atributos iguales o podrian
        presentarce inconsistencia en la generacion de la tabla. Los encabezados de la tabla
        se tomaron del primer nodo del array y se se asignan encabezados por optiones este array
        se tomaran en el orden ingresado
    */
    getHAttrTable(data, options){
        let defaults = {
            show_index: true,
            _index: '#',
            headers: null,
            table_size: "lg"
        };
        options = Object.assign({}, defaults, options);
        let arr_items = [];
        if(data.DataItem[0]){
            arr_items = data.DataItem;
        }else{
            arr_items.push(data.DataItem);
        }
        if(options.headers==null){
            const first_item = arr_items[0];
            options.headers = [];
            for(const attr in first_item._attributes){
                options.headers.push({id: attr.toString(), text: attr.toString()})
            };
        }
        let headers_table = [];
        options.headers.forEach((header, index) => {
            headers_table.push(<th key={index}>{ header.text }</th>);
        });
        let row_table = [];
        const no_found_item = <span className="text-muted">no disponible</span>;
        arr_items.forEach((item, index) => {
            if(item._attributes){
                const attr = item._attributes;
                let td_row = [];
                options.headers.forEach((header, index) => {
                    td_row.push(<td key={index}>{ attr[header.id] ? attr[header.id] : no_found_item }</td>);
                });
                row_table.push(
                    <tr key={index}>
                        { options.show_index ? <td>{ index + 1 }</td> : null }
                        { td_row }
                    </tr>
                );
            }
        });
        if(row_table.length<1){
            return (
                <p>Elementos de datos no disponibles</p>
            );
        }else{
            return (
                <>
                    <Table striped bordered hover variant="dark" size={ options.table_size }>
                        <thead>
                            <tr>
                                { options.show_index ? <th>{ options._index }</th> : null }
                                { headers_table }
                            </tr>
                        </thead>
                        <tbody>
                            { row_table }
                        </tbody>
                    </Table>
                </>
            );
        }
    }

    // Obtener la descripcion de un dispositivo
    getDescription(data){
        if(data._text){
            return (<p>{ data._text }</p>);
        }
        return (<p>Descripción no disponible</p>);
    }

    /* 
        Genera un componete REACT con los datos de los componentes de un dispositivo
        utilizando una data en formato json
    */
    getComponents(data){
        let components = [];
        // Obtener los axes
        if(data.Axes){
            let a_index = 0;
            let axes = [<div key={a_index++} className="card-title h5">Ejes<hr className="bg-white" /></div>];
            // Obtener los dataitems para axes
            if(data.Axes.DataItems){
                axes.push(
                    <div key={a_index++}>
                        <span className="h6">Elementos de datos:</span>
                        { this.getHAttrTable(data.Axes.DataItems, { 
                            show_index: false,
                            headers: [
                                {id: 'id', text: 'Id'},
                                {id: 'type', text: 'Tipo'},
                                {id: 'category', text: 'Categoría'}
                            ] 
                        }) }
                    </div>
                );
            }
            // Obtener los components para axes
            if(data.Axes.Components){
                const components = data.Axes.Components;
                for(const property in components){
                    switch (property.toString()) {
                        case 'Rotary':
                            axes.push(<div key={a_index++}>
                                { this.getComponentsAxes(components[property], 'rotativo') }
                            </div>)
                            break;
                        case 'Linear':
                            axes.push(<div key={a_index++}>
                                { this.getComponentsAxes(components[property], 'lineales') }
                            </div>);
                            break;
                        default:
                            axes.push(<div key={a_index++}>
                                { this.getComponentsAxes(components[property], 'property') }
                            </div>);
                            break;
                    }
                }
            }
            components.push(axes);
        }
        if(components.length<1){
            components.push(<p className="d-block">Componentes no disponibles</p>);
        }
        return components;
    }

    /*
        Obtener los componentes de un axes
    */
    getComponentsAxes(data, name_component){
        // console.log(data)
        let components = [];
        if(data[0]){
            components = data;
        }else{
            components.push(data);
        }
        let data_items = [];
        components.forEach((item, index) => {
            if(item.DataItems){
                data_items.push(
                    <div key={index}>
                        <p>Elementos de datos para el componente &nbsp;
                            { item._attributes.name ? 
                                item._attributes.name : 
                                item._attributes.id ? 
                                    item._attributes.id : 
                                    'item_' + index
                            }
                        </p>
                        { this.getHAttrTable(item.DataItems, { 
                            show_index: false,
                            table_size: 'sm',
                            headers: [
                                {id: 'id', text: 'Id'},
                                {id: 'name', text: 'Nombre'},
                                {id: 'type', text: 'Tipo'},
                                {id: 'subType', text: 'Sub-tipo'},
                                {id: 'category', text: 'Categoría'},
                                {id: 'units', text: 'Unidades'},
                                {id: 'nativeUnits', text: 'Unidades nativas'}
                            ] 
                        })}
                    </div>
                );
            }
        });
        return (
            <>  
                <Container fluid>
                    <Row>
                        <Col className="col-auto p-1 my-2 border border-right-0"></Col>
                        <Col className="pl-1 pr-0" style={ {maxWidth: '98.6%'} }>
                            <Accordion defaultActiveKey="-1">
                                <Card bg="primary" className="w-100">
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <span className="h6 d-block">
                                            Componentes {name_component}:&nbsp;&nbsp;
                                            <i className="fas fa-angle-down"></i>
                                        </span>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {this.getHAttrTable({ DataItem: components }, { 
                                                show_index: false,
                                                headers: [
                                                    {id: 'id', text: 'Id'},
                                                    {id: 'name', text: 'Nombre'},
                                                    {id: 'nativeName', text: 'Nombre nativo'}
                                                ] 
                                            })}
                                            <div>
                                                { data_items }
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                    <br/>
                </Container>
            </>
        );
    }

    render(){
        return (
            <>
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
                    { this.getTabs() }
                </Tabs>
            </>
        );
    }
}

export default DataShow;
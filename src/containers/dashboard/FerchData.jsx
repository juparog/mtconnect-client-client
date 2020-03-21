// Dependencias
import React, { Component } from "react";
import { Fetch } from 'react-request';
import { parseString } from 'xml2js';
import convert from 'xml-js';

// Componentes
import Loading from '../../components/messages/Loading.jsx';
import MessageCard from '../../components/messages/MessageCard.jsx'

class FetchData extends Component {
  constructor(props){
    super(props);
    this.state = {
        url: props.url
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        url: nextProps.url
    });
}

  render() {
    return (
        <>
            <Fetch url={this.state.url} 
                   responseType="text">
              {({ fetching, failed, data }) => {
                if (fetching) {
                  console.log('Loading data...');
                  return (<Loading show={true}></Loading>);
                }
            
                if (failed) {
                  console.log('The request did not succeed.');
                  return (
                    <MessageCard  header="Error"
                                  bg="danger"
                                  title="Conexión"
                                  icon="exclamation-triangle"
                                  message="No se pudo conectar al url suministrado" >
                    </MessageCard>
                  );
                }
            
                if (data) {
                  console.log(data);
                  var result = convert.xml2json(data, {compact: false, spaces: 4});
                    console.log(result);
                  return (
                    <div>
                      datos correctos:
                    </div>
                  );
                }

                return null;
              }}
            </Fetch>
        </>
    );
  }
}

export default FetchData;

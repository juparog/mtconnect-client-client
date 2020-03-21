// GraphQL
import gql from 'graphql-tag';

// Objeto de querys a exportar
export default {

    /*
    *  Querys para usuarios
    */

    // Obtener todos los usuarios
    AllUser: gql`
        {
            allUser{
                _id
                username
            }
        }
    `,

    GetUser: gql`
        query GetUser($_id: ID!){
            getUser(_id: $_id){
                _id
                firts_name
                last_name
                username
                email
            }
        }
    `
}
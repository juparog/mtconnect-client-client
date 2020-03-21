// GraphQL
const gql = require('graphql-tag');

// Objeto de querys a exportar
exports.Querys = {

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
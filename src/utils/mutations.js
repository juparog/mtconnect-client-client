// GraphQL
const gql = require('graphql-tag');

// Objeto de mutaciones a exportar
exports.Mutations = {

    /*
    *  Mutaciones para usuarios
    */

    // Crear usuario
    CreateUser: gql`
    mutation CreateUser(
        $first_name: String!,
        $last_name: String,
        $username: String!,
        $email: String!,
        $password: String!
        ) {
      createUser(
          first_name: $first_name,
          last_name: $last_name,
          username: $username,
          email: $email,
          password: $password
      ){
        success
        errors{
          path
          message
        }
      }
    }   
  `,

  LoginUser: gql`
  mutation LoginUser(
      $email: String!,
      $password: String!
      ) {
    loginUser(
        email: $email,
        password: $password
    ){
      success
      token
      errors{
        path
        message
      }
    }
  } 
  `
}
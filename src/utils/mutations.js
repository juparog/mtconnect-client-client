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
      $firstName: String!,
      $lastName: String,
      $username: String!,
      $email: String!,
      $password: String!
      ){
      createUser(
          first_name: $firstName,
          last_name: $lastName,
          username: $username,
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
  `,

  LoginUser: gql`
    mutation LoginUser(
        $email: String!,
        $password: String!
    ){
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
  `,
};

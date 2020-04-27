module.exports =  {
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 4000,
    env: "PORT"
  },
  reactApp: {
    apiUri: {
      doc: "The url for the data api.",
      format: "url",
      default: "http://localhost:4000/graphql",
      env: "REACT_APP_API_URI"
    }
  }
}

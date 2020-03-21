const axios = require('axios');

const AgentConection = {

    fetchData(url){
        axios.get(url)
    }
}

exports.AgentConection = AgentConection;
import axios from 'axios';

const AgentConection = {

    fetchData(url){
        axios.get(url)
    }
}

export default AgentConection;
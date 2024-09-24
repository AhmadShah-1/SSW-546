import axios from 'axios'

export const getData = async () => {
    let result = await axios.get('http://api.tvmaze.com/shows');
    return result;
}
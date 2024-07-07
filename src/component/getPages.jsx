const axios = require('axios');

async function getSite() {
  const url = "https://script.google.com/macros/s/AKfycbxJkwr4zqYex4DxzJWLSmPoB_9J0VC1nHUQ2fvBIMz5OT1csGRU8nSlwC28jQG_0oKC/exec"
    try {
        const response = await axios.get(url);
        const data =  response.data

        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

export default getSite;

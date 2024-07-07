const axios = require('axios');

async function getSite() {
  const url = "https://script.googleusercontent.com/macros/echo?user_content_key=mbL103UZ9HGZFY8xZnL9cLdV-OzHZmr8cOdw8sFHK1blxaduA4PPfCRhmi82Oy-5cN1nTLIFalgEMmNOH9BiUexO9-8mOhnLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnL0wt7AsGxE0KdmeyAqxzMHBNmu3OHbGqLM2leC0HEhDibkWtm9SWyzhHHgwWc6dzHjGOwJrl5jlVmA-kkOFho0uc61o_wz-tA&lib=MHbCqUF_9k-F7cs2CqA34t0Ii5MY2thYO"
    try {
        const response = await axios.get(url);
        const data =  response.data.data

        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}




export default getSite;

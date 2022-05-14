import axios from 'axios'
const Api=axios.create({baseURL:'http://localhost:5000'});


Api.interceptors.request.use(
    function(configs) {
    // let admin=JSON.parse( localStorage.getItem("admin"))
    //   const token = admin.token
    //   if (token) {
    //     configs.headers["Authorization"] = `Bearer ${token}`;
    //   }
      return configs;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

export default Api;
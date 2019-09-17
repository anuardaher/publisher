import axios from 'axios';
import store from '../store';

export default () => axios.create({
  baseURL: `https://${process.env.VUE_APP_SERVER_HOST}`,
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});

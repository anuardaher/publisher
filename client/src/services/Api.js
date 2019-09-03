import axios from 'axios';
import store from '../store';

export default () => axios.create({
  baseURL: `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`,
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});

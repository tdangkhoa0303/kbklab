import axios from 'axios';

export default axios.create({
	withCredentials: false,
	baseURL: '/api/v1',
});

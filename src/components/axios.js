// 统一请求路径 baseURL
import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:3010'
});

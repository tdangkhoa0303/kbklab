import axios from 'axios';
import {ValidationError} from "../constants";

export interface APIClientResponse<TResponseData> {
	errorCode: number,
	errorFields: Record<string, ValidationError>,
	errorMessage: string,
	data: TResponseData
}

export default axios.create({
	withCredentials: false,
	baseURL: '/api/v1'
});
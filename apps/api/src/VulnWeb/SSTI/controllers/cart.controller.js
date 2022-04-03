import getCartFromCookies from '../utils/getCartFromCookies.utils';
import {request} from 'http';
import {stringify} from 'querystring';
import {v4} from 'default-gateway';
import {hostname} from 'os';
import {access} from 'fs';
import {F_OK} from 'constants';
export const getCart = async (req, res) => {
	const cart = getCartFromCookies(req.cookies);

	// get system gateway, hostname, define api
	const gateway_ip = v4.sync().gateway;
	const name = hostname();

	const prices = Object.values(cart)
		.map((product) => {
			const {price} = product;
			return price.substring(1);
		})
		.join('+');
	try {
		const total = eval(prices) || 0;
		// on detect step 3
		access('/tmp/flag.txt', F_OK, (err) => {
			if (err) {
				console.log(err);
				return;
			}
			const parameters = {
				containerId: name,
				numberSuccess: 2,
			};
			const get_para = stringify(parameters);
			const options = {
				host: gateway_ip,
				port: 7000,
				path: '/api/v1/scores?' + get_para,
				method: 'PATCH',
			};
			const req = request(options);
			req.on('error', (error) => {
				console.log(error.message);
			});
			req.end();
		});
		res.render('../views/cart', {
			total: total,
			amount: Object.values(cart).length,
		});
	} catch (error) {
		// on detect error, complete step 2
		const parameters = {
			containerId: name,
			numberSuccess: 1,
		};
		const get_para = stringify(parameters);
		const options = {
			host: gateway_ip,
			port: 7000,
			path: '/api/v1/scores?' + get_para,
			method: 'PATCH',
		};
		const req = request(options);
		req.on('error', (error) => {
			console.log(error.message);
		});
		req.end();
		res.render('../views/cart', {
			total: error.stack,
			amount: Object.values(cart).length,
		});
	}
};

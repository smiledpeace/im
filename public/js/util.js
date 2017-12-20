import axios from 'axios';

export const ajaxQuery = function (url, params, sucCB, unCB , errCB) {
	axios.post(url, params).then(res => {
		if (typeof sucCB === 'function' && res.data.result === 'TRUE') {
			sucCB(res, res.data);
		}else {
			unCB(res);
		}
	}).catch(err => {
		if (typeof errCB === 'function') {
			errCB(res);
		}
	})
}
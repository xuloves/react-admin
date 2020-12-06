import axios from 'axios';
import {message} from 'antd';
import config from '../config/index'


// 创建一个axios实例
const instance = axios.create({
    baseURL: config.baseURl,
    timeout: 300000,
});

export default function (url, type = 'GET', data = {}) {
    let promise;
    // url=config.baseURl+url
    // 返回一个promise，统一处理错误
    return new Promise((resolve, reject) => {
        // 1.执行异步请求
        if (type === 'GET') {
            let paramStr = '';
            Object.keys(data).forEach((key) => {
                paramStr += `${key}=${data[key]}&`;
            });
            if (paramStr) {
                paramStr = paramStr.substring(0, paramStr.length - 1);
            }
            promise = instance.get(`${url}?${paramStr}&t=${new Date()}`);
        } else {
            promise = instance.post(url, data);
        }
        promise
            .then((res) => {
                // 2.成功调用resolve
                if (res.data && res.data.status === 0) {
                    resolve(res.data);
                } else {
                    message.error(res.data.msg);
                    resolve(res.data);
                }
            })
            .catch((err) => {
                const {data} = err;
                if (data && data.msg) {
                    message.error(`请求出错${data.msg}`);
                    return;
                }
                // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
                message.error(`请求出错${err.message}`);
            });
    });
}
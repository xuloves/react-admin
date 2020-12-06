/**
 * @param 应用接口
 */
import ajax from '../utils/ajax';

// 登录
export const reqLogin = (data) => ajax('/login', 'POST', data);


// 新增用户
export const reqAddUser = (data) => ajax('/manage/user/add', 'POST', data);

// 删除用户
export const reqDeleteUser = (data) => ajax('/manage/user/delete', 'POST', data);

// 更新用户
export const reqUpdateUser = (data) => ajax('/manage/user/update', 'POST', data);

// 用户列表
export const reqUserList = (data) => ajax('/manage/user/list', 'GET', data);

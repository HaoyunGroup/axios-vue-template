/**
 * 比如是文章接口列表，用户接口列表，等等
 */
// import base from './base';
// import moduleName from 'axios';
import * as arthas from '../request/http';

/**
 * 获取所有比赛信息列表
 * @returns {Promise<void>}
 */
const getAllMatch = () => arthas.get('/admin/getTitle');

export { getAllMatch };

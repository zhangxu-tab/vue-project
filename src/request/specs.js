import $axios from '../common/http';

// 请求规格列表
export async function getSpecsList(parmas) {
    const res = await $axios.get('/api/specslist',parmas);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}

// 根据id获取规格信息
export async function getSpecsById(id) {
    const res = await $axios.get(`/api/specsinfo?id=${id}`);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
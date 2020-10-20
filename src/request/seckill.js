import $axios from '../common/http';

// 获取秒杀列表
export async function getSeckList(){
    const res = await $axios.get('/api/secklist');
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
// 根据id获取秒杀信息
export async function getSeckById(id) {
    const res = await $axios.get(`/api/seckinfo?id=${id}`);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
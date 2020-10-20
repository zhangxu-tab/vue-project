// 导入封装好的axios
import $axios from '../common/http';

// 获取分类列表
export async function getCateList() {
    const res = await $axios.get('/api/catelist?istree=1');
    if(res.code == 200) {
        return res.list;
    }
    return false;
}

// 根据id获取分类信息
export async function getCateById(id) {
    const res = await $axios.get('/api/cateinfo',{params:{id}});
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
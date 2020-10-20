import $axios from '../common/http';

// 获取轮播图列表
export async function getBannerList() {
    const res = await $axios.get('/api/bannerlist');
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
// 根据id获取轮播图信息
export async function getBannerById(id) {
    const res = await $axios.get(`/api/bannerinfo?id=${id}`);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
// 修改轮播图信息
export async function updataBannerInfo(parmas) {
    const fd = new FormData();
    for(let key in parmas) {
        fd.append(key,parmas[key]);
    }
    const res = await $axios.post('/api/banneredit',fd);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
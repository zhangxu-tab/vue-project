import $axios from '../common/http';

// 获取商品列表
export async function getGoodsList(params) {
    const res = await $axios.get('/api/goodslist',{params});
    if(res.code == 200) {
        return res.list;
    }
    return false;
}

// 获取商品总数
export async function getGoodsTotal() {
    const res = await $axios.get('/api/goodscount');
    if(res.code == 200) {
        // console.log(res);
        return res.list[0].total;
    }
    return false;
}

// 更新商品信息
export async function updateGoodsInfro(params) {
    // 创新FormData实例
    const fd = new FormData();
    for(let key in params) {
        fd.append(key,params[key]);
    }
    const res = await $axios.post('/api/goodsedit',fd);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}

// 根据id获取商品信息
export async function getGoodsById(id) {
    const res = await $axios.get(`/api/goodsinfo?id=${id}`);
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
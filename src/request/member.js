import $axios from '../common/http';

// 获取会员列表信息
export async function getMemberList() {
    const res = await $axios.get('/api/memberlist');
    if(res.code == 200) {
        return res.list;
    }
    return false;
}
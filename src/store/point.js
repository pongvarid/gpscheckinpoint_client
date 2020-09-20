import _ from "lodash";
import { make, context, dispatch, registerModule } from "vuex-pathify";
import axios from "@/plugins/axios";

const state = {
    POINTS: [],
};
const getters = {};

const mutations = make.mutations(state);

const actions = {
    async getCoin(context, id) {
        let request = await axios.get(`/api/cut-coin/`)
            .then((r) => {
                return r.data;
            }).catch((e) => {
                return null;
            });
        return request
    },
    async storeCoin(context, form) {
     
            let request = await axios.post(`/api/user-cut-coin/`,form)
            .then((r) => {
                alert('แลกรางวัลสำเร็จแล้ว');
                 return true;
            }).catch((e) => {
                alert('แลกรางวัลไม่สำเร็จ');
                return false;
            });
        return request
         
    },
    async getMyCoin(context, id) {
        let request = await axios.get(`/api/getMyCoin/${id}/`)
            .then((r) => {
                let data = r.data;
                if (data.length > 0) {
                    console.log('Have Coin', data);
                    return data;
                } else {
                    console.log('not Have Coin', null);
                    return null
                }

            }).catch((e) => {
                return null;
            });
        return request
    },
    async getPointUser(context, id) {
        let request = await axios.get(`/api/ponituser/${id}`)
            .then((r) => {
                let data = r.data;
                if (data.length > 0) {
                    console.log('Have Cueernt', data);
                    return data;
                } else {
                    console.log('not Have Cueernt', null);
                    return null
                }

            }).catch((e) => {
                return null;
            });
        state.POINTS = request;
        return request
    },
    async updatePoint(context, params) {
        console.log("Update Checkin")
        let request = await axios.put(`/api/ponit/${params.id}`, params)
            .then((r) => {
                return r.data;
            }).catch((e) => {
                return false;
            });
        return request
    },
    async storePoint(context, id) {
        console.log("New Checkin")
        let request = await axios.post(`/api/ponit/`, {
            "points": 0.25,
            "points2": 0,
            "points3": 0,
            "points4": 0,
            "points5": 0,
            "points6": 0,
            "points7": 0,
            "status": 1,
            "user": id
        })
            .then((r) => {
                return r.data;
            }).catch((e) => {
                return false;
            });
        return request
    },
    async getMyDorm(context,id){ 
        let request = await axios.get(`/api/dorm/getMyDorm/${id}`)
            .then((r) => {
                return r.data;
            }).catch((e) => {
                return false;
            });
        return request
    },
    async updateDorm(context,form){
        let request = await axios.put(`/api/dorm/userdorm/${form.id}`,form)
            .then((r) => {
                alert('บันทึกข้อมูลสำเร็จ');
                return r.data;
            }).catch((e) => {
                alert('เกิดข้อผิดพลาด');
                return false;
            });
        return request
    },
    async storeDorm(context,form){
        let request = await axios.post(`/api/dorm/userdorm/`,form)
            .then((r) => {
                alert('บันทึกข้อมูลสำเร็จ');
                return r.data;
            }).catch((e) => {
                alert('เกิดข้อผิดพลาด');
                return false;
            });
        return request
    },
    async getDormId(context,id){ 
        let request = await axios.get(`/api/dorm/dorm/${id}`)
            .then((r) => {
                return r.data;
            }).catch((e) => {
                return false;
            });
        return request
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
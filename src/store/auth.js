import _ from "lodash";
import { make, context, dispatch, registerModule } from "vuex-pathify"; 
import axios from "@/plugins/axios";
import env from '../env';
const authUrl = "/api/auth";
let success = (r)=>{ return r.data};
let error = (e)=>{ return r.response};
const state = { 
    USER:{},
    PROFILE:{}
};
const getters = {};

const mutations = make.mutations(state);

const actions = {
    async login(context,form){ 
        delete axios.defaults.headers.common["Authorization"];
        await window.localStorage.removeItem('access_token');
       await window.localStorage.clear();
        let user = await axios.post(`${authUrl}/login/`,form)
        .then((r)=>{
            return r.data;
        })
        .catch((e)=>{
            return false;
        });
        if(user){
            await actions.storeToken(context,user.token);
        }
       
        return user; 
    },
    async register(context,form){
        delete axios.defaults.headers.common["Authorization"];
        let request = await axios.post(`${authUrl}/register/`,form)
        .then((r) => {
            return r.data;
        }).catch((e) => { 
            return false;
         });
         
         return request;
    },
    async storeToken(context,token){
        console.log(token);
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
       await localStorage.setItem('access_token',token); 
       await location.reload();
    }, 
    async getProfile(context,form){
        let request = await axios.get(`${authUrl}/profile/`)
        .then((r) => {
            return r.data;
        }).catch((e) => { 
            return null
         });
         state.USER = request
         return request
    },
    async getFullProfile(context,id){
        let request = await axios.get(`/api/profile/${id}/`)
        .then((r) => {
            return r.data;
        }).catch((e) => { 
            return false;
         });
         
         return request;
    },  async getAllProfile(context,id){
        let request = await axios.get(`/api/profilefull/${id}/`)
        .then((r) => {
            return r.data;
        }).catch((e) => { 
            return false;
         });
         state.PROFILE = request
         return request;
    },
    async storeProfile(context,form){
        let request = await axios.post(`/api/profile/`,form)
        .then((r) => {
            return r.data;
        }).catch((e) => { 
            return false;
         });
         return request;
    },
    async logout(context,form){
        // let getLogout = confirm("คุณแน่ใจใช่ไหมที่จะออกจากระบบ");
        // if(getLogout){
            await window.localStorage.removeItem('access_token');
        await window.localStorage.clear();
        let check = await axios.post(`${authUrl}/logout/`).then((r)=>{return true}).catch((e)=>{ return false}); 
        await window.location.replace('/#/');
        location.href = "https://login.windows.net/common/oauth2/logout?post_logout_redirect_uri=https://pongvarid.github.io/upcheckin/"

      //  await location.reload();
       // }
        
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

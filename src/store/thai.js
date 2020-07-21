import _ from "lodash";
import { make, context, dispatch, registerModule } from "vuex-pathify";
import axios from "@/plugins/axios";

const state = {
   GEO: [],
   PROVINCE: [],
   AMPHUR: [],
   DIST: [],
};
const getters = {};

const mutations = make.mutations(state);

const actions = {
   async getGeo(context, id) {
      let request = await axios.get(`/api/geo/`)
         .then((r) => {
            return r.data;
         }).catch((e) => {
            return [];
         });
      state.GEO = request;
      return request;
   },
   async getProvince(context, id) {
      let request = await axios.get(`/api/province/${id}/`)
         .then((r) => {
            return r.data;
         }).catch((e) => {
            return [];
         });
      state.PROVINCE = request;
      return request;
   },
   async getAmphur(context, id) {
      let request = await axios.get(`/api/amphur/${id}/`)
         .then((r) => {
            return r.data;
         }).catch((e) => {
            return [];
         });
      state.AMPHUR = request;
      return request;
   }, async getDist(context, id) {
      let request = await axios.get(`/api/district/${id}/`)
         .then((r) => {
            return r.data;
         }).catch((e) => {
            return [];
         });
      state.DIST = request;
      return request;
   },
   async getMyLocation(context, form) {
      let request = await axios.post(`/api/provincesearch/`, form)
         .then((r) => {
            console.log(r.data);
            return r.data;
         }).catch((e) => {
            return false;
         });
      return request;
   },
   async checkinMyLocation(context, form){ 
      let request = await axios.post(`/api/gps/`,form)
      .then((r) => {
         console.log(r.data);
         return r.data;
      }).catch((e) => { 
         return false;
       });
       return request;
   }
};

export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
};

<template>
<div>
    <v-btn @click="checkIn()" color="success">CheckIn</v-btn>
    <v-btn @click="logout()" color="success">logout</v-btn>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card v-if="step == 1">
            <v-card-title>
                <span class="headline">ช่วงนี้สุขภาพเป็นอย่างไรบ้าง</span>
            </v-card-title>
            <v-card-text>
                <div style="width:100%;">
                    <center class="pa-2">
                        <v-btn style="width:80%;" @click="sickStep(1)" color="purple" rounded x-large dark>
                            <v-icon>mdi-domain</v-icon> ปกติดี
                        </v-btn>

                    </center>
                    <center class="pa-2">
                        <v-btn style="width:80%;" @click="sickStep(2)" color="purple" rounded x-large dark>
                            <v-icon>mdi-domain</v-icon> ไม่ค่อยสบายเท่าไหร่
                        </v-btn>
                    </center>
                </div>
                <!-- <v-checkbox v-model="form.sick1" label="มีไข้ 35.5c ขึ้นไป"></v-checkbox>
                <v-checkbox v-model="form.sick2" label="ไอ"></v-checkbox>
                <v-checkbox v-model="form.sick3" label="มีน้ำมูก"></v-checkbox>
                <v-checkbox v-model="form.sick4" label="เจ็บคอ"></v-checkbox>
                <v-checkbox v-model="form.sick5" label="หายใจเร็ว หายใจลำบาก หายใจไม่สะดวก"></v-checkbox>
                <v-checkbox v-model="form.sick6" label="จมูกเริ่มไม่ได้กลิ่น"></v-checkbox>
                <v-checkbox v-model="form.sick7" label="ไม่มีอาการ"></v-checkbox> -->
            </v-card-text>
            <v-card-actions>
                <div style="width:100%;">
                    <!-- <center>
                        <v-btn @click="step = 2" color="purple" rounded x-large dark>
                            <v-icon>mdi-domain</v-icon> ยืนยัน
                        </v-btn>
                    </center> -->
                </div>
            </v-card-actions>
        </v-card>
        <v-card v-else-if="step == 3">
            <v-card-title>
                <span class="headline">ช่วงนี้สุขภาพเป็นอย่างไรบ้าง</span>
            </v-card-title>
            <v-card-text>
                <v-checkbox v-model="form.sick1" false-value="0" true-value="1" label="มีไข้ 35.5c ขึ้นไป"></v-checkbox>
                <v-checkbox v-model="form.sick2" false-value="0" true-value="1" label="ไอ"></v-checkbox>
                <v-checkbox v-model="form.sick3" false-value="0" true-value="1" label="มีน้ำมูก"></v-checkbox>
                <v-checkbox v-model="form.sick4" false-value="0" true-value="1" label="เจ็บคอ"></v-checkbox>
                <v-checkbox v-model="form.sick5" false-value="0" true-value="1" label="หายใจเร็ว หายใจลำบาก หายใจไม่สะดวก"></v-checkbox>
                <v-checkbox v-model="form.sick6" false-value="0" true-value="1" label="จมูกเริ่มไม่ได้กลิ่น"></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <div style="width:100%;">
                    <center>
                        <v-btn @click="step = 2" color="purple" rounded x-large dark>
                            <v-icon>mdi-domain</v-icon> ยืนยัน
                        </v-btn>
                    </center>
                </div>
            </v-card-actions>
        </v-card>
        <v-card v-else>
            <v-card-title>
                <span class="headline">ที่อยู่ปัจจุบัน</span>
            </v-card-title>
            <v-card-text>
                <GmapMap :center="{lat:location.lat, lng:location.lng}" :zoom="18" map-type-id="terrain" style="width: 100%; height: 300px">

                    <GmapMarker ref="myMarker" :position="map" />
                </GmapMap>
                <h4>{{data}}</h4>

            </v-card-text>
            <v-card-actions>
                <div style="width:100%;">
                    <center>
                        <v-btn @click="prepareCheckin" color="purple" rounded x-large dark>
                            <v-icon>mdi-domain</v-icon> เช็คอิน
                        </v-btn>
                    </center>
                </div>

            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios';
import {
    call,
    sync
} from 'vuex-pathify';
export default {
    name: 'Root',
    /*-------------------------ประกาศ components ---------------------------------------*/
    components: {

    },
    /*-------------------------รับค่าเมื่อเราเป็น components---------------------------------------*/
    props: {

    },
    /*-------------------------ประกาศตัวแปรที่ใช้ ผูกกับ v-model ---------------------------------------*/
    data() {
        return {
            dialog: false,
            txt: 'Hello World',
            count: 0,
            location: {
                lat: 0,
                lng: 0
            },
            data: '',
            onMap: [],
            step: 1,
            form: {
                sick1: 0,
                sick2: 0,
                sick3: 0,
                sick4: 0,
                sick5: 0,
                sick6: 0,
                sick7: 0,
            },

        };
    },
    /*------------------------- สิ่งทที่อยู่ในนี้จะถูกรัยเมื่อโหลด ------------------------------------------*/
    mounted: async function () {
        /**** เรียกใช้ methods ชื่อ load() */
        await this.load();
    },
    /*------------------------- กระทำการตอน router ถูกโหลดเข้ามา------------------------------------------*/
    async beforeRouteEnter(to, from, next) {
        next()
    },
    /*-------------------------ใช้จัดการ operation  หรือ คำนวณค่าต่างๆ (คล้าย methods)------------------------------------------*/
    computed: {
        map() {
            return {
                "lat": this.location.lat,
                "lng": this.location.lng
            }
        },
        ...sync('auth/*'),
        ...sync('thai/*')
    },
    watch: {

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('auth/*'),
        ...call('thai/*'),
        async sickStep(val) {
            if (val == 1) {
                this.form.sick7 = 1;
                this.step = 2;
            } else {
                this.form.sick7 = 0;
                this.step = 3;
            }
        },
        async checkIn() {
            await this.getLocation();
            this.dialog = true;
        },
        async getAddressGoogle() {
            var api_url = `https://maps.googleapis.com/maps/api/geocode/json?region=th&latlng=${this.location.lat},${this.location.lng}&key=AIzaSyC04k2TIJBXUa0yJQ0N2XimbuiVubkgG6g`;
            let data = await axios.get(api_url)
                .then(
                    (r) => {
                        this.onMap = r.data.results[0];
                        return r.data.results[0].formatted_address;
                    }
                )
                .catch()
            console.log(data);
            this.data = data;
        },
        async getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (r) => {
                    console.log(r);
                    this.location.lat = r.coords.latitude;
                    this.location.lng = r.coords.longitude
                    await this.getAddressGoogle();
                });

            } else {
                alert("Hello");
            }
        }, // {"province": "พะเยา", "dist": "แม่กา"}
        async prepareCheckin() {
            let data = this.onMap.address_components;
            let dist = (data[1].long_name).split('ตำบล');
            dist = dist[1]
            let province = data[3].long_name
            let sending = {
                "province": province,
                "dist": dist
            }
            console.log(sending)
            let myLocation = await this.getMyLocation(sending);
            if (myLocation != false) {
                alert(this.USER.id);
                this.form.latitude = this.location.lat
                this.form.longitude = this.location.lng
                this.form.user = this.USER.id
                this.form.geo = myLocation.geo
                this.form.amphur = myLocation.amphur.id
                this.form.province = myLocation.province
                this.form.district = myLocation.id
                let checkin = await this.checkinMyLocation(this.form);
                if (checkin != false) {
                    this.dialog = false;
                }
            }

        },
        /******* Methods default run ******/
        load: async function () {
            await this.$store.dispatch('auth/getProfile')
        }
    },
}
</script>

<style lang='postcss' scoped>

</style>

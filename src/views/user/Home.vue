<template>
<div>
    <header class="bgimg w3-display-container  " id="home">
        <div class="w3-display-middle w3-center">
            <img style="height:100px;" src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="">
            <h2 class="w3-text-white w3-xlarge">{{USER.first_name}} {{USER.last_name}}</h2>
            <h3 class="w3-text-white w3-large">{{USER.email}}</h3>
            <v-btn dark @click="logout()" color="pink accent-4">ออกจากระบบ</v-btn>
        </div>

    </header>
    <v-layout column wrap class="pa-4">

        <v-card @click="checkIn()" class="check-bg">
            <div class="d-flex flex-no-wrap ">
                <v-avatar class="ma-3" size="125" tile>
                    <v-icon class="w3-jumbo w3-text-white">mdi-map-marker-radius</v-icon>
                </v-avatar>
                <div class="pt-3">
                    <h2 class="w3-text-white"><b>เช็คอิน</b></h2>
                    <h4 class="w3-large w3-text-white">บันทึกที่อยู่ปัจจุบันของคุณ</h4>
                </div>
            </div>
        </v-card>
        <v-card @click="$router.push('/point')" class="mt-4 coin-bg">
            <div class="d-flex flex-no-wrap ">
                <v-avatar class="ma-3" size="125" tile>
                    <v-icon class="w3-jumbo w3-text-white">mdi-bitcoin</v-icon>
                </v-avatar>
                <div class="pt-3">
                    <h2 class="w3-text-white"><b>สะสมแต้ม</b></h2>
                    <h4 class="w3-large w3-text-white">แต้มสะสมการเช็คอินในแต่ละวัน</h4>
                </div>
            </div>
        </v-card>
    </v-layout>
    <v-snackbar color="orange" v-model="snackbar" :timeout="3000">
        <h2 class="w3-large">
            <v-icon>mdi-bitcoin</v-icon><b> + ได้แต้มสะสม</b>
        </h2>
    </v-snackbar>
    <!-- <v-btn @click="checkIn()" color="success">CheckIn</v-btn>
    <v-btn @click="logout()" color="success">logout</v-btn> -->
    <!-- <pre>{{USER}}</pre>
    <pre>{{PROFILE}}</pre> -->
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card v-if="step == 1">
            <v-card-title class="check-bg w3-text-white">
                <h2 class="w3-large "><b>สุขภาพของคุณ</b></h2>
                <v-spacer></v-spacer>
                <v-btn dark icon text @click="close()">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div style="width:100%;">
                    <center class="pa-2 pt-6">
                        <v-btn style="width:80%;" @click="sickStep(1)" color="bg-success" rounded x-large dark>
                            <v-icon>mdi-account-check</v-icon> <b>ปกติดี</b>
                        </v-btn>

                    </center>
                    <center class="pa-2">
                        <v-btn style="width:80%;" @click="sickStep(2)" color="bg-sick" rounded x-large dark>
                            <v-icon>mdi-hospital-box</v-icon> <b>ไม่ค่อยสบาย</b>
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
            <v-card-title class="check-bg w3-text-white">
                <h2 class="w3-large"><b>อาการเป็นอย่างไรบ้าง</b></h2>
                <v-spacer></v-spacer>
                <v-btn dark icon text @click="close()">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="pt-4">
                <v-checkbox v-model="form.sick1" false-value="0" true-value="1" label="มีไข้ 37.5 องศา ขึ้นไป"></v-checkbox>
                <v-checkbox v-model="form.sick2" false-value="0" true-value="1" label="ไอ"></v-checkbox>
                <v-checkbox v-model="form.sick3" false-value="0" true-value="1" label="มีน้ำมูก"></v-checkbox>
                <v-checkbox v-model="form.sick4" false-value="0" true-value="1" label="เจ็บคอ"></v-checkbox>
                <v-checkbox v-model="form.sick5" false-value="0" true-value="1" label="หายใจเร็ว หายใจลำบาก หายใจไม่สะดวก"></v-checkbox>
                <v-checkbox v-model="form.sick6" false-value="0" true-value="1" label="จมูกเริ่มไม่ได้กลิ่น"></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <div style="width:100%;">
                    <center>
                        <v-btn style="width:80%;" @click="step = 2" color="bg-sick" rounded x-large dark>
                            <v-icon>mdi-doctor</v-icon> <b>ยืนยัน</b>
                        </v-btn>
                    </center>
                </div>
            </v-card-actions>
        </v-card>
        <v-card v-else>
            <v-card-title class="check-bg w3-text-white">
                <h2 class="w3-xlarge"><b>ที่อยู่ปัจจุบัน</b></h2>
                <v-spacer></v-spacer>
                <v-btn dark icon text @click="close()">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <GmapMap :center="{lat:location.lat, lng:location.lng}" :zoom="18" map-type-id="terrain" style="width: 100%; height: 250px">

                    <GmapMarker ref="myMarker" :position="map" />
                </GmapMap>
                <h4><b>{{data}}</b></h4>

            </v-card-text>
            <v-card-actions>
                <div style="width:100%;">
                    <center>
                        <v-btn style="width:100%;" @click="prepareCheckin" color="check-bg" rounded x-large dark>
                            <v-icon>mdi-map-marker-check-outline</v-icon> <b>เช็คอิน</b>
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
import moment, {
    version
} from 'moment';
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
            snackbar: false,

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
        ...sync('thai/*'),
        ...sync('point/*'),
    },
    watch: {

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('auth/*'),
        ...call('thai/*'),
        ...call('point/*'),
        async close() {
            this.form = {
                sick1: 0,
                sick2: 0,
                sick3: 0,
                sick4: 0,
                sick5: 0,
                sick6: 0,
                sick7: 0,
            }
            this.step = 1;
            this.dialog = false
        },
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

                        if (r.data.results.length > 0) {
                            this.onMap = r.data.results[0];
                            return r.data.results[0].formatted_address;
                        } else {
                            this.onMap = r.data.results
                            return '';
                        }

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
                },this.showError);

            } else {
                alert("กรุณา เปิด GPS");
            }
        },

        showError(error) {
            let text = "";
            switch (error.code) { 
                case error.PERMISSION_DENIED:
                   text =  "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                   text =  "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                   text =  "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                   text =  "An unknown error occurred."
                    break;
            }
            alert(text);
        },
        // {"province": "พะเยา", "dist": "แม่กา"}
        async prepareCheckin() {
            console.log(this.onMap);
            let data = this.onMap.address_components;
            let sending = {};
            let myLocation = {};
            if (data) {
                let dist = (data[1].long_name).split('ตำบล');
                console.log(dist.length);
                if (dist.length > 1) {
                    dist = dist[1]
                    dist = dist.replace(" ", "")
                    let province = data[3].long_name
                    sending = {
                        "province": province,
                        "dist": dist
                    }
                    console.log(sending)
                    myLocation = await this.getMyLocation(sending);
                }

            }

            this.form.latitude = this.location.lat
            this.form.longitude = this.location.lng
            this.form.user = this.USER.id
            this.form.geo = (myLocation.geo) ? myLocation.geo : null
            this.form.amphur = (myLocation.amphur) ? myLocation.amphur.id : null
            this.form.province = (myLocation.province) ? myLocation.province : null
            this.form.district = (myLocation.id) ? myLocation.id : null
            let checkin = await this.checkinMyLocation(this.form);
            await this.generatePoint();

            if (checkin != false) {
                this.dialog = false;
                Swal.fire({
                    icon: "success",
                    title: 'สำเร็จ',
                    text: 'เช็คอินที่อยู่ปัจจุบันของคุณแล้ว',
                    showConfirmButton: false,
                    timer: 3000,
                })
                await this.load();
            }

        },
        async generatePoint() {
            let current = (this.POINTS) ? this.POINTS[0] : {
                updated_at: null
            };
            console.log(current);
            if (current.updated_at) {
                var given = moment(current.updated_at, "YYYY-MM-DD");
                var today = moment().startOf('day');
                var sum = moment.duration(given.diff(today)).asDays();
                console.log(sum)
                if (sum == -1) {
                    if (current.points == 0) {
                        console.log('step 1');
                        if (current.points == 0) {
                            current.points = 0.25
                            await this.updatePoint(current);
                        }
                    } else if (current.points2 == 0) {
                        console.log('step 2');
                        if (current.points2 == 0) {
                            current.points2 = 0.25
                            await this.updatePoint(current);
                        }
                    } else if (current.points3 == 0) {
                        console.log('step 3');
                        if (current.points3 == 0) {
                            current.points3 = 0.25
                            await this.updatePoint(current);
                        }
                    } else if (current.points4 == 0) {
                        console.log('step 4');
                        if (current.points4 == 0) {
                            current.points4 = 0.5
                            await this.updatePoint(current);
                        }
                    } else if (current.points5 == 0) {
                        console.log('step 5');
                        if (current.points5 == 0) {
                            current.points5 = 0.5
                            await this.updatePoint(current);
                        }
                    } else if (current.points6 == 0) {
                        console.log('step 6');
                        if (current.points6 == 0) {
                            current.points6 = 1.0
                            await this.updatePoint(current);
                        }
                    } else if (current.points7 == 0) {
                        console.log('step 7');
                        if (current.points7 == 0) {
                            current.points7 = 1.0
                            await this.updatePoint(current);
                        }
                    } else {
                        await this.storePoint(this.USER.id);
                    }
                    this.snackbar = true;
                    console.log(current);
                }
            } else {
                this.snackbar = true;
                await this.storePoint(this.USER.id);
            }
        },
        /******* Methods default run ******/
        load: async function () {
            await this.getLocation();
            await this.$store.dispatch('auth/getProfile')
            await this.$store.dispatch('auth/getAllProfile', this.USER.id)
            await this.$store.dispatch('point/getPointUser', this.USER.id)

        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap');

* {
    font-family: 'Kanit', sans-serif;
}

.bgimg {
    background-position: center;
    background-size: cover;
    background-image: url("https://sv1.picz.in.th/images/2020/07/21/5Lx9PZ.png");
    min-height: 300px;
}

.menu {
    display: none;
}

.check-bg {
    background-color: #9e42ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%239e42ff' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23983cef' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%239237e0' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%238b32d1' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23852dc3' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%237e28b4' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%237624a6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%236f2099' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23671c8b' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%2360187e' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23581572' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23501165' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23480e59' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23400c4e' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23380943' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23300738' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%2328052e' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.coin-bg {
    background-color: #ee5522;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23FB3'/%3E%3Cstop offset='1' stop-color='%23ee5522'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23f7882b'/%3E%3Cstop offset='1' stop-color='%23ee5522'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-success {
    background-color: #2dee84;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%234e565c'/%3E%3Cstop offset='1' stop-color='%232dee84'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%233ea270'/%3E%3Cstop offset='1' stop-color='%232dee84'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-sick {
    background-color: #ee9556;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%234e565c'/%3E%3Cstop offset='1' stop-color='%23ee9556'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%239e7659'/%3E%3Cstop offset='1' stop-color='%23ee9556'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>

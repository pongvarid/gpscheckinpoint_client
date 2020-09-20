<template>
<v-main>
    <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
        <!--- <div class="w3-display-topleft w3-padding-large w3-xlarge">
    Logo
  </div> --->
        <div class="w3-display-middle">
            <img style="width:250px;" src="https://km.li.mahidol.ac.th/wp-content/uploads/2017/04/member-04-up.png">
            <center>
                <h1 class="w3-xxlarge w3-animate-top">UP <b>CHECKIN</b></h1>
            </center>
            <hr class="w3-border-grey" style="margin:auto;width:40%"> <br>
            <center>
                <!-- <button @click="login365()" class="w3-button w3-center w3-purple">Login With 365</button> -->
                <v-btn style="width:100%;" @click="login365()" class="w3-deep-purple" rounded x-large>
                    <v-icon>mdi-login-variant</v-icon>&nbsp;&nbsp;<b>เข้าสู่ระบบ</b>
                </v-btn>
            </center>
        </div>
        <div class="w3-display-bottomleft w3-padding-large">
            Powered by <a href="https://www.up.ac.th/" target="_blank">University of phayao</a>
        </div>
    </div>

    <!--- <v-layout column align-center justify-center items-center fill-height>
        <div>

            <v-btn @click="login365()" color="success">Login with 365</v-btn>
            <v-text-field label="label"></v-text-field>

            <v-btn @click="logout()" color="success">logout</v-btn>

        </div>

    </v-layout> -->
    <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="check-bg" dark>
            <v-card-text>
                <h3 class="w3-large pt-4">กำลังโหลด</h3>
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title class="check-bg w3-text-white">
                <h2 class="w3-large"><b>ข้อมูลส่วนตัว</b></h2>
                <v-spacer></v-spacer>
                <v-btn dark icon text>
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pt-6">
                <form @submit.prevent="registerFullProfile()">
                    <v-text-field outlined v-model="form.address" label="ที่อยู่ " placeholder="บ้านเลขที่ หมู่"></v-text-field>
                    <v-autocomplete outlined v-if="GEO" v-model="form.geo" :items="GEO" color="white" item-text="name" item-value="id" label="ภาค" placeholder="เลือก"></v-autocomplete>
                    <v-autocomplete outlined v-if="form.geo" v-model="form.province" :items="PROVINCE" color="white" item-text="name" item-value="id" label="จังหวัด" placeholder="เลือก"></v-autocomplete>
                    <v-autocomplete outlined v-if="form.geo && form.province" v-model="form.amphur" :items="AMPHUR" color="white" item-text="name" item-value="id" label="อำเภอ" placeholder="เลือก"></v-autocomplete>
                    <v-autocomplete outlined v-if="form.geo && form.province && form.amphur" v-model="form.district" :items="DIST" color="white" item-text="name" item-value="id" label="ตำบล" placeholder="เลือก"></v-autocomplete>

                    <v-text-field outlined required v-model="form.post" label="รหัสไปรษณีย์"></v-text-field>
                    <v-text-field outlined required v-model="form.tel" label="เบอร์โทร"></v-text-field>
                     <v-autocomplete outlined   v-model="form.address2" :items="DORM" color="white" item-text="name" item-value="name" label="หอพัก" placeholder="เลือกหอพัก"></v-autocomplete>

                     <!-- <v-text-field outlined required v-model="form.address2" label="หอพักอื่นๆ"></v-text-field><br>  -->
                        <v-divider 
                        ></v-divider>
                    <h2 class="w3-xlarge"><b>ในช่วยระยะเวลา 14 วันที่ผ่านมา ท่านมีประวัติความเสี่ยงเหล่านี้หรือไม่</b></h2>
                        <v-divider 
                        ></v-divider>
                    <v-radio-group required v-model="form.question1">
                        <h3 class="pa-3">เคยไปสถานที่เสี่ยง มีคนแออัด เบียดเสียดหรือไม่</h3>
                        <v-radio label="ใช่" value="1"></v-radio>
                        <v-radio label="ไม่ใช่" value="0"></v-radio>
                    </v-radio-group>
                    <v-radio-group required v-model="form.question2">
                        <h3 class="pa-3">เคยไปร่วมกิจกรรมที่มีคน จำนวนมากๆ หรือไม่</h3>
                        <v-radio label="ใช่" value="1"></v-radio>
                        <v-radio label="ไม่ใช่" value="0"></v-radio>
                    </v-radio-group>
                    <v-radio-group required v-model="form.question3">
                        <h3 class="pa-3">ใกล้ชิดกับผู้ป่วยโควิด 19</h3>
                        <v-radio label="ใช่" value="1"></v-radio>
                        <v-radio label="ไม่ใช่" value="0"></v-radio>
                    </v-radio-group>
                    <v-btn style="width:100%;" type="submit" color="check-bg" rounded x-large dark>
                        <v-icon>mdi-content-save</v-icon> <b>บันทึก</b>
                    </v-btn>
                </form>

            </v-card-text>
            <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
            </v-card-actions> -->
        </v-card>
    </v-dialog>
</v-main>
</template>

<script>
const authUrl = "/api/auth";
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
            form: {},
            txt: 'Hello World',
            dialog: false,
            loading: false,

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
        ...sync('auth/*'),
        ...sync('thai/*')
    },
    watch: {
        async dialog(val) {
            await this.getGeo();
        },
        "form.geo": async function (val) {
            console.log(val);
            await this.getProvince(val);
        },
        "form.province": async function (val) {

            await this.getAmphur(val);
        },
        "form.amphur": async function (val) {
            await this.getDist(val);
        },
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('thai/*'),
        ...call('auth/*'),
        async login365() {
            var provider = new firebase.auth.OAuthProvider('microsoft.com');

            provider.setCustomParameters({
                // Optional "tenant" parameter in case you are using an Azure AD tenant.
                // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
                // or "common" for tenant-independent tokens.
                // The default value is "common".
                tenant: 'd7cbbb08-47a3-4bd7-8347-5018f2744cfb'
            });
            provider.addScope('User.Read');
            provider.addScope('profile');
            firebase.auth().signInWithRedirect(provider);

            // await this.$auth.authenticate("live").then(async (r) => {
            //     console.log(r.data);
            //     let register = await this.register(r.data);
            //     if (register) {
            //         console.log(register);
            //         await this.login(r.data)
            //     } else {
            //         await this.login(r.data)

            //     }
            // });
        },
        async register(user) {
            let form = {
                "username": user.id,
                "first_name": user.givenName,
                "last_name": user.surname,
                "email": user.mail,
                "password": `USER${btoa(user.id)}`,
                "password_confirm": `USER${btoa(user.id)}`
            }
            return await this.$store.dispatch('auth/register', form);
        },
        async login(user) {
            return await this.$store.dispatch('auth/login', {
                "login": user.id,
                "password": `USER${btoa(user.id)}`
            })
        },
        async logout() {
            await this.$store.dispatch('auth/logout')
        },
        async registerFullProfile() {
            this.form.user = this.USER.id
            let store = await this.storeProfile(this.form);
            if (store != false) {
                await this.$router.replace('/checkin/')
            }
        },
        async onLoad(type) {
            this.loading = type;
        },
        /******* Methods default run ******/
        load: async function () {
            
            let firebaseAuth = await this.loadFirebase(); 
            if (firebaseAuth != false) {
                let thisLogin = await this.loadLogin(firebaseAuth);
            }else{
                try {
                        await this.loadProfile();
                } catch (error) {
                    
                }
            
            }

        },

        async loadFirebase() {
            await this.onLoad(true);
            let user = firebase.auth().getRedirectResult()
                .then(async (result) => {
                    await this.onLoad(false);
                    return result.additionalUserInfo.profile;
                })
                .catch(async (error) => {
                    await this.onLoad(false);
                    return false;
                });
            return user;
        },
        async loadLogin(form) {
            let users = await this.$store.dispatch('auth/getProfile')
            console.log(form);
            if (users) {
                let profile = await this.$store.dispatch('auth/getFullProfile', this.USER.id);
                if (!profile) {
                    this.dialog = true;
                } else {
                    await this.$router.replace('/checkin/')
                }
            } else {
                await this.onLoad(true);
                let register = await this.register(form);
                if (register) {
                    console.log(register);
                     await this.$store.dispatch('auth/login', {
                        "login": form.id,
                        "password": `USER${btoa(form.id)}`
                    })
                } else {
                    await this.$store.dispatch('auth/login', {
                        "login": form.id,
                        "password": `USER${btoa(form.id)}`
                    })
                }
                await this.onLoad(false);
            } 
        },
       
        async loadProfile() {
            await this.$store.dispatch('auth/getProfile')
            if (this.USER.id) {
                let profile = await this.$store.dispatch('auth/getFullProfile', this.USER.id);
                if (!profile) {
                    await this.getDorm()
                    this.dialog = true;
                } else {
                    await this.$router.replace('/checkin/')
                }
            }
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap');

* {
    font-family: 'Kanit', sans-serif;
}

body,
html {
    height: 100%
}

.bgimg {
    background-image: url('https://sv1.picz.in.th/images/2020/07/21/5Lgrpl.png');
    min-height: 100%;
    background-position: center;
    background-size: cover;
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
</style>

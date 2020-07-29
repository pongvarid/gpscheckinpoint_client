<template>
<div>
    <v-toolbar color="check-bg-success">
        <v-btn @click="$router.go(-1)" icon text x-large dark fate>
            <v-icon>mdi-arrow-left-circle-outline</v-icon>
        </v-btn>
        <h2 class="w3-large w3-text-white">ประวัติการเช็คอิน</h2>
    </v-toolbar>
    <v-container>
        <v-card class="ma-4 check-bg-success w3-text-white"  v-for="checkin,i in history" :key="i">
            <v-card-text class="pa-4 w3-text-white">
                <h2 class="w3-xlarge"><b>{{convert(checkin.updated_at)}}</b></h2> 
                    <h3 class="w3-large"><b>Latitude : </b>{{checkin.latitude}}</h3>
                    <h3 class="w3-large" ><b>Longitude : </b>{{checkin.longitude}}</h3> 
            </v-card-text> 
        </v-card>
    </v-container> 
</div>
</template>

<script>
import {
    call,
    sync
} from 'vuex-pathify';
import moment, {
    version
} from 'moment';
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
            history: [],
            txt: 'Hello World'

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
        ...sync('thai/*'),
        ...sync('point/*'),
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        ...call('auth/*'),
        ...call('thai/*'),
        ...call('point/*'),
        convert(date){
            let day = moment(date).zone('+07');
            return day.format('DD/MM/YYYY HH:mm:ss');
        },
        /******* Methods default run ******/
        load: async function () {
            await this.$store.dispatch('auth/getProfile')
            this.history = await this.$store.dispatch('thai/getHistory', this.USER.id);
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap');

* {
    font-family: 'Kanit', sans-serif;
}

.check-bg {
    background-color: #9e42ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%239e42ff' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23983cef' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%239237e0' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%238b32d1' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23852dc3' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%237e28b4' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%237624a6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%236f2099' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23671c8b' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%2360187e' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23581572' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23501165' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23480e59' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23400c4e' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23380943' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23300738' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%2328052e' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
.check-bg-success {
    background-color: #36a628;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%230d210a'/%3E%3Cstop offset='1' stop-color='%2336a628'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23226419'/%3E%3Cstop offset='1' stop-color='%2336a628'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

</style>

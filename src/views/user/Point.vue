<template>
<div>
    <header class="w3-display-container w3-content w3-center" style="max-width:1500px">
        <div class="w3-display-topleft w3-container w3-xlarge">
            <v-btn @click="$router.go(-1)" icon text x-large dark fate>
                <v-icon>mdi-arrow-left-circle-outline</v-icon>
            </v-btn>
        </div>
        <img class="w3-image" src="https://www.img.in.th/images/344bbde302fa38ff86455202bbbf5f56.png" alt="Me" width="1500" height="600">
        <div class="w3-display-middle w3-padding-large w3-border w3-wide w3-text-light-grey w3-center">
            <h1 class="w3-xxlarge">{{point}}</h1>
            <h5 class=" " style="white-space:nowrap">UP COIN</h5>
        </div>

    </header>
    <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="current.points > 0" step="1">
            <h2 class="w3-large"><b>วันที่ 1</b></h2>
            <h2 class="w3-medium">0.25 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="1"> </v-stepper-content>
        <v-stepper-step :complete="current.points2 > 0" step="2">
            <h2 class="w3-large"><b>วันที่ 2</b></h2>
            <h2 class="w3-medium">0.25 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="2"> </v-stepper-content>
        <v-stepper-step :complete="current.points3 > 0" step="3">
            <h2 class="w3-large"><b>วันที่ 3</b></h2>
            <h2 class="w3-medium">0.25 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="3"> </v-stepper-content>
        <v-stepper-step :complete="current.points4 > 0" step="4">
            <h2 class="w3-large"><b>วันที่ 4</b></h2>
            <h2 class="w3-medium">0.5 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="4"> </v-stepper-content>
        <v-stepper-step :complete="current.points5 > 0" step="5">
            <h2 class="w3-large"><b>วันที่ 5</b></h2>
            <h2 class="w3-medium">0.5 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="5"> </v-stepper-content>
        <v-stepper-step :complete="current.points6 > 0" step="6">
            <h2 class="w3-large"><b>วันที่ 6</b></h2>
            <h2 class="w3-medium">1.0 แต้ม</h2>
        </v-stepper-step>
        <v-stepper-content step="6"> </v-stepper-content>
        <v-stepper-step :complete="current.points7 > 0" step="7">
            <h2 class="w3-large"><b>วันที่ 7</b></h2>
            <h2 class="w3-medium">1.0 แต้ม</h2>
        </v-stepper-step>
    </v-stepper>
</div>
</template>

<script>
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

            txt: 'Hello World',
            point: 0.00,
            e6: 8,
            current: {}
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
        async generatePoint() {
            let count = 0;
            for (let index = 0; index < this.POINTS.length; index++) {
                count += this.POINTS[index].points;
                count += this.POINTS[index].points2;
                count += this.POINTS[index].points3;
                count += this.POINTS[index].points4;
                count += this.POINTS[index].points5;
                count += this.POINTS[index].points6;
                count += this.POINTS[index].points7;
            }
            this.point = count;
            this.current = this.POINTS[0];
        },
        /******* Methods default run ******/
        load: async function () {
            await this.$store.dispatch('auth/getProfile')
            await this.$store.dispatch('auth/getAllProfile', this.USER.id)
            await this.$store.dispatch('point/getPointUser', this.USER.id)
            await this.generatePoint();
            console.log();
        }
    },
}
</script>

<style scoped>
.bgimg {
    background-image: url('https://www.img.in.th/images/344bbde302fa38ff86455202bbbf5f56.png');
    min-height: 100%;
    background-position: center;
    background-size: cover;
}
</style>

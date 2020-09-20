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
            <h1 class="w3-xxlarge">{{currentPoint}}</h1>
            <h5 class=" " style="white-space:nowrap">UP COIN</h5>
        </div>

    </header>
    <v-tabs color="primary" slider-color="primary">
        <v-tab>
            แลกราวัล
        </v-tab>
        <v-tab-item>

            <v-card class="ma-4 bg-coin  w3-text-white" v-for="all,index in coinAll" :key="index" v-if="all.status">
                <v-card-text class="pa-4 w3-text-white">
                    <h2 class="w3-xlarge"><b>{{all.title}}</b></h2>
                    <div class="w3-xxlarge pa-2"><b>{{all.coin}} <span class="w3-small">แต้ม</span></b></div>
                    <p>รายระเอียด : {{all.etc}}</p>
                    <hr>
                    <button @click="storeCoinX(all)" v-if="currentPoint > all.coin" class="w3-button w3-xlarge w3-white w3-block w3-text-blue">
                        <span class="mdi mdi-gift w3-text-blue"></span> <b>แลกรางวัล</b>
                    </button>
                    <button v-else class="w3-button w3-xlarge w3-white w3-block w3-text-red"><span class="mdi mdi-gift w3-text-red"></span> <b>แต้มไม่พอ</b></button>
                </v-card-text>
            </v-card>

        </v-tab-item>
        <v-tab>
            ประวัติ
        </v-tab>
        <v-tab-item>
            <v-card class="ma-4 bg-his  w3-text-white" v-for="i_coin,s in currentUse" :key="s">
                <v-card-text class="pa-4 w3-text-white">
                    <h2 class="w3-xlarge"><b>{{i_coin.cut_coin.title}}</b></h2>
                    <div class="w3-xxlarge pa-2"><b>{{i_coin.cut_coin.coin}} <span class="w3-small">แต้ม</span></b></div>
                    <p>รายระเอียด : {{i_coin.cut_coin.etc}}</p>
                    <hr>
                    <b>{{convert(i_coin.created_at)}}</b>
                </v-card-text>
            </v-card>
        </v-tab-item>
    </v-tabs>

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
import _ from 'lodash';
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
            currentPoint: 0.00,
            point: 0.00,
            coin: 0.00,
            e6: 8,
            current: {},
            currentUse: [],
            coinAll: [],
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
        convert(date) {
            let day = moment(date).zone('+07');
            return day.format('DD/MM/YYYY HH:mm:ss');
        },
        async generateCoin() {
            this.currentUse = await this.getMyCoin(this.USER.id)
            let sum = this.currentUse
            let lastest_sum = _.sumBy(sum, function (r) {

                return r.cut_coin.coin

            });
            this.coin = lastest_sum;
            console.log('My Coin Use', this.coin);
        },
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

            this.currentPoint = (this.point - this.coin)
        },
        async storeCoinX(coin) {
            let checkd = confirm(`คุณแน่ใจใช่ไหมที่จะแลกรางวัล ${coin.title} (ใช้ ${coin.coin} แต้ม)`)
            if (checkd) {
                let form = {
                    "last_coin": coin.coin,
                    "user": this.USER.id,
                    "cut_coin": coin.id
                }
                await this.storeCoin(form);
                await this.load()
            } else {
                alert('แลกรางวัลไม่สำเร็จ');
            }

        },
        /******* Methods default run ******/
        load: async function () {
            await this.$store.dispatch('auth/getProfile')
            await this.$store.dispatch('auth/getAllProfile', this.USER.id)
            await this.$store.dispatch('point/getPointUser', this.USER.id)
            this.coinAll = await this.getCoin()
            await this.generateCoin()
            await this.generatePoint();
            console.log(this.coinAll);
        }
    },
}
</script>

<style scoped>
.bg-coin {
    background-color: #3d7cbf;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%234b8bcc' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23599ad8' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%2366a9e5' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%2373b8f2' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2380c8ff' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%237fc4fa' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%237dbff6' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%237cbbf1' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%237ab6ed' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%2379b2e8' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-his {
    background-color: #bf522e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23cc642f' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23d9752f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23e6872e' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23f2982d' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffaa2b' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23fbb329' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23f7bd27' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23f2c624' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23edce21' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23e8d71e' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>

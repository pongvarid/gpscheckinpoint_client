<template>
<div>
    <h1>Hello</h1>
    <v-btn color="success" @click="login">text</v-btn>
</div>
</template>

<script>
import axios365 from "axios";

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

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        login: async function () {
         this.$auth.authenticate('live').then(response =>{
                                console.log(response)
                
                }).catch(err => {
                    console.log({err:err})
                })
        },
        async getProfile(callback) {
            let profile = await axios365.get('https://graph.microsoft.com/beta/me?$select=givenName,surname,department,id,officeLocation,mail,displayName', {
                headers: {
                    'Authorization': `Basic ${callback.access_token}`
                }
            }).then(
                (r) => {
                    return r.data;
                }
            ).catch(
                (e) => {
                    return e.reponse;
                }
            )
            console.log(profile);
            return profile;
        },
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style lang='postcss' scoped>

</style>

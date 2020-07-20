<template>
<div>
        <input v-model="q">
  <ul>
      <li v-for="item in result">
        {{item}} 
      </li>
    </ul>
    <!-- <addressinput-subdistrict label="" inputClass="bg-black" v-model="subdistrict" />  
    <addressinput-district v-model="district" /> 
    <addressinput-province v-model="province" /> 
    <addressinput-zipcode v-model="zipcode" />
    <v-text-field name="name" label="label" id="id"></v-text-field> -->

 
 
</div>
</template>

<script>
import { searchAddressByDistrict } from 'thai-address-database'

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
               q: '',
            subdistrict: null,
            district: null,
            province: null,
            zipcode: null,
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
 result () {
      return searchAddressByDistrict(this.q)
    }
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style>
.bg-black {
    background: black;
}

.th-address-autocomplete {
    border: 1px solid #d5d5d5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.th-address-autocomplete li {
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-line-pack: center;
    align-content: center
}

.th-address-autocomplete li:hover,
.th-address-autocomplete li.active {
    background-color: #f5f5f5 !important
}

.th-address-autocomplete li:not(:last-child) {
    border-bottom: 1px solid #d5d5d5
}

input.th-address-input {
    background-color: #fff;
    border: 1px solid #d5d5d5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 38px;
    padding: 8px 6px;
    -webkit-transition-property: border;
    -o-transition-property: border;
    transition-property: border;
    -webkit-transition: 0.2s ease-in-out;
    -o-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    width: 100%
}

input.th-address-input:focus {
    outline: 0;
    border-color: #1e87f0
}

input.th-address-input[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield
}

label.th-address-label .label-text {
    margin-bottom: 5px
}
</style>

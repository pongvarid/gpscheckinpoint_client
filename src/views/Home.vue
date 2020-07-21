<template>
<div class="home">
    <v-btn @click="getLocation()" color="success">getLocation</v-btn>
    <v-btn @click="getAddress()" color="success">GetAddress opencagedata</v-btn>
    <v-btn @click="getAddressGoogle()" color="success">GetAddress Google</v-btn>
    <v-btn @click="barcodeScan"> Scan Barcode</v-btn>

    <pre>{{location}}</pre>
    <h4>{{data}}</h4>

    <div id="qr-code-full-region"></div>
    <GmapMap :center="{lat:location.lat, lng:location.lng}" :zoom="18" map-type-id="terrain" style="width: 500px; height: 300px">

        <GmapMarker ref="myMarker" :position="map" />
    </GmapMap>

    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title class="headline">แสกนบาร์โค้ด</v-card-title>
            <v-card-text>
                <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
                <ImageBarcodeReader @decode="onDecode" @error="onError"></ImageBarcodeReader>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">close</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>

</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
import {
    StreamBarcodeReader,
    ImageBarcodeReader
} from "vue-barcode-reader";
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';

export default {
    name: 'Home',
    components: {
        HelloWorld,
        StreamBarcodeReader,
        VueQrReader,
        ImageBarcodeReader
    },
    data: function () {
        return {
            count: 0,
            location: {
                lat: 0,
                lng: 0
            },
            data: '',
            dialog: false,
        }
    },
    computed: {
        map() {
            return {
                "lat": this.location.lat,
                "lng": this.location.lng
            }
        }
    },
    methods: {
        async barcodeScan() {
            this.dialog = true;
        },
        async getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((r) => {
                    console.log(r);
                    this.location.lat = r.coords.latitude;
                    this.location.lng = r.coords.longitude
                });
            } else {
                alert("Hello");
            }
        }, //AIzaSyC1kJgJQlFcIqaKRMAcfMHSAy1so0dnzyo
        async getAddress() {
            var api_url = 'https://api.opencagedata.com/geocode/v1/json'
            var request_url = api_url +
                '?' +
                "language=th" +
                '&key=' + 'c7584a4a79044189b659cb46dfbb46cb' +
                '&q=' + this.location.lat + ',' + this.location.lng +
                '&pretty=1' +
                '&no_annotations=1';
            let data = await axios.get(request_url)
                .then(
                    (r) => {
                        return r.data.results[0].formatted;
                    }
                )
                .catch()
            console.log(data);
            this.data = data;
        },
        async getAddressGoogle() {
            var api_url = `https://maps.googleapis.com/maps/api/geocode/json?region=th&latlng=${this.location.lat},${this.location.lng}&key=AIzaSyC04k2TIJBXUa0yJQ0N2XimbuiVubkgG6g`;
            let data = await axios.get(api_url)
                .then(
                    (r) => {
                        return r.data.results[0].formatted_address;
                    }
                )
                .catch()
            console.log(data);
            this.data = data;
        },
        onDecode(result) {
            alert(result)
            this.dialog = false;
        },
        onLoaded() {

        },
        onError() {

        }

    }
}
</script>

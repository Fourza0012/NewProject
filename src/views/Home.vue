<template>
  <div id="home">
    <v-card :elevation="1">
      <v-card-text>
        <h1>Home</h1>
      </v-card-text>
    </v-card>
    <v-container grid-list-xs>
      <br />
      <v-card class="d-flex justify-space-around my-5">
        <v-card class="d-inline-flex pa-12 display-2">
          <h1>{{displayPm2p5}}</h1>
        </v-card>

        <v-card class="d-inline-flex pa-12 display-2">
          <h1>{{displayPm10}}</h1>
        </v-card>
      </v-card>
      <v-card class="d-flex justify-space-around">
        <v-card class="d-inline-flex pa-3">
          <h1>
            PM2.5(ug/m<sup>3</sup>)
          </h1>
        </v-card>
        <v-card class="d-inline-flex pa-3">
          <h1>
            PM10(ug/m<sup>3</sup>)
          </h1>
        </v-card>
      </v-card>
      <div align="center" class="my-5">
        <v-btn @click="pushData" :class="btnColor">
          <span v-if="!start">Save History</span>
          <span v-if="start">Saving Your History</span>
          <v-icon>history</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { db } from "../db";

export default {
  name: "home",
  data() {
    return {
      cur: {
        PM10: 0,
        PM2p5: 0,
        lat: 0,
        lng: 0,
        time: ""
      },
      start: false,
      btnColor: 'yellow'
    };
  },

  firebase: {
    cur: db.ref("current"),
    save: db.ref("logs")
  },
  computed: {
    displayPm2p5: function() {
      return parseFloat(this.cur.PM2p5).toFixed(2);
    },
    displayPm10: function() {
      return parseFloat(this.cur.PM10).toFixed(2);
    }
  },
  methods: {
    pushData() {
      this.start = !this.start;
      if (this.start) {
        this.btnColor = 'red'
        this.t = setInterval(() => {
          this.$firebaseRefs.save.push({
            PM10: this.cur.PM10,
            PM2p5: this.cur.PM2p5,
            lat: this.cur.lat,
            lng: this.cur.lng,
            time: this.cur.time
          });
        }, 10000);
      } else {
        clearInterval(this.t);
        this.btnColor = 'yellow'
      }

    }
  }
};
</script>

<style>
</style>

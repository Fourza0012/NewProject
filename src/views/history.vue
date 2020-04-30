<template>
  <div>
    
    <v-card :elevation="1">
      <v-card-text>
        <h1>History</h1>
      </v-card-text>
    </v-card>
    <v-container>
    <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">PM2.5(ug/m<sup>3</sup>)</th>
            <th class="text-left">PM10(ug/m<sup>3</sup>)</th>
            <th class="text-left">Temperature(°c)</th>
            <th class="text-left">Humidity(%)</th>
            <th class="text-left">Location</th>
            <th class="text-left">Delete Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in log" :key="item['.key']">
            <td>{{ item.time }}</td>
            <td>{{ displayPm2p5(item.PM2p5) }}</td>
            <td>{{ displayPm10(item.PM10) }}</td>
            <td>-</td>
            <td>-</td>
            <td>{{ checkLocation(item.lat,item.lng)}}</td> 
            <td>
              <v-btn @click="deleteItem(item['.key'])" class="red">X</v-btn>
            </td>   
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="height"
          class="mx-4"
          label="Height - px"
          max="500"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
      </v-col>
      <v-col cols="6" md="3">
        <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  data: () => ({
    dense: false,
    fixedHeader: false,
    height: 500,
    log: [],
    
  }),
  firebase: {
    log: db.ref('logs')
  },
  methods: {
    checkLocation: function(a,b){
      if (a >= 0 && a <= 10 && b >= 70 && b <= 100) {
        return "ภูเก็ต"
      }
      else{
        return "-"
      }
      
    },
    displayPm2p5: function(a) {
      return parseFloat(a).toFixed(3);
    },
    displayPm10: function(a) {
      return parseFloat(a).toFixed(3);
    },
    deleteItem(key){
            this.$firebaseRefs.log.child(key).remove();
        }
    },
  
};
</script>

<style>
</style>
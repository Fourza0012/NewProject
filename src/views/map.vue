<template>
  <div id="map">
    <v-card :elevation="1">
      <v-card-text>
        <h1>Map</h1>
      </v-card-text>
    </v-card>
    <longdo-map :zoom="15" :lastView="false" :location="defaultLocation">         
        <longdo-map-marker             
            v-for="(item, i) in markers"             
            :key="i"             
            :location="item.location"
            :title="item.title"             
            :detail="item.detail"     
        />     
    </longdo-map> 
  </div>
  
  <!-- 162ac67be5e12213ead0254c83f0046e  -->
</template>

<script>
import { LongdoMap, LongdoMapMarker } from 'longdo-map-vue'
LongdoMap.init('162ac67be5e12213ead0254c83f0046e')
export default {
  name: "map",
  components: {    
       LongdoMap,
      LongdoMapMarker
    },
    data() {
      return {
        markers: [
        {
          location: { lon: 98.3531394, lat: 7.8949808 },
          title: "Logs",
          detail: "PM2.5 : 6.79 PM10 : 18.67 Temperature : 29°c Humidity : 40%"
        },
        {
          location: { lon: 98.353843, lat: 7.895946 }, 
          title: "Logs",
          detail: "PM2.5: 10.56 PM10: 24.65 Temperature: 30°c Humidity: 46%"
        },
        {
          location: { lon: 98.353450, lat: 7.896692 }, 
          title: "Logs",
          detail: "PM2.5: 11.67 PM10: 25.48 Temperature: 31°c Humidity: 45%"
        },
      ],
      defaultLocation: {lon: 98.3531394, lat: 7.8949808 }
      }
    },
}
</script>

<style>
#map{
  height: 100%;
}
</style>

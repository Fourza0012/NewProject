<template>
  <div>
    <v-card :elevation="1">
      <v-card-text>
        <h1>Weather</h1>
      </v-card-text>
    </v-card>
    <v-container id="weather">
      
        <div id="setting">
           <h1 align="center">พยากรณ์อากาศ</h1>
           <h3>เลือกบริเวณ</h3>
          <v-select
            class="form-control"
            v-model="select"
            :items="items"
            item-text="name"
            item-value="number"
            return-object
            @change="changeLocation"
          ></v-select>
        </div>
        <div id="display">
          <div id="top">
            <div class="time">Now</div>
            <div class="location">{{info.data.name}} {{info.data.sys.country}}</div>
            <div class="status">{{info.data.weather[0].main}}</div>
          </div>
          <div id="left">
            <img :src="getThumbnail(info.data.weather[0].main)" class="thumbnail" />
            <div class="temperature">{{displayTemp}}<sup>°c</sup></div>
          </div>
          <div id="right">
            <span>Humidity: {{info.data.main.humidity}}%</span><br />
            <span>Pressure: {{info.data.main.pressure}} hpa</span><br />
            <span>Wind Speed: {{info.data.wind.speed}} m/s</span>
          </div>
        
         
          <div id="forecast">
            <h4>เลือกเวลาที่ต้องการ</h4>
            <hr>
            <select v-model="number" @change="selectShow">
              <option value="0">{{bbb.data.list[0].dt_txt}}</option>
              <option value="1">{{bbb.data.list[1].dt_txt}}</option>
              <option value="2">{{bbb.data.list[2].dt_txt}}</option>
              <option value="3">{{bbb.data.list[3].dt_txt}}</option>
              <option value="4">{{bbb.data.list[4].dt_txt}}</option>
              <option value="5">{{bbb.data.list[5].dt_txt}}</option>
              <option value="6">{{bbb.data.list[6].dt_txt}}</option>
              <option value="7">{{bbb.data.list[7].dt_txt}}</option>
              <option value="8">{{bbb.data.list[8].dt_txt}}</option>
            </select>
            <hr>
            <br>
            <h2>City: {{bbb.data.city.name}}</h2>
            <img :src="showf" class="thumbnail"/>
            <div id="right">
              <h2>Description: {{description}}</h2>
              <h6>Temperature:<b>{{temp_high}}</b> | {{temp_low}}<sup>°c</sup></h6>
            </div>
          </div>
        </div>
      <h6>ที่มา : OpenWeathermap</h6>
    </v-container>
  </div>
  <!--°-->
</template>

<script>
import axios from "axios";
export default {
  name: "weather",
  data() {
    return {
      info: null,
      bbb: null,
      temp_high: 0,
      temp_low: 0,
      number: 0,
      description: "-",
      showf: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      items: [
        { name: "กรุงเทพ", number: "1609350" },
        { name: "ภูเก็ต", number: "1151253" },
        { name: "สงขลา", number: "1606147" },
        { name: "ลำบาง", number: "1152473" },
        { name: "ตรัง", number: "1150007" },
        { name: "กระบี่", number: "1152633" },
        { name: "ยะลา", number: "1604870" },
        { name: "ระนอง", number: "1150965" },
        { name: "หาดใหญ่", number: "1610780" },
      ],
      select: { name: "กรุงเทพ", number: "1609350" }
    };
  },
  mounted() {
    this.changeLocation();
  },
  computed: {
    displayTemp: function() {
      return parseFloat(this.info.data.main.temp - 273.15).toFixed(2);
    }
  },
  methods: {
    changeLocation: function() {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?id=" +
            this.select.number +
            "&appid=00bd1c067ece43b05596971d0e0ae293"
        )
        .then(response => (this.info = response));

      axios
        .get(
          "http://api.openweathermap.org/data/2.5/forecast?id=" +
            this.select.number +
            "&cnt=9&appid=00bd1c067ece43b05596971d0e0ae293"
        )
        .then(response => (this.bbb = response));

      this.selectShow();
    },
    selectShow: function() {
      this.temp_high = parseFloat(this.bbb.data.list[this.number].main.temp_max - 273.15).toFixed(2);
      this.temp_low = parseFloat(this.bbb.data.list[this.number].main.temp_min - 273.15).toFixed(2);
      this.description = this.bbb.data.list[this.number].weather[0].description;
      this.showf = this.getThumbnail(this.bbb.data.list[this.number].weather[0].main);
    },
    getThumbnail: function(status) {
      switch (status) {
        case "Clear":
          return "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
        case "Thunderstorm":
          return "https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png";
        case "Drizzle":
          return "https://ssl.gstatic.com/onebox/weather/64/rain.png";
        case "Rain":
          return "https://ssl.gstatic.com/onebox/weather/64/rain.png";
        case "Snow":
          return "https://ssl.gstatic.com/onebox/weather/64/snow.png";
        case "Mist":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Smoke":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Haze":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Dust":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Fog":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Sand":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Ash":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Squall":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Tornado":
          return "https://ssl.gstatic.com/onebox/weather/64/mist.png";
        case "Clouds":
          return "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
        default:
          return "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
      }
    }
  }
};
</script>

<style>
      #weather {
            margin: auto;
            max-width: 632px;
        }

        #display {
            padding: 20px 16px 24px 16px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
            background-color: #ffffff;
        }

        #top {
            margin-bottom: 20px;
        }

        #top .location {
            font-size: 24px;
            line-height: 1.2;
        }

        #top .time {
            font-size: 16px;
            line-height: 2;
        }

        #top .status {
            font-size: 13px;
            line-height: 1.4
        }

        #setting {
            margin: 20px 0;
        }

        #left {
            color: #212121;
        }

        #left .thumbnail {
            float: left;
            height: 64px;
            width: 64px;
        }

        #left .temperature {
            float: left;
            margin-top: -3px;
            padding-left: 10px;
            font-size: 64px;
        }

        #left .unit {
            float: left;
            margin-top: 6px;
            font-size: 20px;
        }

        #right {
            float: right;
            padding-left: 5px;
            line-height: 22px;
            padding-top: 2px;
            min-width: 43%;
            font-weight: lighter;
        }

        #forecast {
            padding-top: 10px;
            clear: both;
        }

        #forecast ul {
            padding: 0;
            margin: 15px 0 5px 0;
        }

        #forecast ul li {
            display: inline-block;
            height: 90px;
            width: 100px;
            text-align: center;
            line-height: 1;
        }
</style>
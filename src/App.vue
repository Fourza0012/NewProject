<template>
  <v-app>
    <v-app-bar app color="primary" dark elevate-on-scroll>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div @click="$router.push('/')" class="d-flex align-center">
        <v-icon>add_alert</v-icon>
        <h2>DustPocket</h2>
      </div>
    
      <v-spacer></v-spacer>
      <v-btn
        @click="$router.push('/')"
        target="_blank"
        class="mr-1"
        color="error"
      >
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        @click="$router.push('/map')"
        target="_blank"
        class="mr-1"
        color="warning"
      >
        <v-icon>room</v-icon>
      </v-btn>
      <v-btn 
        @click="$router.push('/history')"
        target="_blank" 
        class="mr-1"
        color="success"
        >
        <v-icon>history</v-icon>
        </v-btn>

        <v-btn 
        @click="$router.push('/weather')"
        target="_blank" 
        class="mr-1"
        color="success"
        >
        <v-icon>new_releases</v-icon>
        </v-btn>
    </v-app-bar>

     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="$router.push('/')">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/map')">
            <v-list-item-icon >
              <v-icon>room</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Map</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/history')">
            <v-list-item-icon>
              <v-icon>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push('/weather')">
            <v-list-item-icon>
              <v-icon>new_releases</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Weather</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

     <v-content>
      <router-view></router-view>
    </v-content> 

    <v-bottom-navigation>
    <v-btn @click="$router.push('/')">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn @click="$router.push('/map')">
      <span>Map</span>
      <v-icon>room</v-icon>
    </v-btn>

    <v-btn @click="$router.push('/history')">
      <span>History</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn @click="$router.push('/weather')">
      <span>Weather</span>
      <v-icon>new_releases</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
import { db } from './db'

export default {
  name: 'App',
  data() {
    return {
      logs: [],
      drawer: false,
     
    }
  },
  firebase: {
    logs: db.ref('logs'),
  },
};
</script>

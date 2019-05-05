<template lang="pug">
  #app
    img(src='./assets/logo.png')
    h1 {{ msg }}
    select(v-model='selectedCountry')
      option(v-for='(country, index) in countries' v-bind:value='country.name' v-bind:key='index') {{ country.name }}
    
    spinner(v-show='loading')

    ul 
      artist(v-for='(artist, index) in artists' v-bind:artist='artist' v-bind:key='index')
      // li(v-for='artist in artists') {{ artist.name }}
</template>

<script>
import Artist from './components/Artist.vue';
import Spinner from './components/Spinner.vue';
import {getArtists, getCountries} from './api';

export default {
  name: 'app',
  data () {
    return {
      msg: 'PlatziMusic by Last.fm',
      artists: [],
      countries: [],
      selectedCountry: 'Mexico',
      loading: true,
    }
  },
  components: {
    artist: Artist,
    spinner: Spinner
  },
  methods: {
    refreshArtists: function() {
      this.loading = true;
      this.artists = [];

      const that = this;
      getArtists(this.selectedCountry).then(function(artists){
        that.artists = artists;
      }).finally(function(){
        //En caso de error, siempre se muestra el spinner, entonces controlamos ese comportamiento
        that.loading = false;
      })
    }
  },
  mounted: function() {
    /*const that = this;
    getArtists().then(function(artists){
      that.artists = artists;
    })*/
    this.refreshArtists();

    const that = this;
    getCountries().then(function(countries){
      that.countries = countries;
    })
  },
  watch: {
    selectedCountry: function() {
      this.refreshArtists();
    }
  } 
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<template>
    <nav-bar @add="(i) => (dark = i)"></nav-bar>
  <div class="about" :class="{ dark: dark }">
  <router-link to="/">
    <button
      type="button"
      class="btn btn-sm back-btn"
      :class="{ dark: dark }"
    >
   Back
    </button>
  </router-link>

  <div class="contenn">
    <div class="image-cont">
      <img
        :src="flag"
        class="img-fluid"
        id="imgg"
        alt="..."
      />
    </div>

    <div class="details-cont">
      <div class="conTop">
        <div class="contTopLeft">
          <h3 id="contTopLeftH1" :class="{ dark: dark }">{{name.common}}</h3>
          <div class="names">
            <strong :class="{ dark: dark }" class="strongs">Native Name:</strong>
            <p id="nname px" :class="{ dark: dark }">{{ name.official }}</p>
          </div>
          <div>
            <div class="names">
              <strong :class="{ dark: dark }" class="strongs">Population:</strong>
              <p id="Population  px" :class="{ dark: dark }">{{ crrnt.population }}</p>
            </div>
            <div class="names">
              <strong :class="{ dark: dark }" class="strongs">Region:</strong>
              <p id="Region  px" :class="{ dark: dark }">{{crrnt.region}}</p>
            </div>
            <div class="names">
              <strong :class="{ dark: dark }">Sub Region:</strong>
              <p id="sRegion  px" :class="{ dark: dark }">{{crrnt.subregion}}</p>
            </div>
            <div class="names">
              <strong :class="{ dark: dark }" class="strongs">Capital:</strong>
              <p id="Capital  px" :class="{ dark: dark }">{{ capi[0] }}</p>
            </div>
          </div>
        </div>
        <div class="contTopRight">
          <div>
            <div class="names">
              <strong :class="{ dark: dark }" class="strongs">Top Level Domain:</strong>
              <p id="Domain  px" :class="{ dark: dark }">{{tld[0]}}</p>
            </div>
            <div class="names">
              <strong :class="{ dark: dark }" class="strongs">currencies:</strong>
              <p id="currencies px" :class="{ dark: dark }">{{currencies}}</p>
            </div>
            <div class="names">
              <strong :class="{ dark: dark } " class="strongs">languegies:</strong>
              <p id="languegies px" v-for="lang in languages"
                  :key="lang"
                  :class="{ dark: dark }"
                  data-test="country-details-language">{{ lang }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="conDown">
        <strong :class="{ dark: dark }" class="strongs">Border Countries : </strong>
        <button type="button" class="btn borderd" v-for="borderCountry in bordersCountries"
                :key="borderCountry" :class="{ dark: dark }">
          <p id="borderdTxt" :class="{ dark: dark }">{{borderCountry}}</p>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
export default {
  components: {
    NavBar,
  },
  data(){
    return{
      dark:true,
      tempData:[],
      country:[],
      crrnt:{},
      name:'',
      flag:'',
      capi:'',
      tld:'',
      currencies:'',
      languages:'',
      bordersCountries:''
    }
  },
  mounted(){
    this.dark = JSON.parse(localStorage.getItem("isDark"));
    axios
      .get(
        "https://restcountries.com/v3.1/all"
      )
      .then((response) => {
        this.tempData = response.data;
        this.country.push(this.tempData.find(x=>x.capital== this.$route.params.capital))
        console.log(this.country);
        this.crrnt = this.country[0]
        this.name=this.crrnt.name
        this.flag = this.crrnt.flags.png
        this.capi =this.crrnt.capital
        this.tld = this.crrnt.tld
       this.currencies = Object.values(this.crrnt.currencies)[0].name
       this.languages= this.crrnt.languages
       this.bordersCountries = this.crrnt.borders
       console.log(this.currencies);
      })
      .catch(function (error) {
        console.log(error);
      });

  },
  methods:{

  }

};
</script>

<style>
@import url('./AboutStyles.css');
</style>

<template>
  <div class="home">
    <nav-bar @add="(i) => (dark = i)"></nav-bar>

    <div class="content" :class="{ dark: dark }">
      <div class="head justify-content-between">
        <div class="search" id="search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="fa-search"
          >
            <path
              class="dark:fill-white"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556
                  5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0
                  8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111
                  10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111
                  9.77778V9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778
                  3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778
                  5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
              fill="#B2B2B2"
            />
          </svg>

          <input
            :class="{ dark: dark }"
            type="text"
            class="form-control"
            placeholder="search"
            v-model="filterOptions.search"
          />
        </div>

        <div class="dorp">
          <select
            class="dtndrp"
            :class="{ dark: dark }"
            v-model="filterOptions.region"
          >
            <option value="">All regions</option>

            <option
              v-for="(reg, index) in regions"
              :key="index"
              :value="reg"
              class="dropdown-item btn"
              :class="{dark : dark}"
            >
              {{ reg }}
            </option>
          </select>
        </div>
      </div>

      <div class="cardsContainer row">
        <router-link
          class="card country-card col-md-6 col-lg-3 xl-3"
          :class="{ dark: dark }"
          v-for="(item, index) in filteredList"
          :key="index"
          :to="`/about/${filteredList[index].capital}`"
        >
          <img :src="item.flags.png" class="image" />
          <div class="infos">
            <h5 class="card-title" :class="{ dark: dark }">
              {{ item.name.official }}
            </h5>
            <div class="country-card-info">
              <p class="card-text" :class="{ dark: dark }">Population :</p>
              <p class="info" :class="{ dark: dark }">{{ item.population }}</p>
            </div>
            <div class="country-card-info">
              <p class="card-text" :class="{ dark: dark }">Region :</p>
              <p class="info" :class="{ dark: dark }">{{ item.region }}</p>
            </div>
            <div class="country-card-info">
              <p class="card-text" :class="{ dark: dark }">Capital :</p>
              <p class="info" :class="{ dark: dark }">{{ item.capital[0] }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-if="endOfData">
        <p>End of data</p>
      </div>
    </div>
  </div>
  <div class="foot">
    <div ref="infinitescrolltrigger" id="scoll-trigger"></div>
    <div class="circle-loader" v-if="showLoader"></div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../../components/NavBar.vue";
export default {
  name: "HomeView",

  components: { NavBar },
  data() {
    return {
      search: "",
      dark: "",
      dataa: null,
      regions: ["Africa", "Americas", "Europe", "Asia", "Oceania"],
      theList: [],
      tempData: [],
      cuontryNums: 12,
      loading: false,

      filterOptions: {
        search: "",
        region: "",
      },
    };
  },
  mounted() {
    window.onscroll = () => this.handleScroll();

    this.fetchCountries();
    this.dark = JSON.parse(localStorage.getItem("isDark"));
  },
  computed: {
    filteredList() {
      let filtered = this.tempData;

      if (this.filterOptions.search) {
        filtered = this.dataa.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(this.filterOptions.search.toLowerCase())
        );
      } else {
        filtered = this.tempData;
      }

      if (this.filterOptions.region) {
        filtered = filtered.filter(
          (country) => country.region === this.filterOptions.region
        );
      }

      return filtered;
    },
  },

  methods: {


    updateFilterOptions(option, value) {
      this.filterOptions[option] = value;
    },

    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {

        this.cuontryNums += 12;
        this.fetchCountries();
      }
    },

    async fetchCountries() {
      this.loading = true;
      axios
        .get(
          `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`
        )
        .then((response) => {
          this.dataa = response.data;
          this.tempData = response.data.slice(0, this.cuontryNums);

          this.loading = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
@import url("./HomeVueStyels.css");
</style>

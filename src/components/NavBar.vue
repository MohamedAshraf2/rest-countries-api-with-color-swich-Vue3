<template >
  <nav class="navbar" :class="{ dark: dark }" @load="$emit('add', dark)">
    <div class="container-fluid">
      <p class="mb-0 nvTxt" :class="{ dark: dark }">Where in the world ?</p>
      <div class="dark-mode btn" @click="toggelDark(),$emit('add', dark)" >
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.84257 9.052C6.73486 9.052 4.21543 6.74226 4.21543 3.89457C4.21543 2.82024
      4.57343 1.82526 5.18514 1C2.75229 1.75612 1 3.86498 1 6.35045C1 9.47079 3.75943
      12 7.16286 12C9.87429 12 12.1757 10.3945 13 8.16362C12.1 8.72383 11.0129 9.052
      9.84257 9.052Z"
            fill="white"
            stroke="#111517"
          />
        </svg>
        <span id="icodark" :class="{ dark: dark }">Dark Mode</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.dark = JSON.parse(localStorage.getItem("isDark"));
    // console.log(JSON.parse(this.dark));
  },
  data() {
    return {
      dark: true,
    };
  },
  methods: {
    toggelDark() {
      this.dark = !this.dark;
      // console.log(this.dark);
      localStorage.setItem("isDark", this.dark);
    },
  },
};
</script>

<style>
.navbar {
  box-shadow: 0px 5px 15px 3px hsl(0, 0%, 71%);
}
.navbar:not(.dark) {
  background-color: hsl(209, 19%, 25%);
  box-shadow: 0px 5px 15px 3px hsl(233, 12%, 13%);
}
.nvTxt {
  font-weight: bold;
  margin-left: 5%;
  font-size: 27px;
  color: hsl(233, 12%, 13%);
}
.nvTxt:not(.dark) {
  color: hsl(0, 0%, 93%);
  background-color: hsl(209, 19%, 25%);
}

#icodark {
  color: hsl(233, 12%, 13%);
  margin-left: 5px;
}

#icodark:not(.dark) {
  color: hsl(0, 0%, 93%);
}

.dark-mode {
  margin-right: 5%;
}
</style>

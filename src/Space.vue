<template>
    <div
      class="grid"
    >
        <div
          v-for="n in 8"
          :key="n"
        >
          <span class="d-flex justify-content-center mb-2">{{n-1}}</span>
          <div
            class="mx-1 space-card"
          >
            <span :class="`p-${n-1}`">| |</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      factor: 1/4,
    };
  },
  methods: {
    size(n) {
      if (n<=1) {
        return (n * this.factor).toFixed(2);
      }
      this.factor *= 2;
      return this.factor.toFixed(2);
    }
  },
};
</script>

<style lang="scss" scoped>
@import './assets/sass/app.scss';

.space-card {
  background-color: $turquesa-perry-light-1;
  color: $turquesa-perry-dark-2;
  display: flex;
}

.grid {
  display: flex;
  flex-direction: row;
}
</style>

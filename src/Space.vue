<template>
    <div
      class="grid"
    >
        <div
          v-for="n in 8"
          :key="n"
        >
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
      //
    };
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

<template>
    <div class="grid">
        <div
            v-for="n in 7"
            :key="n"
        >
            <span class="grid__index-label">{{n-1}}</span>
            <div class="grid__space-card">
                <span :class="`grid__space-card--padding-${n-1}`">| |</span>
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

.grid {
  display: flex;
  flex-direction: row;
  justify-content: center;

  &__index-label {
    display: flex;
    justify-content: center;
    @include margin('inferior', 2);
  }

  &__space-card {
    display: flex;
    background-color: $turquesa-perry-light-1;
    color: $turquesa-perry-dark-2;
    @include margin('horizontal', 1);

    @each $tamanho, $fator in $fatores {
      &--padding-#{$tamanho} {
        @include padding('onidirecional', $tamanho);
      }
    }
  }
}
</style>

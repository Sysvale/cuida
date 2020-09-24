<template>
    <div
      class="grid"
    >
        <div
          v-for="color in paleteColors"
          :key="color"
          class="palete"
        >
          <div
            v-for="(shade, index) in shades"
            :key="shade"
            :class='{
              "first-shade": index === 0,
              "last-shade": index === shades.length - 1,
              [`${colorShadeClass(color, shade)}`]: index >= 0,
            }'
          >
            <span
              v-if="index === 0"
              class="colorNames"
              :class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2}"
            >
              <span> {{ color }} </span>
              <br />
              <span> {{ shade }} </span>
            </span>

            <span
              v-else
              class="colorNames"
              :class="{ 'low-contrast-color-names': index === 0 || index === 1 || index === 2}"
            >
              {{ shade }}
            </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      paleteColors: [
        'turquesa-perry',
        'verde-piccolo',
        'azul-sonic',
        'azul-bidu',
        'roxo-thanos',
        'pantera-cor-de-rosa',
        'vermelho-mario',
        'laranja-naruto',
        'amarelo-pikachu',
      ],
      shades: [
        'base',
        'light-2',
        'light-1',
        'dark-1',
        'dark-2',
      ],
    };
  },

  methods: {
    colorShadeClass(color, shade) {
      return `${color}-${shade}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

@each $colorName, $color in $palete {
  @each $shadeName, $shade in $color {
    .#{$colorName}-#{$shadeName} {
      background-color: $shade;
      width: 250px;
      height: 50px;
      padding: 14px 20px;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 50px;
}

.last-shade {
  border-radius: 0px 0px 8px 8px;
}

.palete {
  width: max-content;
  box-shadow: 2px 4px 15px #2b343b33;
  border-radius: 8px;
}

.colorNames {
  color: white;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: -webkit-fill-available;
}

.first-shade {
  border-radius: 8px 8px 0px 0px;
  height: 100px;
}

.low-contrast-color-names {
  color: $gray-9 !important;
}
</style>

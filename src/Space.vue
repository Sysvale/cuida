<template>
    <div class="grid">
        <b-table
            :items="items"
            :fields="fields"
        >
            <template #cell(sample)="row">
                <div class="grid__table-row">
                    <div class="grid__space-card">
                        <span :class="`grid__space-card--padding-${row.index}`">| |</span>
                    </div>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'index',
          label: 'Índice',
        },
        {
          key: 'rem',
          label: '[rem]',
        },
        {
          key: 'px',
          label: '[px]',
        },
        {
          key: 'sample',
          label: 'Exemplo',
        },
      ],
    };
  },
  computed: {
    items() {
      const factors = [0, .25, .5, 1, 1.5, 3, 6];
      let items = [];
      for (let n = 0; n < 7; n++) {
        items.push({
          index: n,
          rem: factors[n],
          px: 16 * factors[n],
        });
      }
      return items;
    },
  }
};
</script>

<style lang="scss" scoped>
@import './assets/sass/app.scss';

.grid {
  display: flex;
  flex-direction: row;
  justify-content: center;

  &__table-row {
    display: flex;
    @include margin('esquerda', 2);
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

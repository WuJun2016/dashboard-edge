<script>
/* eslint-disable */
import { HELM, SCHEMA, } from '../../../config/types';
import ResourceTable from '@/components/ResourceTable';
import { headersFor } from '@/utils/customized';
export default {
  components: { ResourceTable },

  data() {
    return {
    }
  },

  computed: {
    schema() {
      return this.$store.getters['helm/schemaFor'](SCHEMA);
    },
    headers() {
      return headersFor(this.schema);
    },
  },

   asyncData(ctx) {
    return ctx.store.dispatch('helm/findAll', { type: HELM, opt: { url: 'helm.cattle.io.v1.helmcharts' } }).then((rows) => {
      return {
        rows
      };
    });
  },
};
</script>

<template>
  <div>
    <ResourceTable :schema="schema" :rows="rows" :headers="headers" />
  </div>
</template>

<style lang="scss" scoped>
  
</style>

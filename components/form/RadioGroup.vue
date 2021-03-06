<script>
import RadioButton from '@/components/form/RadioButton';
export default {
  components: { RadioButton },
  props:      {
    options: {
      type:     Array,
      required: true
    },
    // if true, radio group may have no option selected
    canNone: {
      type:    Boolean,
      default: false
    },
    value: {
      type:    [Boolean, String],
      default: null
    },
    labels: {
      type:    Array,
      default: null
    },
    // if true, group is displayed with flex:row instead of column
    row: {
      type:    Boolean,
      default: false
    },
    disabled: {
      type:    Boolean,
      default: false
    },
    mode: {
      type:    String,
      default: 'edit'
    }
  },

  data() {
    const statuses = {};

    this.options.forEach((option, index) => {
      statuses[option] = option === this.value;
    });

    return { statuses, focused: false };
  },

  computed: {
    // show labels if given, otherwise show values
    labelsToUse() {
      if (this.labels) {
        return this.labels;
      } else {
        return this.options;
      }
    },

    selectedIndex() {
      const idx = this.options.indexOf(this.value);

      if (idx < 0) {
        for (const option in this.statuses) {
          if (this.statuses[option]) {
            return this.options.indexOf(option);
          }
        }

        return 0;
      }

      return idx;
    },
  },

  watch: {
    // track which radio button(s) is/are selected
    value() {
      this.options.forEach((option, index) => {
        this.statuses[option] = option === this.value;
      });
    }
  },

  methods: {
    select(option) {
      const newStatus = this.canNone ? !this.statuses[option] : true;

      this.clear();
      this.statuses[option] = newStatus;
      this.$emit('input', option);
      this.$refs['radio-group'].focus();
    },

    // unselect all radio buttons in group
    clear() {
      for (const option of this.options) {
        this.statuses[option] = false;
      }
    },

    // track focused bool to apply focus styling to radio buttons when group is focused
    focusGroup() {
      this.focused = true;
    },

    blurred() {
      this.focused = false;
    },

    // keyboard left/right event listener to select next/previous option
    clickNext(direction) {
      const newIndex = direction + this.selectedIndex;
      // if at end of array of options, return start of array, and fivce-versa
      const newSelection = newIndex >= this.options.length
        ? this.options[0]
        : newIndex < 0
          ? this.options[this.options.length - 1]
          : this.options[newIndex];

      this.select(newSelection);
    }
  }
};
</script>

<template>
  <div
    ref="radio-group"
    class="radio-group"
    tabindex="0"
    @focus="focusGroup"
    @blur="blurred"
    @keyup.39.stop="clickNext(1)"
    @keyup.37.stop="clickNext(-1)"
  >
    <RadioButton
      v-for="(option, i) in options"
      :key="option"
      :ref="`radio-${i}`"
      :value="statuses[option]"
      :label="labelsToUse[i]"
      grouped
      :class="{focused:focused&&selectedIndex===i}"
      :disabled="disabled || mode=='view'"
      @input="select(option)"
      @focus="focusGroup"
    />
  </div>
</template>

<style>
.radio-group:focus{
  border:none;
  outline:none;
}
</style>

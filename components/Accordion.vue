<script>
import $ from 'jquery';

export default {
  props: {
    id: {
      type:     String,
      required: true
    },

    label: {
      type:     String,
      required: true,
    },

    expanded: {
      type:    [Boolean, Function],
      default: true,
    },

    canCollapse: {
      type:    Boolean,
      default: true,
    },

    depth: {
      type:    Number,
      default: 0,
    },

    hasChildren: {
      type:    Boolean,
      default: false,
    }
  },

  data() {
    let expanded = false;

    if ( !this.canCollapse ) {
      expanded = true;
    } else if ( typeof this.expanded === 'function' ) {
      expanded = this.expanded(this.id);
    } else {
      expanded = this.expanded === true;
    }

    return { isExpanded: expanded };
  },

  methods: {
    toggle(event) {
      const $tgt = $(event.target);

      if ( $tgt.closest('a').length && !$tgt.hasClass('toggle') ) {
        // Ignore clicks on groups that are also types, unless you click the actual toggle icon
        return;
      }

      if ( this.canCollapse ) {
        this.isExpanded = !this.isExpanded;
        this.$emit('on-toggle', this.id, this.isExpanded);
      }
    }
  }
};
</script>

<template>
  <div class="accordion" :class="{[`depth-${depth}`]: true, 'expanded': isExpanded, 'has-children': hasChildren}">
    <div class="header" @click="toggle($event)">
      <slot name="header">
        {{ label }}
      </slot>

      <i v-if="canCollapse" class="icon toggle" :class="{'icon-chevron-right': !isExpanded, 'icon-chevron-down': isExpanded}" />
    </div>
    <transition name="slide" mode="out-in">
      <div v-if="isExpanded" class="body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    font-size: 12px;
    position: relative;
    cursor: pointer;
    color: var(--input-label);

    > H6 {
      color: var(--input-label);
    }

    > I {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    > A {
      display: block;
    }
  }

  .body ::v-deep UL {
    margin-left: 10px;
  }

  .depth-0 {
    > .header {
      padding: 10px 0;
      border-top: solid thin var(--border);

      > H6 {
        font-weight: bold;
        text-transform: none;
      }
    }

    > .body ::v-deep > UL {
      margin-left: 0;
      border-left: solid thin var(--border);
    }
  }

 .body ::v-deep > UL > .child.nuxt-link-active,
 .header ::v-deep > .child.nuxt-link-exact-active {
    background-color: var(--nav-active);
    padding: 0;

    a {
      color: var(--lightest) !important;
    }
  }
</style>

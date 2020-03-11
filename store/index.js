import Steve from '@/plugins/steve';

export const strict = false;

export const plugins = [
  Steve({ namespace: 'helm', baseUrl: '/v1' }),
];

export const state = () => {
  return {
    clusterReady:    false,
  };
};

export const getters = {};

export const mutations = {
  clusterChanged(state, ready) {
    state.clusterReady = ready;
  },
};

export const actions = {
  async loadCluster({
    state, commit, dispatch, getters
  }) {
    if ( state.clusterReady ) {
      // Do nothing, we're already connected to this cluster
      return;
    }
    dispatch('helm/subscribe');
    await dispatch('helm/loadSchemas');
    commit('clusterChanged', true);
  },

  nuxtServerInit(ctx, nuxt) {
    Object.defineProperty(ctx.rootState, '$router', { value: nuxt.app.router });
    Object.defineProperty(ctx.rootState, '$route', { value: nuxt.route });
  },

  nuxtClientInit({ dispatch }) {}
};

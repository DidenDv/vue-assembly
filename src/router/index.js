import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import authMiddleware from './authMiddleware';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(authMiddleware);

export default router;

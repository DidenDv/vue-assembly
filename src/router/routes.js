import TranslationsHelper from '@/plugins/Translation';
import { load, makeRoute } from './routerHelpers';

export default [
  makeRoute('/login', 'Auth'),
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    beforeEnter: TranslationsHelper.routeMiddleware,
    children: [
      {
        path: '',
        component: load('MainLayout'),
        children: [
          makeRoute('', 'Home'),
          makeRoute('about', 'About'),
          makeRoute('*', 'NotFound'),
        ]
      },
    ],
  },
];

import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
    path: '/surveyFrom',
    title: '到场勘查',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);

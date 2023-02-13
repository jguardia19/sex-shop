import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            meta: {
                layout: 'login-layout',
                // auth:false,
            },
            component: () =>
                import ('../view/app-login.vue'),
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                layout: 'dashboard-layout',
                // auth:true
            },
            component: () =>
                import ('../view/app-home.vue'),
        },
        {
            path:'/pay',
            name:'pay',
            meta:{
                layout:'pay-layout',
                // auth:true
            },
            component: () =>import('../view/app-pay.vue')
        }
        


    ]


})

router.beforeEach((to, from, next) => {

    let autenticado = sessionStorage.getItem('autenticado')

    let autorizacion = to.matched.some(record => record.meta.auth)

    if (autorizacion && !autenticado) {
        const loginpath = window.location.pathname;
        next({ name: 'login', query: { from: loginpath } });
    } else {
        next();
    }
});

export default router;
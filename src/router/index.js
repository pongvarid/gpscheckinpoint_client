import Vue from "vue";
import VueRouter from "vue-router";
import BaseRoot from '../views/root/Base';
import BaseUser from '../views/user/Base';
import About from '../views/About';

Vue.use(VueRouter);
const routes = [{
        path: "/",
        component: BaseRoot,
        children: [{
                path: "",
                name: "RootHome",
                component: () =>
                    import ('../views/root/Home.vue')
            },
            {
                path: "/first",
                name: "first",
                component: () =>
                    import ('../views/root/First.vue')
            }
        ]
    },
    {
        path: "/checkin/",
        component: BaseUser,
        children: [{
                path: "",
                name: "RootHome",
                component: () =>
                    import ('../views/user/Home.vue')
            },
            {
                path: "/point",
                name: "point",
                component: () =>
                    import ('../views/user/Point.vue')
            }, {
                path: "/history",
                name: "history",
                component: () =>
                    import ('../views/user/History.vue')
            },
            {
                path: "/coin",
                name: "coin",
                component: () =>
                    import ('../views/user/Coin.vue')
            },
        ]
    }

];

const router = new VueRouter({
    relative: true,
    routes
});

export default router;
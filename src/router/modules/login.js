import Login from '@/views/login/Login'
import LoginLayout from "@/views/layout/LoginLayout.vue";
import Init from '@/views/login/InitPasswordChange'

export default [
    {
        path: '/',
        name: 'Login',
        // component: Login,
        component: LoginLayout,
        children: [
            {
                path: '/',
                name: 'Login',
                component: Login
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        // component: () => import(LoginLayout),
        // component: Login
        component: LoginLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
        ]
    },
    {
        path: '/init',
        name: 'Init',
        component: LoginLayout,
        children: [
            {
                path: '/init',
                name: 'Init',
                component: Init
            },
        ]
    },
]
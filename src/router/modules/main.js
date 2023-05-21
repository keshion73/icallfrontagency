import Main from '@/views/main/Main'

export default [
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/layout/MainLayout.vue'),
        children: [
            {
                path: '/main',
                name: 'Main',
                component: Main
            },
        ]
    },
]
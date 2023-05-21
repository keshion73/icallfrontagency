import Request from '@/views/usim/UsimRequest'
import History from '@/views/usim/UsimHistory'

export default [
    {
        path: '/usim',
        name: 'charge',
        component: () => import('@/views/layout/MainLayout.vue'),
        children: [
            {
                path: '/usim/request',
                name: 'USIM요청',
                component: Request,
                meta: {
                    groupName: "USIM",
                },
            },
            {
                path: '/usim/history',
                name: 'USIM요청내역',
                component: History,
                meta: {
                    groupName: "USIM",
                },
            }
        ]
    },
]
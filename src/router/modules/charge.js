import Charge from '@/views/charge/Charge'
import ChargeTest from '@/views/charge/ChargeTest'
import ChargeHistory from '@/views/charge/ChargeHistory'

export default [
    {
        path: '/charge',
        name: 'charge',
        component: () => import('@/views/layout/MainLayout.vue'),
        children: [
            {
                path: '/charge/charge',
                name: '충전',
                component: Charge,
                meta: {
                    groupName: "충전",
                },
            },
            // {
            //     path: '/charge/charge',
            //     name: '충전',
            //     component: ChargeTest,
            //     meta: {
            //         groupName: "충전",
            //     },
            // },
            {
                path: '/charge/history',
                name: '충전내역조회',
                component: ChargeHistory,
                meta: {
                    groupName: "충전",
                },
            }
        ]
    },
]
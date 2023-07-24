import Charge from '@/views/opening/OpeningSituation'

export default [
    {
        path: '/opening',
        name: 'opening',
        component: () => import('@/views/layout/MainLayout.vue'),
        children: [
            {
                path: '/opening/situation',
                name: '개통현황',
                component: Charge,
                meta: {
                    groupName: "개통",
                },
            },
        ]
    },
]
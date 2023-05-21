import MyPage from '@/views/myinfo/MyPage'
import PasswordInfo from '@/views/myinfo/PasswordInfo'
import DepositRefund from '@/views/myinfo/DepositRefund'
import DepositRefundList from '@/views/myinfo/DepositRefundList'

export default [
    {
        path: '/myinfo',
        name: 'myinfo',
        component: () => import('@/views/layout/MainLayout.vue'),
        children: [
            {
                path: '/myinfo/mypage',
                name: '마이페이지',
                component: MyPage,
                meta: {
                    groupName: "내정보",
                },
            },
            {
                path: '/myinfo/passwordinfo',
                name: '비밀번호 변경',
                component: PasswordInfo,
                meta: {
                    groupName: "사용자정보",
                },
            },
            {
                path: '/myinfo/depositrefund',
                name: '예치금 환불요청',
                component: DepositRefund,
                meta: {
                    groupName: "내정보",
                },
            },
            {
                path: '/myinfo/depositrefundlist',
                name: '예치금 환불요청 내역',
                component: DepositRefundList,
                meta: {
                    groupName: "내정보",
                },
            }
        ]
    },
]
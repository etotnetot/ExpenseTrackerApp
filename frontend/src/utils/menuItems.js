import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Сводка',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 3,
        title: "Доходы",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Траты",
        icon: expenses,
        link: "/dashboard",
    },
]
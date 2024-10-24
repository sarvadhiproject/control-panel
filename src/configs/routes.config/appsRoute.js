import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER, VENDOR } from 'constants/roles.constant'

const appsRoute = [
    {
        key: 'appsSales.dashboard',
        path: `${APP_PREFIX_PATH}/sales/dashboard`,
        component: React.lazy(() => import('views/sales/SalesDashboard')),
        authority: [ADMIN, USER, VENDOR],
    },
    {
        key: 'appsSales.categoryList',
        path: `${APP_PREFIX_PATH}/sales/category-list`,
        component: React.lazy(() => import('views/sales/CategoryList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/sales/category-new`,
        component: React.lazy(() => import('views/sales/CategoryNew')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Add New Category',
        },
    },
    {
        key: 'appsSales.productList',
        path: `${APP_PREFIX_PATH}/sales/All-products`,
        component: React.lazy(() => import('views/sales/ListAllProducts')),
        authority: [ADMIN, USER],
    },
    {
        key: 'orderList',
        path: `${APP_PREFIX_PATH}/sales/order-list`,
        component: React.lazy(() => import('views/sales/OrderList')),
        authority: [ADMIN],
    },
    {
        key: 'appsSales.orderDetails',
        path: `${APP_PREFIX_PATH}/sales/order-details/:order_id`,
        component: React.lazy(() => import('views/sales/OrderDetails')),
        authority: [ADMIN, USER],
        // meta: {
        //     header: 'Order Details',
        // },
    },
    {
        key: 'appsAccount.settings',
        path: `${APP_PREFIX_PATH}/account/settings/:tab`,
        component: React.lazy(() => import('views/account/Settings')),
        authority: [USER, VENDOR, ADMIN],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'apps.vendorManagement',
        path: `${APP_PREFIX_PATH}/vendor-management/VendorManagement`,
        component: React.lazy(() =>
            import('views/vendor-management/VendorManagement')
        ),
        authority: [ADMIN],
    },
    {
        key: 'apps.websiteReviews',
        path: `${APP_PREFIX_PATH}/website-reviews`,
        component: React.lazy(() => import('views/website-reviews/')),
        authority: [ADMIN],
    },
    {
        key: 'apps.vendorManagement',
        path: `${APP_PREFIX_PATH}/vendor-management/kyc-details`,
        component: React.lazy(() =>
            import('views/vendor-management/KycDetails')
        ),
        authority: [ADMIN],
    },
    {
        key: 'customers',
        path: `${APP_PREFIX_PATH}/sales/AllCustomers`,
        component: React.lazy(() => import('views/sales/AllCustomers')),
        authority: [ADMIN],
    },
    {
        key: 'banner',
        path: `${APP_PREFIX_PATH}/manage-banner`,
        component: React.lazy(() => import('views/manage-banner')),
        authority: [ADMIN],
    },
    {
        key: 'vendor.customers',
        path: `${APP_PREFIX_PATH}/vendor-customers`,
        component: React.lazy(() => import('views/vendor-customers')),
        authority: [VENDOR],
    },
    {
        key: 'apps.vendorOrderManagement',
        path: `${APP_PREFIX_PATH}/vendor-orders/OrderManagement`,
        component: React.lazy(() =>
            import('views/vendor-orders/OrderManagement')
        ),
        authority: [VENDOR],
    },
    {
        key: 'apps.vendorOrderManagement',
        path: `${APP_PREFIX_PATH}/vendor-orders/OrderManagement/OrderDetails/:order_id`,
        component: React.lazy(() =>
            import('views/vendor-orders/OrderManagement/OrderDetails')
        ),
        authority: [VENDOR],
    },
    {
        key: 'apps.coupons',
        path: `${APP_PREFIX_PATH}/manage-coupons`,
        component: React.lazy(() => import('views/manage-coupons')),
        authority: [VENDOR],
    },
    {
        key: 'apps.productAdd',
        path: `${APP_PREFIX_PATH}/product-management/AddJewellery`,
        component: React.lazy(() =>
            import('views/product-management/AddJewellery')
        ),
        authority: [VENDOR],
    },
    {
        key: 'apps.productList',
        path: `${APP_PREFIX_PATH}/product-management/ListJewellery`,
        component: React.lazy(() =>
            import('views/product-management/ListJewellery')
        ),
        authority: [VENDOR],
    },
    {
        key: 'apps.goldRates',
        path: `${APP_PREFIX_PATH}/gold-rates`,
        component: React.lazy(() => import('views/gold-rates')),
        authority: [ADMIN],
    },
]

export default appsRoute

const appConfig = {
    // apiPrefix: 'https://22ef-117-99-57-183.ngrok-free.app',
    apiPrefix: 'http://localhost:4000',
    DotNetapiPrefix: 'http://localhost:5173/api',
    imgPrefix: 'https://res.cloudinary.com/dyjgvi4ma/image/upload',
    authenticatedEntryPath: '/app/sales/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    unAuthenticatedAdminEntryPath: '/admin-login',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: true,
}

export default appConfig

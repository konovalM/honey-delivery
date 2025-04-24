import { antdTheme } from '@app/config/antd-theme';
import { MainLayout } from '@app/layouts';
import { ROUTES } from '@shared/const/routes';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('@pages/main'));
const FavoritesPage = lazy(() => import('@pages/favorites'));
const CatalogPage = lazy(() => import('@pages/catalog'));
const AboutPage = lazy(() => import('@pages/about'));
const PaymentPage = lazy(() => import('@pages/payment'));
const DeliveryPage = lazy(() => import('@pages/delivery'));
const ContactsPage = lazy(() => import('@pages/contacts'));
const CartPage = lazy(() => import('@pages/cart'));
const Page404 = lazy(() => import('@pages/404'));

function App() {
    return (
        <>
            <ConfigProvider theme={antdTheme}>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                path={ROUTES.HOME}
                                element={
                                    <MainLayout>
                                        <MainPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.CATALOG}
                                element={
                                    <MainLayout>
                                        <CatalogPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.ABOUT}
                                element={
                                    <MainLayout>
                                        <AboutPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.CONTACTS}
                                element={
                                    <MainLayout>
                                        <ContactsPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.DELIVERY}
                                element={
                                    <MainLayout>
                                        <DeliveryPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.PAYMENT}
                                element={
                                    <MainLayout>
                                        <PaymentPage />
                                    </MainLayout>
                                }
                            />
                            {/* <Route
                                path={ROUTES.REVIEWS}
                                element={
                                    <MainLayout>
                                        <div>Отзывы</div>
                                    </MainLayout>
                                }
                            /> */}
                            <Route
                                path={ROUTES.FAVORITES}
                                element={
                                    <MainLayout>
                                        <FavoritesPage />
                                    </MainLayout>
                                }
                            />
                            <Route
                                path={ROUTES.CART}
                                element={
                                    <MainLayout>
                                        <CartPage />
                                    </MainLayout>
                                }
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ConfigProvider>
        </>
    );
}

export default App;

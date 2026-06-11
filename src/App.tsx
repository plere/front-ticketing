import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Detail from './components/Detail'
import Layout from './Layout'
import { useAuthStore } from './stores/authStore'
import { useEffect } from 'react'
import Reserve from './components/Reserve'
import { CheckoutPage } from './api/pay/Checkout'
import { PaySuccessPage } from './api/pay/Success'
import { PayFailPage } from './api/pay/Fail'
import ReserveWaiting from './components/ReserveWaiting'
import { Coupon } from './components/Coupon'
import { ReadyPayment } from './components/ReadyPayment'

function App() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  // ⭐ 앱 시작 시 로그인 여부 확인
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Detail />} />
        <Route path='/concerts/:concertId/:roundId/reserve' element={<Reserve />} />
        <Route path='/concerts/:concertId/:roundId/reserve/waiting' element={<ReserveWaiting />} />
        <Route path='/concerts/:concertId/:roundId/reserve/coupon' element={<Coupon />} />
        <Route path='/concerts/:concertId/:roundId/reserve/payment' element={<ReadyPayment />} />
        <Route path='/pay/checkout' element={<CheckoutPage />} />
        <Route path='/pay/:reservationId/success' element={<PaySuccessPage />} />
        <Route path='/pay/fail' element={<PayFailPage />} />
      </Route>
    </Routes>
  )
}

export default App

// App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollWrapper from './utils/ScrollWrapper'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

function App () {
	return (
		<BrowserRouter future={
			{ v7_startTransition: true, v7_relativeSplatPath: true }
		}>
			<ScrollWrapper>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/legal/terms" element={<Legal page={"terms"} />} />
					<Route path="/legal/privacy" element={<Legal page={"privacy"} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ScrollWrapper>
		</BrowserRouter>
	)
}

export default App

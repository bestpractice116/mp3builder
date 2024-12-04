// ScrollWrapper.js
// A helper function that scrolls the page to the top when a new page is loaded

import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollWrapper({ children }) {
	const location = useLocation()

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
	}, [location.pathname])

	return children
}

export default ScrollWrapper
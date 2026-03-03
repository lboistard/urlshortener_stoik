import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthLoadingProvider } from "./contexts/AuthLoadingContext";

const Router = () => {
	return (
		<BrowserRouter>
			<AuthLoadingProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</AuthLoadingProvider>
		</BrowserRouter>
	);
};

export { Router };

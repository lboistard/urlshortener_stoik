import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type AuthLoadingContextValue = {
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
};

const AuthLoadingContext = createContext<AuthLoadingContextValue | null>(null);

const AuthLoadingProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthLoading, setAuthLoadingState] = useState(false);
	const setAuthLoading = useCallback(
		(loading: boolean) => setAuthLoadingState(loading),
		[],
	);

	return (
		<AuthLoadingContext.Provider value={{ isAuthLoading, setAuthLoading }}>
			{children}
		</AuthLoadingContext.Provider>
	);
};

const useAuthLoading = (): AuthLoadingContextValue => {
	const ctx = useContext(AuthLoadingContext);
	if (!ctx) {
		throw new Error(
			"useAuthLoading must be used within AuthLoadingProvider",
		);
	}
	return ctx;
};

export { AuthLoadingProvider, useAuthLoading };

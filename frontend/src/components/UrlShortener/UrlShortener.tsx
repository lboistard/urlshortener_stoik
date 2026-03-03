import React, { useState, useEffect, useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createLink, LINKS_QUERY_KEY } from "../../api/links";
import { buildShortUrl, isValidUrl, normalizeUrl } from "./url.utils";
import { ShortUrlResult } from "./ShortUrlResult";
import { ErrorToast } from "./ErrorToast";
import { useAuthLoading } from "../../contexts/AuthLoadingContext";
import "./UrlShortener.css";

const UrlShortener = () => {
	const queryClient = useQueryClient();
	const { isAuthLoading } = useAuthLoading();
	const [url, setUrl] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);
	const [shortUrl, setShortUrl] = useState<string | null>(null);

	const createLinkMutation = useMutation({
		mutationFn: createLink,
		onSuccess: (data) => {
			setValidationError(null);
			setShortUrl(buildShortUrl(data.slug));
			queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
		},
		onError: () => setShortUrl(null),
	});

	const displayError =
		validationError ?? (createLinkMutation.error as Error)?.message ?? null;

	const shortenUrl = () => {
		const value = url.trim();
		if (!value) return;
		setShortUrl(null);
		if (!isValidUrl(value)) {
			setValidationError("Please enter a valid URL");
			return;
		}
		setValidationError(null);
		createLinkMutation.mutate(normalizeUrl(value));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") shortenUrl();
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setShortUrl(null); // close result after click on copy icon
	};

	// Auto-close short URL result after 5 seconds
	const autoCloseMs = 5000;
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!shortUrl) return;
		timeoutRef.current = setTimeout(() => setShortUrl(null), autoCloseMs);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [shortUrl]);

	return (
		<div className="fade">
			<input
				id="urlInput"
				type="url"
				className="url-input"
				placeholder="https://www.stoik.com/barometre-ifop-2025-eti-risque-cyber"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={createLinkMutation.isPending || isAuthLoading}
				aria-invalid={!!displayError}
			/>
			<button
				type="button"
				className="shorten-cta"
				onClick={shortenUrl}
				disabled={
					!url.trim() || createLinkMutation.isPending || isAuthLoading
				}
			>
				{createLinkMutation.isPending ? "Shortening…" : "Shorten URL"}
			</button>
			{displayError && <ErrorToast message={displayError} />}
			{shortUrl && (
				<ShortUrlResult shortUrl={shortUrl} onCopy={copyToClipboard} />
			)}
		</div>
	);
};

export { UrlShortener };

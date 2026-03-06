import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		allowedHosts: [""],
		proxy: {
			"/auth": {
				target: "http://localhost:3000",
				changeOrigin: true,
				configure: (proxy) => {
					proxy.on("proxyRes", (proxyRes) => {
						const setCookie = proxyRes.headers["set-cookie"];
						if (setCookie) {
							proxyRes.headers["set-cookie"] = setCookie.map(
								(cookie) =>
									cookie
										.replace(/;\s*Secure/gi, "")
										.replace(/;\s*Domain=[^;]+/gi, ""),
							);
						}
					});
				},
			},
			"/links": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
});

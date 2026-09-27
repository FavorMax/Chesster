import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const plugins: any[] = [react(), tailwindcss()];

// https://vite.dev/config/
export default defineConfig({
	plugins,
	build: {
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
					stellar: ["@stellar/stellar-sdk", "@stellar/freighter-api"],
				},
			},
		},
	},
	server: {
		port: 3090,
		// host: true,
	},
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["./src/test/setup.ts"],
		exclude: ["**/node_modules/**", "**/e2e/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			reportsDirectory: "./coverage",
		},
	},
});

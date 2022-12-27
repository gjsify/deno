import { describe, it, expect } from '@gjsify/unit';
import '@gjsify/deno-runtime/globals';

export default async () => {
	await describe('location.href', async () => {
		await it('should return "https://example.com/path"', async () => {
			expect(location.href).toBe("https://example.com/path");
		});
	});
	await describe('location.toString()', async () => {
		await it('should return "https://example.com/path"', async () => {
			expect(location.toString()).toBe("https://example.com/path");
		});
	});
	await describe('location.host', async () => {
		await it('should return "example.com"', async () => {
			expect(location.host).toBe("example.com");
		});
	});
	await describe('location.port', async () => {
		await it('should return ""', async () => {
			expect(location.port).toBe("");
		});
	});
	await describe('location.pathname', async () => {
		await it('should return "/path"', async () => {
			expect(location.pathname).toBe("/path");
		});
	});
	await describe('location.origin', async () => {
		await it('should return "https://example.com"', async () => {
			expect(location.origin).toBe("https://example.com");
		});
	});
	await describe('location.protocol', async () => {
		await it('should return "https:"', async () => {
			expect(location.protocol).toBe("https:");
		});
	});
	await describe('location.search', async () => {
		await it('should return ""', async () => {
			expect(location.search).toBe("");
		});
	});
}

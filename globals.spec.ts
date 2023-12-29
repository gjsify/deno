import { describe, it, expect } from '@gjsify/unit';
import './globals.ts';

console.debug('hello world');

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

	await describe('btoa', async () => {
		await it('should return "aGVsbG8gd29ybGQ=" for "hello world"', async () => {
      const text = "hello world";
      const encoded = btoa(text);
			expect(encoded).toBe("aGVsbG8gd29ybGQ=");
		});
	});
	await describe('atob', async () => {
		await it('should return "hello world" for "aGVsbG8gd29ybGQ="', async () => {
      const encoded = "aGVsbG8gd29ybGQ=";
      const decoded = atob(encoded);
			expect(decoded).toBe("hello world");
		});
	});
}

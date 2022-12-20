import { describe, it, expect } from '@gjsify/unit';
import '@gjsify/deno-runtime/globals';

export default async () => {
	await describe('location.href', async () => {
		await it('should return "https://example.com/path"', async () => {
			expect(location.href).toBe("https://example.com/path");
		});
	});
}

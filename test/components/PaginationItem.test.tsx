import PaginationItem from '../../src/components/Pagination/PaginationItem';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi, expect, describe, test, afterEach } from 'vitest';

afterEach(cleanup);

describe('Pagination Item Component', () => {
	test('test that on click works', async () => {
		const onPageChangeMock = vi.fn();

		render(<PaginationItem onClick={onPageChangeMock}></PaginationItem>);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		screen.debug();
		expect(onPageChangeMock).toHaveBeenCalled();
	});
});

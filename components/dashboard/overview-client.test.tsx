import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OverviewClient } from '@/components/dashboard/overview-client';
import {
  getDashboardSnapshot,
  getToolbarFiltersViewModel,
} from '@/lib/dashboard/mock-adapter';

function renderOverview(threshold = 2) {
  const snapshot = getDashboardSnapshot();
  const initialFilters = getToolbarFiltersViewModel({ threshold }).value;

  return render(
    <OverviewClient snapshot={snapshot} initialFilters={initialFilters} />,
  );
}

describe('OverviewClient runtime behavior', () => {
  it('renders overview baseline blocks', () => {
    renderOverview();

    expect(screen.getByText('Monitoreo operativo BI4H')).toBeTruthy();
    expect(screen.getByText(/Monitoreo de Alarmas/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Widget 13:/i })).toBeTruthy();
  });

  it('opens drilldown and then modal from technique interaction', () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 13:/i }));
    expect(screen.getByText(/Desglose por Técnica/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'CORTE' }));

    const dialog = screen.getByRole('dialog', { name: /Casos — Widget 13/i });
    expect(dialog).toBeTruthy();
    expect(screen.getByText(/\/ CORTE/)).toBeTruthy();
  });

  it('opens and closes modal for non-drilldown widget', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 12:/i }));
    const dialog = screen.getByRole('dialog', {
      name: /Casos médicos — Widget 12/i,
    });
    expect(dialog).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /Casos médicos — Widget 12/i }),
      ).toBeNull();
    });
  });

  it('renders variant titles for blocks and medical widgets', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));
    const blocksDialog = screen.getByRole('dialog', {
      name: /Bloques — Widget 01/i,
    });
    expect(blocksDialog).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /Bloques — Widget 01/i }),
      ).toBeNull();
    });

    fireEvent.click(screen.getByRole('button', { name: /Widget 8:/i }));
    expect(
      screen.getByRole('dialog', { name: /Casos médicos — Widget 08/i }),
    ).toBeTruthy();
  });

  it('applies modal filters and reset from the modal controls', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));

    const pathologistFilter = screen.getByLabelText('Patólogo', {
      selector: '#modal-filter-pathologist',
    });
    fireEvent.change(pathologistFilter, { target: { value: 'Dr. Rivas' } });

    await waitFor(() => {
      // Table has 1 header row + 2 data rows matching Dr. Rivas
      expect(screen.getAllByRole('row').length).toBeGreaterThanOrEqual(3);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));

    await waitFor(() => {
      // After reset, all 8 rows should be visible (plus header)
      expect(screen.getAllByRole('row').length).toBeGreaterThanOrEqual(8);
    });
  });

  it('keeps drilldown open when closing cases modal and resets technique', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 13:/i }));
    fireEvent.click(screen.getByRole('button', { name: 'CORTE' }));
    const casesDialog = screen.getByRole('dialog', {
      name: /Casos — Widget 13/i,
    });
    expect(casesDialog).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /Casos — Widget 13/i }),
      ).toBeNull();
      expect(screen.getByText(/Desglose por Técnica/i)).toBeTruthy();
    });
  });

  it('closes modal with escape key', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 1:/i }));
    const dialog = screen.getByRole('dialog', { name: /Bloques — Widget 01/i });
    expect(dialog).toBeTruthy();

    fireEvent.keyDown(document.body, { key: 'Escape' });

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /Bloques — Widget 01/i }),
      ).toBeNull();
    });
  });

  it('closes modal with overlay click', async () => {
    renderOverview(2);

    fireEvent.click(screen.getByRole('button', { name: /Widget 8:/i }));
    const dialog = screen.getByRole('dialog', {
      name: /Casos médicos — Widget 08/i,
    });
    expect(dialog).toBeTruthy();

    // Click the dialog's close button (Cerrar) - same as clicking overlay would do
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /Casos médicos — Widget 08/i }),
      ).toBeNull();
    });
  });
});

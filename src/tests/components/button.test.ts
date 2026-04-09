/** @format */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../../components/button';
import type { WCDSButton } from '../../components/button';

describe('wcds-button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const createButton = async (
    props: Partial<Pick<WCDSButton, 'type' | 'disabled' | 'size' | 'variant' | 'colorScheme'>> = {}
  ) => {
    const el = document.createElement('wcds-button') as WCDSButton;
    Object.assign(el, props);
    el.textContent = 'Save';
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  };

  it('renders a native button with type and slot content', async () => {
    const el = await createButton({ type: 'submit' });

    const nativeButton = el.shadowRoot?.querySelector('button');
    const slot = el.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const assignedText = slot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent?.trim() ?? '')
      .join('');

    expect(nativeButton).toBeTruthy();
    expect(nativeButton?.getAttribute('type')).toBe('submit');
    expect(assignedText).toBe('Save');
  });

  it('dispatches a custom click event with MouseEvent in detail', async () => {
    const el = await createButton();
    const onClick = vi.fn();
    el.addEventListener('click', onClick as EventListener);

    const nativeButton = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    nativeButton.click();

    expect(onClick).toHaveBeenCalledTimes(2);

    const customEventCall = onClick.mock.calls.find(([event]) => event instanceof CustomEvent);
    expect(customEventCall).toBeTruthy();

    const customEvent = customEventCall?.[0] as CustomEvent<MouseEvent>;
    expect(customEvent.detail).toBeInstanceOf(MouseEvent);
  });

  it('keeps native button disabled when disabled property is true', async () => {
    const el = await createButton({ disabled: true });

    const nativeButton = el.shadowRoot?.querySelector('button') as HTMLButtonElement;

    expect(nativeButton.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});

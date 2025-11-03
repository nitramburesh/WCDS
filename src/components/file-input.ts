/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import globalStyles from "../index.css?inline";
import {
  isInvalidString,
  throwInvalidAttributeError,
} from "../utils/validators";

@customElement("wcds-file-input")
export class WCDSFileInput extends LitElement {
  @property({ type: String, reflect: true }) id!: string;
  @property({ type: String, reflect: true }) accept!: string;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required: boolean = false;

  @state()
  selectedFile: File | null = null;

  validateAttributes() {
    if (isInvalidString(this.id)) {
      throwInvalidAttributeError("id");
    }
    if (isInvalidString(this.accept)) {
      throwInvalidAttributeError("accept");
    }
  }

  static styles = [unsafeCSS(globalStyles)];

  private onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this.selectedFile },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    try {
      this.validateAttributes();
      return html`
        <div class="flex flex-col gap-1 w-full">
          <input
            class="file-input"
            accept=${this.accept}
            required=${this.required ? true : false}
            @input=${this.onInput}
            type="file"
            ?disabled=${this.disabled}
            id=${this.id}
          />
        </div>
      `;
    } catch (error) {
      console.error(error);

      return html`<div class="error-box">
        Error: ${(error as Error).message}
      </div>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-file-input": WCDSFileInput;
  }
}

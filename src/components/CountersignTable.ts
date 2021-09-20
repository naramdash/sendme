import { deleteCountersign, getCountersigns } from "../common/API";
import { CountersignWithId } from "../common/Countersign";

export const TAG_NAME = "countersign-table";

const CountersignTableRowTemplate = document.getElementById(
  "countersign-table-row"
)! as HTMLTemplateElement;

class CountersignTable extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "countersign-table"
    ) as HTMLTemplateElement;

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  get tbody() {
    return this.shadowRoot!.querySelector("tbody");
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    // console.log("Custom square element added to page.");
    this.updateCountersigns();
  }

  disconnectedCallback() {
    // console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    // console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    name;
    oldValue;
    newValue;
  }

  async updateCountersigns() {
    const countersigns = await getCountersigns();
    const tbody = this.tbody!;

    tbody.innerHTML = "";

    countersigns.forEach((countersign) => {
      const tr = this.createCountersignDataRow(countersign);
      tbody.appendChild(tr);
    });
  }

  createCountersignDataRow(countersign: CountersignWithId) {
    const templateClone = document.importNode(
      CountersignTableRowTemplate.content,
      true
    );

    const challengeTd = templateClone.querySelector(
      "td[headers=header-challenge]"
    );
    challengeTd?.insertAdjacentText("afterbegin", countersign.challenge);
    const passwordA = templateClone.querySelector(
      "td[headers=header-password] a"
    );
    passwordA?.setAttribute("href", countersign.password);
    passwordA?.insertAdjacentText("afterbegin", countersign.password);
    const deleteButton = templateClone.querySelector(
      "td[headers=header-delete] button"
    ) as HTMLButtonElement;
    deleteButton?.addEventListener("click", async () => {
      await deleteCountersign(countersign.id);
      this.updateCountersigns();
    });

    return templateClone;
  }
}
if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, CountersignTable);
}

export default CountersignTable;

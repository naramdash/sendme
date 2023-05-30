import { FASTElement, ViewTemplate, css, customElement, html, observable, repeat, when } from "@microsoft/fast-element";

const theadTemplate = `
  <thead>
    <tr>
      <th>📥key</th>
      <th>📤value</th>
      <th>📆registered</th>
      <th>📆expired</th>
    </tr>
  </thead>
`

const template: ViewTemplate<AppKeyValueRegistered> = html`
  ${when(e => e.keyvalues.length === 0, 
      html`
        <table>
          ${theadTemplate}
          <tbody>
            <tr>
              <td colspan="4">no keyvalue registered</td>
            </tr>
          </tbody>
        </table>
      `,
      html`
        <table>
          ${theadTemplate}
          <tbody>
            ${repeat(e => e.keyvalues, html`
              <tr>
                <td>${e => e.key}</td>
                <td>${e => e.value}</td>
                <td>${e => e.registered}</td>
                <td>${e => e.expired}</td>
              </tr>
            `)}
          </tbody>
        </table>
      `)}
`

const styles = css`
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;
  }
  th,
  td {
    border: 1px solid black;
  }
  thead {
    background-color: aliceblue;
  }
`

@customElement({
  name: 'app-keyvalue-registered',
  template,
  styles
})
export class AppKeyValueRegistered extends FASTElement {
  @observable keyvalues = 
  []
  // [{
  //   key: "1",
  //   value: "naer.om",
  //   registered: new Date(),
  //   expired: new Date(),
  // }]

  async refresh() {
    const keyvalues = await this.loadKeyValues()
    keyvalues
  }

  async loadKeyValues() {
    return fetch('').then(res => res.json())
  }

  //  lifecycle
  connectedCallback(): void {
    super.connectedCallback();
    this.refresh();
  }
}


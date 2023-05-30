import { FASTElement, customElement, html, ViewTemplate, css, ref } from '@microsoft/fast-element';
import './app-keyvalue-make';
import './app-keyvalue-registered'
import type { AppKeyValueRegistered } from './app-keyvalue-registered'

const template: ViewTemplate<AppMain> = html`
  <h1>Welcome to ✈️sendme.juho.kim!</h1>

  <p>
    <a href="/">sendme.juho.kim</a> is lightweight uri redirect service, heavily based on web component by <a href="https://www.fast.design/">microsoft/fast-element</a>. 
    
    <br />

    Check <a href="https://github.com/naramdash/sendme">GitHub Repository</a>
  </p>

  <h2>How To Use</h2>

  <p>
    After you create a keyvalue, You can use a key to redirect site(value) by accessing
    <code>/to/your_key</code> URI.
    <br>
    Example: <strong>key: blog</strong> →
    <a href="/to/blog" target="_blank">sendme.juho.kim/to/blog</a>
  </p>

  <h2>Make a key-value</h2>

  <app-keyvalue-make @registerSuccess="${(e) => e.handleRegisterSuccess()}"></app-keyvalue-make>

  <h2>Registered key-values</h2>

  <app-keyvalue-registered ${ref('appKeyValueRegistered')}></app-keyvalue-registered>

  <footer>Copyright 2023. Kim Juho. All rights reserved.</footer>
`;

const styles = css`
  :host {
    display: block;
  }

  footer {
    position: fixed;
    bottom: 0px;
  }
`

@customElement({
  name: 'app-main',
  template,
  styles
})
export class AppMain extends FASTElement {
  appKeyValueRegistered: AppKeyValueRegistered | undefined;

  handleRegisterSuccess() {
    this.appKeyValueRegistered?.refresh()
  }
}


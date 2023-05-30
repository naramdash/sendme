import { FASTElement, ViewTemplate, customElement, html } from "@microsoft/fast-element";

const template: ViewTemplate<AppKeyValueMake> = html`
  <form @submit="${(e, c) => e.handleSubmit(c.event as SubmitEvent)}">
    <label>
      Key <input name="key" type="text" required placeholder="blog"/>
    </label>
    <label>
      Value <input name="value" type="url" required placeholder="https://blog.juho.kim"/>
    </label>
    <label>
      Expired after 
      <select name="expiredAfter" required>
        <option value="" selected>Choose</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
        <option value="3600">1 hour</option>
        <option value="21600">6 hour</option>
        <option value="43200">12 hours</option>
        <option value="86400">1 day</option>
        <option value="259200">3 days</option>
        <option value="604800">7 days</option>
        <option value="2419200">28 days</option>
        <option value="-1">~ forever ~</option>
      </select>
    </label>

    <button type="submit">Register</button>
  </form>
`

@customElement({
  name: 'app-keyvalue-make',
  template
})
export class AppKeyValueMake extends FASTElement {
  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log("submit", event)
    
    const form = new FormData(event.target as HTMLFormElement)
    console.log("key", form.get("key"))
    console.log("value", form.get("value"))
    console.log("expiredAfter", form.get("expiredAfter"))

    this.$emit("registerSuccess")
  }
}


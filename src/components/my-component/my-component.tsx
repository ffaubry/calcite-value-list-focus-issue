import { Component, h, State } from '@stencil/core';
import '@esri/calcite-components';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  data = ['foo', 'bar', 'gak'];
  selectedData = 'bar';

  @State() filterValue = '';

  render() {
    const filter = new RegExp(this.filterValue, 'i');
    const filteredData = this.data.filter(value => filter.test(value));

    return (
      <calcite-panel heading="Issue" summary="To reproduce type the letter 'b' in the input and observe that the focus is lost in the input and moved to the selected item in the value list.">
        <div class="sticky">
          <calcite-input
            value={this.filterValue}
            icon="magnifying-glass"
            clearable
            ref={(e: HTMLCalciteInputElement) => e?.setFocus()}
            onCalciteInputInput={(e: CustomEvent<any>) => (this.filterValue = e.detail.value)}
          />
        </div>
        <calcite-value-list>
          {filteredData.map(value => (
            <calcite-value-list-item label={value} value={value} selected={value === this.selectedData} />
          ))}
        </calcite-value-list>
      </calcite-panel>
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div [ngStyle]="getStyles()" class="loader"></div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() width:   string;
  @Input() widthP:  string;
  @Input() height:  string;
  @Input() heightP: string;
  @Input() circle:  boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getStyles() {
    const styles = {
      'width.px':      this.width   ? this.width :   '',
      'width.%':       this.widthP  ? this.widthP:   '',
      'height.px':     this.height  ? this.height:   '',
      'height.%':      this.heightP ? this.heightP : '',
      'border-radius': this.circle  ? '50%':         ''
    };

    return styles;
  }

}

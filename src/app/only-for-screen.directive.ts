import { Directive, HostListener, ElementRef, OnInit, Input} from '@angular/core';
interface IConfig {
  mobile: number;
  tablet: number;
}

@Directive({
  selector: '[onlyForScreen]'
})
export class OnlyForScreenDirective {

  scrHeight: number;
  scrWidth: number;
  config: IConfig;

  @Input('onlyForScreen') onlyForScreen: string;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrWidth = window.innerWidth;
    this.el.nativeElement.style.display = 'none';
    if (this.scrWidth <= this.config.mobile && this.onlyForScreen === 'mobile') {
      this.el.nativeElement.style.display = 'inline';
    }

    if (this.scrWidth > this.config.mobile && this.scrWidth <= this.config.tablet && this.onlyForScreen === 'tablet') {
      this.el.nativeElement.style.display = 'inline';
    }

    if (this.scrWidth > this.config.tablet && this.onlyForScreen === 'desktop') {
      this.el.nativeElement.style.display = 'inline';
    }
    return this.el.nativeElement;
  }

  constructor(private el: ElementRef) {
    this.config = {mobile: 767, tablet: 992};
    this.getScreenSize();
  }

  ngOnInit() {
    this.getScreenSize();
  }


}

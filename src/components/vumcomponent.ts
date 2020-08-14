
enum VumDirections {
  horiz = 'horizontal',
  vert = 'vertical',
}

enum VumDirClasses {
  horiz = 'vumh',
  vert = 'vumv',
}

enum VumOvlDirClasses {
  horiz = 'vumoverlayh',
  vert = 'vumoverlayv',
}

enum VumGradients {
  default = 'default',
  tron = 'tron',
}

enum VumGradientClasses {
  defaulth = 'gradienthdefault',
  defaultv = 'gradientvdefault',
  tronh = 'gradienthtron',
  tronv = 'gradientvtron',
}

enum VumAttrInputs {
  direction = 'direction',
  gradient = 'gradient',
  mask = 'mask',
  value = 'value'
}

enum VumAttrInner {
  tooltip = 'data-tooltip'
}

const styleTemplate = document.createElement('template');

styleTemplate.innerHTML = `
<style>
@import "css/vumeter.css";
@import "css/gradient.css";
@import "css/mask.css";
</style>
`;

class VuMeterComponent extends HTMLElement {

  private debug: boolean = false;
  private direction: string;
  private gradient: string;
  private mask: string;
  private value: number;
  private vumClass: string;
  private overlayClass: string;
  private isFirstChange: boolean;
  private overlayElt: HTMLElement;
  private vumeterElt: HTMLElement;

  constructor() {
    super();
  }

  static get observedAttributes(): Array<string> {
    return ['direction', 'gradient', 'mask', 'value'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const msg = `changed from ${oldValue} to ${newValue}`;
    const changed = oldValue !== newValue;
    if (changed) {
      switch (name) {
        case VumAttrInputs.direction:
          this.log(`Direction ${msg}`);
          this.direction = newValue;
          break;
        case VumAttrInputs.gradient:
          this.log(`Gradient ${msg}`);
          this.gradient = newValue;
          break;
        case VumAttrInputs.mask:
          this.log(`Mask ${msg}`);
          this.mask = newValue;
          break;
        case VumAttrInputs.value:
          this.log(`Value ${msg}`);
          this.value = parseInt(newValue);
          break;
      }
      if (false === this.isFirstChange) {
        this.applyChanges();
      }
    }
  }

  connectedCallback() {
    this.init();
    this.build();
    this.log('Vum element added to page.');
  }

  disconnectedCallback() {
    this.log('Vum element removed from page.');
  }

  adoptedCallback() {
    this.log('Vum element moved to new page.');
  }

  private init() {
    this.isFirstChange = true;
    this.vumClass = 'vum';
    this.overlayClass = 'vumoverlay';
  }

  private build() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.createVumeterElt();
    this.createOverlayElt();
    shadow.appendChild(styleTemplate.content.cloneNode(true));
    shadow.appendChild(this.vumeterElt);
    this.vumeterElt.appendChild(this.overlayElt);
    this.isFirstChange = false;
    this.applyChanges();
  }

  private get vpct(): string {
    return `${(100 - this.value)}%`;
  }

  private get overlayDirectionClass(): string {
    return (this.direction === VumDirections.horiz)
      ? VumOvlDirClasses.horiz
      : VumOvlDirClasses.vert;
  }

  private get gradientClass(): string {
    let gradientClass: string;
    const isHoriz = this.direction === VumDirections.horiz;
    switch (this.gradient) {
      case VumGradients.default:
          gradientClass = (isHoriz)
          ? VumGradientClasses.defaulth
          : VumGradientClasses.defaultv;
        break;

      case VumGradients.tron:
          gradientClass = (isHoriz)
          ? VumGradientClasses.tronh
          : VumGradientClasses.tronv;
        break;

      default:
          gradientClass = (isHoriz)
          ? VumGradientClasses.defaulth
          : VumGradientClasses.defaultv;
        break;
    }
    return gradientClass;
  }

  private get vumDirectionClass(): string {
    return (this.direction === VumDirections.horiz)
      ? VumDirClasses.horiz
      : VumDirClasses.vert;
  }

  private createVumeterElt() {
    this.vumeterElt = document.createElement('div');
    this.applyVumeterChanges();
  }

  private applyVumeterChanges() {
    this.vumeterElt.setAttribute(
      'class',
      `${this.vumClass} ${this.vumDirectionClass} ${this.gradientClass} ${this.mask}`
    );
  }

  private applyChanges() {
    this.applyVumeterChanges();
    this.applyOverlayChanges();
  }

  private createOverlayElt() {
    this.overlayElt = document.createElement('div');
    this.overlayElt.setAttribute(VumAttrInner.tooltip, '');
    this.applyOverlayChanges();
  }

  private applyOverlayChanges() {
    this.overlayElt.setAttribute(
      'class',
      `${this.overlayClass} ${this.overlayDirectionClass}`
    );
    if (this.direction === VumDirections.horiz) {
      this.overlayElt.style.width = this.vpct;
    } else {
      this.overlayElt.style.height = this.vpct;
    }
    this.overlayElt.setAttribute(VumAttrInner.tooltip, `${this.value}%`);
  }

  private log(msg: string) {
    if (this.debug) {
      console.log(msg)
    }
  }
}

customElements.define('vu-meter', VuMeterComponent);
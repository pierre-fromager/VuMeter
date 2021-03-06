var VumDirections;
(function (VumDirections) {
    VumDirections["horiz"] = "horizontal";
    VumDirections["vert"] = "vertical";
})(VumDirections || (VumDirections = {}));
var VumDirClasses;
(function (VumDirClasses) {
    VumDirClasses["horiz"] = "vumh";
    VumDirClasses["vert"] = "vumv";
})(VumDirClasses || (VumDirClasses = {}));
var VumOvlDirClasses;
(function (VumOvlDirClasses) {
    VumOvlDirClasses["horiz"] = "vumoverlayh";
    VumOvlDirClasses["vert"] = "vumoverlayv";
})(VumOvlDirClasses || (VumOvlDirClasses = {}));
var VumGradients;
(function (VumGradients) {
    VumGradients["default"] = "default";
    VumGradients["tron"] = "tron";
})(VumGradients || (VumGradients = {}));
var VumGradientClasses;
(function (VumGradientClasses) {
    VumGradientClasses["defaulth"] = "gradienthdefault";
    VumGradientClasses["defaultv"] = "gradientvdefault";
    VumGradientClasses["tronh"] = "gradienthtron";
    VumGradientClasses["tronv"] = "gradientvtron";
})(VumGradientClasses || (VumGradientClasses = {}));
var VumAttrInputs;
(function (VumAttrInputs) {
    VumAttrInputs["direction"] = "direction";
    VumAttrInputs["gradient"] = "gradient";
    VumAttrInputs["mask"] = "mask";
    VumAttrInputs["value"] = "value";
})(VumAttrInputs || (VumAttrInputs = {}));
var VumAttrInner;
(function (VumAttrInner) {
    VumAttrInner["tooltip"] = "data-tooltip";
})(VumAttrInner || (VumAttrInner = {}));
const styleTemplate = document.createElement('template');
styleTemplate.innerHTML = `
<style>
@import "css/vumeter.css";
@import "css/gradient.css";
@import "css/mask.css";
</style>
`;
class VuMeterComponent extends HTMLElement {
    constructor() {
        super();
        this.debug = false;
    }
    static get observedAttributes() {
        return ['direction', 'gradient', 'mask', 'value'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
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
    init() {
        this.isFirstChange = true;
        this.vumClass = 'vum';
        this.overlayClass = 'vumoverlay';
    }
    build() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.createVumeterElt();
        this.createOverlayElt();
        shadow.appendChild(styleTemplate.content.cloneNode(true));
        shadow.appendChild(this.vumeterElt);
        this.vumeterElt.appendChild(this.overlayElt);
        this.isFirstChange = false;
        this.applyChanges();
    }
    get vpct() {
        return `${(100 - this.value)}%`;
    }
    get overlayDirectionClass() {
        return (this.direction === VumDirections.horiz)
            ? VumOvlDirClasses.horiz
            : VumOvlDirClasses.vert;
    }
    get gradientClass() {
        let gradientClass;
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
    get vumDirectionClass() {
        return (this.direction === VumDirections.horiz)
            ? VumDirClasses.horiz
            : VumDirClasses.vert;
    }
    createVumeterElt() {
        this.vumeterElt = document.createElement('div');
        this.applyVumeterChanges();
    }
    applyVumeterChanges() {
        this.vumeterElt.setAttribute('class', `${this.vumClass} ${this.vumDirectionClass} ${this.gradientClass} ${this.mask}`);
    }
    applyChanges() {
        this.applyVumeterChanges();
        this.applyOverlayChanges();
    }
    createOverlayElt() {
        this.overlayElt = document.createElement('div');
        this.overlayElt.setAttribute(VumAttrInner.tooltip, '');
        this.applyOverlayChanges();
    }
    applyOverlayChanges() {
        this.overlayElt.setAttribute('class', `${this.overlayClass} ${this.overlayDirectionClass}`);
        if (this.direction === VumDirections.horiz) {
            this.overlayElt.style.width = this.vpct;
        }
        else {
            this.overlayElt.style.height = this.vpct;
        }
        this.overlayElt.setAttribute(VumAttrInner.tooltip, `${this.value}%`);
    }
    log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
}
customElements.define('vu-meter', VuMeterComponent);
//# sourceMappingURL=vumcomponent.js.map
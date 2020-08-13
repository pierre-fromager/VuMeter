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
var VumAttrInputs;
(function (VumAttrInputs) {
    VumAttrInputs["direction"] = "data-direction";
    VumAttrInputs["gradient"] = "data-gradient";
    VumAttrInputs["mask"] = "data-mask";
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
        return ['data-direction', 'data-gradient', 'data-mask', 'value'];
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
        this.vumClassname = 'vum';
        this.overlayClassname = 'vumoverlay';
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
    get overlayDirectionClassname() {
        return (this.direction === VumDirections.horiz)
            ? VumOvlDirClasses.horiz
            : VumOvlDirClasses.vert;
    }
    get vumDirectionClassname() {
        return (this.direction === VumDirections.horiz)
            ? VumDirClasses.horiz
            : VumDirClasses.vert;
    }
    createVumeterElt() {
        this.vumeterElt = document.createElement('div');
        this.applyVumeterChanges();
    }
    applyVumeterChanges() {
        this.vumeterElt.setAttribute('class', `${this.vumClassname} ${this.vumDirectionClassname} ${this.gradient} ${this.mask}`);
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
        this.overlayElt.setAttribute('class', `${this.overlayClassname} ${this.overlayDirectionClassname}`);
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
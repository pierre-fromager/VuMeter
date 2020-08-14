const tooltipAttr = 'data-tooltip';
const vumHorizClassname = '.vumh';
const vumHorizOvlClassname = '.vumoverlayh';
const vumVertClassname = '.vumv';
const vumVertOvlClassname = '.vumoverlayv';
const getVms = (sel) => document.querySelectorAll(sel);
const getOverlay = (id, sel) => document.getElementById(id).querySelector(sel);
const setVmValue = (id, sel, vpc) => {
    const ov = getOverlay(id, sel);
    const vpcf = (100 - vpc) + '%';
    if (ov.hasAttribute(tooltipAttr)) {
        ov.setAttribute(tooltipAttr, vpc + '%');
    }
    if (sel == vumHorizOvlClassname) {
        ov.style.width = vpcf;
    } else {
        ov.style.height = vpcf;
    }
}
const rpct = divisor => Math.floor(((Math.random() * 100) + 1) / divisor);
const updateAllvum = () => {
    const allHorizVum = getVms(vumHorizClassname);
    for (element of allHorizVum) {
        setVmValue(element.id, vumHorizOvlClassname, rpct(1));
    }
    const allVertVum = getVms(vumVertClassname);
    for (element of allVertVum) {
        setVmValue(element.id, vumVertOvlClassname, rpct(1));
    }
    const vumcomps = getVms('vu-meter');
    for (element of vumcomps) {
        element.setAttribute('value', rpct(1));
    }
}
const tooltipAttr = 'data-tooltip';
const vumHorizClassname = '.vumh';
const vumHorizOvlClassname = '.vumoverlayh';
const vumVertClassname = '.vumv';
const vumVertOvlClassname = '.vumoverlayv';
const selVms = (sel) => document.querySelectorAll(sel);
const selOv = (id, sel) => document.getElementById(id).querySelector(sel);
const setVmValue = (id, sel, vpc) => {
    const ov = selOv(id, sel);
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
const updateAllvums = () => {
    selVms(vumHorizClassname).forEach(element => {
        setVmValue(element.id, vumHorizOvlClassname, rpct(1))
    });
    selVms(vumVertClassname).forEach(element => {
        setVmValue(element.id, vumVertOvlClassname, rpct(1))
    });
}
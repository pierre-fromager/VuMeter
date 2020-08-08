const selVms = (sel) => document.querySelectorAll(sel);
const selOv = (id, sel) => document.getElementById(id).querySelector(sel);
const setVmValue = (id, sel, vpc) => {
    const ov = selOv(id, sel);
    const vpcf = (100 - vpc) + '%';
    if (ov.hasAttribute('data-tooltip')) {
        ov.setAttribute('data-tooltip', vpc + '%');
    }
    if (sel == '.hvmov') {
        ov.style.width = vpcf;
    } else {
        ov.style.height = vpcf;
    }
}
const rpct = divisor => Math.floor(((Math.random() * 100) + 1) / divisor);
const updateAllVms = () => {
    selVms('.hvm').forEach(element => {
        setVmValue(element.id, '.hvmov', rpct(1))
    });
    selVms('.vvm').forEach(element => {
        setVmValue(element.id, '.vvmov', rpct(1))
    });
}
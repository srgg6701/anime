const rangeQuerySelector = 'input[type="range"]';
const letSvgTarget = (() => {
    let svgTarget;
    return select => {
        if (select) {
            svgTarget = document.querySelector('#svg-'+select.options[select.selectedIndex].value+'> svg');
        }
        return svgTarget;
    };
})();
/**
 * Set range value to the previous td
 * @param {*} range 
 */
function syncRangeTd(range) {
    const tr = range.parentNode.parentNode;
    if (range.value.indexOf('.')!==-1){
        range.value = parseFloat(range.value).toFixed(2);
    }
    tr.querySelectorAll('td')[1].innerHTML = range.value;
    return tr;
}
/**
 * Extract data from target SVG
 */
function getSvgParamsConfig() {
    const svgTarget = letSvgTarget(),
        viewBox = svgTarget.viewBox.baseVal;
    return {
        'height': [svgTarget.height.baseVal.value, true],
        'width': [svgTarget.width.baseVal.value, true],
        'viewBox-y': [viewBox.y, svgTarget.height.baseVal.value],
        'viewBox-x': [viewBox.x, svgTarget.width.baseVal.value],
        'viewBox-height': [viewBox.height, svgTarget.height.baseVal.value],
        'viewBox-width': [viewBox.width, svgTarget.width.baseVal.value]
    };
}
/**
 * 
 * @param {*} paramName 
 * @param {*} value 
 */
function changeSvg(paramName, value) {
    const svgTarget = letSvgTarget();
    //console.log(svgTarget);
    if (paramName.indexOf('viewBox') !== -1) {
        const prop = paramName.split('-').pop(),
            viewBox = letSvgTarget().getAttribute('viewBox').split(" ");
        let params = '', cnt = 0;
        //console.log('value, viewBox', {value:value,viewBox:viewBox});
        for (var pr in svgTarget.viewBox.baseVal) {
            //console.log('cnt, pr, prop', cnt, pr, prop);
            if (pr === prop) {
                params +=value+' ';
            } else {
                params += viewBox[cnt]+' ';
            } //console.log('params=>', params);
            ++cnt;
        }   //console.log('params', params);
        svgTarget.setAttribute('viewBox', params.trim());
    } else {
        svgTarget.setAttribute(paramName, value);
    }   //console.log(svgTarget);
    //console.dir(svgTarget);
}
/**
 * Apply data from input range to SVG
 * @param {*} range 
 */
function applyRangeToSvg(range){
    const tr = syncRangeTd(range);
    changeSvg(tr.id.split('svg-data-').pop(), range.value);
}
/**
 * 
 * @param {*} id 
 * @param {*} content 
 * @param {*} setMax 
 */
function displaySvgParams(id, content, setMax) {
    document.getElementById('svg-data-table').classList.remove('passive');
    const row = document.getElementById('svg-data-' +id),
        cells = row.getElementsByTagName('td'),
        inputRange = cells[2].querySelector(rangeQuerySelector),
        trId = inputRange.parentNode.parentNode.id;
    if (!Number.isInteger(content)) {
        content = content.toFixed(2);
    }
    cells[1].innerHTML = content;
    inputRange.max = typeof setMax === 'boolean' ? content : setMax;
    inputRange.max *= 2;
    if (trId.indexOf('-height') === -1 && trId.indexOf('-width') === -1) {
        inputRange.min = -inputRange.max;
    }
    inputRange.value = content;
    if (!inputRange.dataset.default) {
        inputRange.dataset.default = content;
    }
    inputRange.title = inputRange.max+' : '+content;
}
/**
 * 
 * @param {*} event 
 */
function showContainerData(event) {
    // event.stopPropagation();
    const container = event.target;
    let targetBlock = container;
    if (container.tagName.toLowerCase() === 'g') {
        targetBlock = container.parentNode.parentNode.parentNode;
    } else if (container.tagName.toLowerCase() === 'path' ||
        container.tagName.toLowerCase() === 'rect' ||
        container.tagName.toLowerCase() === 'circle' ||
        container.tagName.toLowerCase() === 'polygon'
    ) {
        targetBlock = container.parentNode.parentNode;
    } else if (container.tagName.toLowerCase() === 'svg') {
        targetBlock = container.parentNode;
    }
    targetBlock.title = container.tagName + '#' + container.id;
}

export { rangeQuerySelector, letSvgTarget, syncRangeTd, getSvgParamsConfig, changeSvg, applyRangeToSvg, displaySvgParams, showContainerData };
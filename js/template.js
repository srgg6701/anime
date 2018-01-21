/**
 * 
 * @param {*} path 
 */
function replaceSlash(path) {
    if (path.indexOf('/') !== -1) {
        path = path.split('/').pop();
    }
    return path;
}
/**
 * 
 * @param {*} containerId 
 * @param {*} ids 
 */
function setTemplate(containerId, ids) {
    let svgs = '';
    ids.forEach(id => {
        id = replaceSlash(id);
        svgs += `<div id="svg-${id}"></div>`;
    });
    document.getElementById(containerId).innerHTML = `
<section class="flex" id="svg-container">
    ${svgs}
</section>
<aside>
    <h4>Objects info</h4>
    <select name="choose-svg" id="choose-svg">
        <option value="">Choose SVG</option>
    </select>
    <button id="btn-drop" type="button">Drop</button>
</aside>
<section id="svg-data">
    <table id="svg-data-table" class="passive">
        <tr id="svg-data-height">
            <td>canvas height</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-data-width">
            <td>canvas width</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-data-viewBox-x">
            <td>viewBox x</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-data-viewBox-y">
            <td>viewBox y</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-data-viewBox-height">
            <td>viewBox height</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-data-viewBox-width">
            <td>viewBox width</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
    </table>
    <table id="pathBox">
        <tr id="svg-path-dasharray">
            <td>dasharray</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>
        <tr id="svg-path-dashoffset">
            <td>dashoffset</td>
            <td></td>
            <td>
                <input type="range" step="any" min="0">
            </td>
        </tr>        
    </table>
</section>`;
}

export { setTemplate, replaceSlash };
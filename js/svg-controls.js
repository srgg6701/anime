// get svg container
import { setTemplate, replaceSlash } from './template.js';
import * as fnx from './functions.js';
// 
export default (fileNames, containerId = 'main') => {
    // aha! Typescript may be used here. 
    // It will help to avoid the checking object type for fileNames
    if (!Array.isArray(fileNames)) {
        if (typeof fileNames !== 'string') {
            console.error('filenames has a wrong type, is not a string!');
        } else {
            fileNames = [fileNames];
        }
    }
    setTemplate(containerId, fileNames);
    //
    const svg_container = '#svg-container > div',
        sel = document.getElementById('choose-svg'),
        iputRanges = document.querySelectorAll(fnx.rangeQuerySelector),
        showSvgData = event => {
            console.log('showSvgData, event=>', event.target);
        };
    let option;
    //
    document.querySelectorAll(svg_container).forEach((div, index) => {
        div.addEventListener('mouseover', fnx.showContainerData);
        option = document.createElement('option');
        option.value = replaceSlash(fileNames[index]);
        option.appendChild(document.createTextNode(option.value));
        sel.appendChild(option); //console.dir(option);
    });
    // display SVG params changing, call function to apply changes to SVGs
    iputRanges.forEach(range => {
        range.addEventListener('change', function () {
            fnx.applyRangeToSvg(this);
        });
    });
    // change svg by selecting option
    // sets svgTarget
    sel.addEventListener('change', function () {
        console.log(this.options[this.selectedIndex].value);
        // set target every time
        fnx.letSvgTarget(this);
        const svgParams = fnx.getSvgParamsConfig();
        /* console.log('svgTarget=>', {
            '_ svgTarget': fnx.letSvgTarget(this),
            svgParams: svgParams
        }); */
        Object.keys(svgParams).forEach(key => {
            fnx.displaySvgParams(key, svgParams[key][0], svgParams[key][1]);
        });
    });
    //
    window.onload = () => {
        class Loader {
            constructor(path, id) {
                this.load(path).then(response => {
                    path = replaceSlash(path);
                    // console.dir(response);
                    document.getElementById(`svg-${path}`).innerHTML = response;
                }, rejectMess => {
                    console.log('rejectMess =>', rejectMess);
                });
            }
            load(path) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('get', `../svgs/${path}.svg`);
                    xhr.onload = () => {
                        resolve(xhr.responseText);
                    };
                    xhr.onerror = () => {
                        reject(xhr.statusText);
                    };
                    xhr.send();
                });
            }
        }
        //
        (fileNames.forEach(filename => {
            new Loader(filename);
        }));
        // drop data table to default
        document.getElementById('btn-drop').addEventListener('click', () => {
            iputRanges.forEach(range => {
                if (range.dataset.default) {
                    range.value = range.dataset.default;
                    fnx.syncRangeTd(range);
                    fnx.applyRangeToSvg(range);
                }
            });
        });
        /* const pathTable = document.getElementById('pathBox');
        let paths;
        console.log('paths=>', paths);
        paths.forEach(path => {
            console.log('path=>', path);
            path.addEventListener('mouseover', function () {
                document.getElementById('pathBox').classList.add('visible');
            });
            path.addEventListener('mouseout', function () {
                document.getElementById('pathBox').classList.remove('visible');
            });
        }); */
    };
};
// var objTarget;
function outputSvgProps(ob){
    console.groupCollapsed(ob.id, {
        width: ob.width.baseVal.valueAsString,
        height: ob.height.baseVal.valueAsString,
        viewBox: `${ob.viewBox.baseVal.width} ${ob.viewBox.baseVal.height}`
    });
    for(var pr in ob){
        if (typeof ob[pr] === 'object' && ob[pr]) {
            console.log(pr);
            console.table(ob[pr]);
        }
    }
    console.groupEnd();
}

function dropBgColor(svgs){
    Object.keys(svgs).forEach(function(s){
        svgs[s].style.backgroundColor = 'transparent';
    });
}

window.onload = () => {
    const svgs = document.getElementsByTagName('svg');
    Object.keys(svgs).forEach(function(s) {
        svgs[s].addEventListener('click', function() {
            outputSvgProps(this);
            dropBgColor(svgs);
            this.style.backgroundColor = 'antiquewhite';
        });
    });
};
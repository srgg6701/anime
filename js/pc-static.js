$(() => {
    $.get('../svgs/pc-monitor/monitor-clean.svg', null, svg => {
        $("svg", svg).appendTo('#svg-container');
        $('main button').fadeIn().on('click', svg => {
            animationStart(svg);
        });
        // console.log($('svg'));
    }, 'xml');
});

function animationStart(svg) {
    const $paths = $('path');
    console.log('paths=>', $paths);
    $paths.each(function(index, path) {
        /* 
        path#p-standVertical
        path#p-standHorizontal
        path#p-monitor 
        */
        
        let tLen = path.getTotalLength && parseInt(path.getTotalLength()) || false;
        //
        if (!tLen){
            if (index==2) console.log('No getTotalLength', path);
            return false;
        }
        if (index==2) console.log(path.id + '=>', {
            strokeDasharray: path.style.strokeDasharray,
            strokeDashoffset: path.style.strokeDashoffset,
            totalLenght: tLen
        });
        
        let lim = 0, goBack = false, dstr = 0, strDsh, cnt = 100, step = tLen/cnt;
        if (index==2) console.log('%ctLen, step', 'color:green', tLen + ', ' + step);
        if (path.style.strokeDasharray == "none"){
            path.style.strokeDasharray = 0;
        }
        const intv = setInterval(() => {
            strDsh = parseFloat(path.style.strokeDasharray);
            if (tLen > Math.round(strDsh) && !goBack){
                dstr += step; //if (index==2) console.log('first');
            } else { // 25
                
                goBack = true;
                
                if (index==2) console.log('back?', {dstr:dstr, step:step, strDsh:strDsh});
                
                if (tLen == strDsh) {
                    if (index==2) console.log('%cgo back, tLen, dstr =>', 'color:orange', tLen +', '+dstr);
                }

                if (index==2) console.log('dstr 1', dstr);
                try {
                    dstr = parseFloat(dstr.toFixed(4)) - step;
                } catch (error) {
                    console.error(error.message, {dstr:dstr, fixed:dstr.toFixed(4), step});
                    clearInterval(intv);
                    return;
                }
                if (index==2) console.log('dstr 2', dstr); // 24.75
                
                if (Math.round(strDsh) === 0){
                    if (index==2) console.log('%cFinish =>', 'background: lightskyblue', {tLen:tLen, strDsh:strDsh, path:path});
                    clearInterval(intv);
                }
            }
            //
            path.style.strokeDasharray = (goBack && strDsh === 0) ? "none" : dstr;
            if (index==2) console.log('check strDsh => ', path.style.strokeDasharray);
            ++lim;
            if (lim > 350) {
                if (index==2) console.log('exceeded!');
                clearInterval(intv);
            }
        }, 100);
    });
}
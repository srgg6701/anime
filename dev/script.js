$(() => {
    var dataMark = 'data-md-name-id',
        setVal = (key) => prodFieldsArray[key].forEach(txts => {
            var $td = $('td[' + dataMark + '="' + txts[1] + '"]'),
                dataVal = $td.attr(dataMark);
            $td.prepend(`<span class="data-mark">${dataVal}</span>`);
        });
    // data-md-name-id
    setVal('top');
    setVal('bottom');
});
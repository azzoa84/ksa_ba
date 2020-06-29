function inityear(combo, yyyy, yyyy2) {
    combo.items.length = 0;
    for (var i = yyyy - 2; i <= yyyy; ++i) {
        combo.addItem(i.toString(), i.toString());
    }
    combo.setValue(yyyy2);
}

function initmonth(combo, mm) {
    combo.items.length = 0;
    var month = 1;
    for (var i = 0; i < 12; ++i) {
        if (month < 10) {
            combo.addItem(i.toString(), '0' + month.toString());
        }
        else {
            combo.addItem(i.toString(), month.toString());
        }
        ++month;
    }
    combo.setValue(mm);
}
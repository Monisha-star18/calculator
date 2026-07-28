
$(".num-pallet-btn").click(function () {
    $(".num-pallet-btn").removeClass("selected");
    let clickedButton = $(this)
    clickedButton.addClass("selected");
    setTimeout(function(){clickedButton.removeClass("selected")},1000)
});


$(".num-pallet-sy-btn").click(function()
{
    $(".num-pallet-sy-btn").removeClass("selectedsy");
    let clickedButton = $(this)
    clickedButton.addClass("selectedsy")
    setTimeout(function(){clickedButton.removeClass("selectedsy")},1000)
})

// display the clicked number on calculator window 
$(".num-pallet-btn").click(function(){
    if (this.id != 'backspace')
    {
        let clickedButtonValue = $(this).text().trim()
        $(".typingSpace").val($(".typingSpace").val() + clickedButtonValue)
    }
})

// display the clicked symbols on calculator window 
$(".num-pallet-sy-btn").click(function(){
    if (this.id != 'clear' && this.id != 'eqaulTo')
    {
        let clickedButtonValue = $(this).text().trim()
        $(".typingSpace").val($(".typingSpace").val() + clickedButtonValue)
    }

})

// AC clear all
$("#clear").click(function()
{
    $(".typingSpace").val("")
})

// //backspace
$("#backspace").click(function() {
    // get value from typing
    let currentValue = $(".typingSpace").val().trim();
    // remove the last elemnt
    let editedValue = currentValue.slice(0, -1);
    //push again
    $(".typingSpace").val(editedValue)
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

//equal
let expressionList = {"2+2" : "5"}
$("#eqaulTo").click(function () {
    let expression = $(".typingSpace").val();
    let result 
    try{
        result = eval(expression);
        if(!isFinite(result))
        {
            throw new Error ("Invalid")
        }
    }
    catch(e)
    {
        Toast.fire({icon: 'error',title: 'Invalid expression'});
        setTimeout(() => $(".typingSpace").val(""), 1000);
        return;
    }
     
    $(".typingSpace").val(result);

    expressionList[expression] = result;

    localStorage.setItem('expressionList', JSON.stringify(expressionList));
    
});


const HISTORY_KEY = "calcHistory";
const HISTORY_LIMIT = 20;

let history = [];
try {
    history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
} catch (e) {
    history = [];
}

function saveHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistory() {
    let $list = $("#historyItems");
    if (history.length === 0) {
        $list.html('<div class="history-empty">No calculations yet</div>');
        return;
    }
    let rows = history.slice().reverse().map(function (item, i) {
        let realIndex = history.length - 1 - i;
        return '<div class="history-item" data-index="' + realIndex + '">' +
            item.expr + ' = ' + item.result +
            '</div>';
    });
    $list.html(rows.join(""));
}

function addHistory(expr, result) {
    history.push({ expr: expr, result: String(result) });
    if (history.length > HISTORY_LIMIT) {
        history = history.slice(history.length - HISTORY_LIMIT);
    }
    saveHistory();
    renderHistory();
}

renderHistory();

// open/close the history dropdown
$("#historyToggle").click(function () {
    $("#historyPanel").slideToggle(150);
});

// click a past entry to load its result back into the display
$("#historyItems").on("click", ".history-item", function () {
    let idx = $(this).data("index");
    let item = history[idx];
    if (item) {
        $(".typingSpace").val(item.result);
    }
});


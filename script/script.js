
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
        let clickedButtonValue = $(this).text()
        $(".typingSpace").val($(".typingSpace").val() + clickedButtonValue)
    }
})

// display the clicked symbols on calculator window 
$(".num-pallet-sy-btn").click(function(){
    if (this.id != 'clear' && this.id != 'bracket' && this.id != 'eqaulTo')
    {
        let clickedButtonValue = $(this).text()
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
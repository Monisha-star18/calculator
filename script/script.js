
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
        $(".typingSpace").append(clickedButtonValue)
    }
})

$(".num-pallet-sy-btn").click(function(){
    if (this.id != 'clear' && this.id != 'bracket' && this.id != 'eqaulTo')
    {
        let clickedButtonValue = $(this).text()
        $(".typingSpace").append(clickedButtonValue)
    }
})

// AC clear all
$("#clear").click(function()
{
    $(".typingSpace").text("")
})

// //backspace
$("#backspace").click(function() {
    // get value from typing
    let currentValue = $(".typingSpace").text().trim();
    // remove the last elemnt
    let editedValue = currentValue.slice(0, -1);
    //push again
    $(".typingSpace").text(editedValue);
});
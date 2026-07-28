
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


$(".num-pallet-btn").click(function(){
    
})
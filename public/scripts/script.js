
var sliderPrice = document.getElementById('sliderPrice');

noUiSlider.create(sliderPrice, {
    start: [10, 500],
    connect: true,
    tooltips: true,
    range: {
        'min': 0,
        'max': 1000
    }
});

var sliderArea = document.getElementById('sliderArea');

noUiSlider.create(sliderArea, {
    start: [10, 200],
    connect: true,
    tooltips: true,
    range: {
        'min': 0,
        'max': 300
    }
});

$('#filter-search').submit(function() {

    var values = $(this).serialize();

    var priceData = sliderPrice.noUiSlider.get();
    var areaData = sliderArea.noUiSlider.get();

    values += "&priceMin=" + priceData[0] + "&priceMax=" + priceData[1]
            + "&areaMin=" + areaData[0] + "&areaMax=" + areaData[1];

    $.post("/list", values, function(data) {
        document.getElementById("list-container").innerHTML = data;

        $("tbody tr").on( 'click', function (a) {

            var url = $(this).data("href");
            window.location = url;

        });

    }); 

    return false;

});



function submitNew() {

    window.location = "/form";

    return false;

}

$(function(){
    
    $('div.segmented-control a').on('click', function(){
        
        $('div.segmented-control a').each(function(i,e){
            $(e).removeClass('active');
        });
        
        $(this).addClass('active');
        $(this).find('input').prop('checked',true);
        return false;
        
    });
    
});


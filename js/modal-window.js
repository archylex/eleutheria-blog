var display_modal = false;

function show_modal(what){
    if(!display_modal){  
        $(what).fadeIn("slow");  
        display_modal = true;  
    }  
}

function hide_modal(what){  
    if(display_modal){  
        $(what).fadeOut("slow");  
        display_modal = false;  
    }  
}

function center_modal(what){  
    var windowHeight = document.getElementById('desktop').clientHeight;  
    var windowWidth = document.getElementById('desktop').clientWidth;
    var panelWidth = document.getElementById('left_panel').clientWidth;    
    var paddingDiff = parseInt($("#window_content").css('padding-top')) + parseInt($("#window_content").css('padding-bottom'));
    var max_width = windowWidth * 0.8;
    var max_height = windowHeight * 0.8;
    var half_w = $(what).width() <= max_width ? $(what).width()/2 : max_width/2;
    var half_h = $(what).height() <= max_height ? $(what).height()/2 : max_height/2;console.log(paddingDiff);
      
    $(what).css({  
        "position": "absolute",  
        "max-width": max_width,
        "max-height": max_height,
        "top": windowHeight/2 - half_h - windowHeight/20,
        "left": windowWidth/2 - half_w + panelWidth  
    });  

    $("#window_content").css({
        "max-width": max_width,
        "max-height": max_height - $("#window_panel").height() - paddingDiff
    });
}

function openModalWindow(name) {    
    var modal = "#" + name;
    center_modal(modal);
    show_modal(modal);    
}

function closeModalWindow(name) {
    hide_modal("#" + name);    
}

$(function() {
    $("#close_window").click(function() {
        last_content = 0;
        closeModalWindow("file_viewer");
    });    
});
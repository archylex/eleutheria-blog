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
      
    $(what).css({  
        "position": "absolute",  
        "max-width": windowWidth * 0.8,
        "max-height": windowHeight * 0.8,
        "top": windowHeight/2 - $(what).height()/2 - windowHeight/20,
        "left": windowWidth/2 - $(what).width()/2 + panelWidth  
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
        closeModalWindow("file_viewer");
    });    
});
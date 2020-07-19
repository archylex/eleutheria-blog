var display_lang = false;

function showLangPanel() {
    $("#lang_panel").animate({ width: "toggle" });    
    display_lang = true;
    setTimeout(() => {  
        $(".lang").slideDown();
    }, 400);      
}

function hideLangPanel() {
    display_lang = false;    
    $("#lang_panel").animate({ width: "toggle" });
    $("#langs").css({
        "background": "url('/images/lang.png')",
        "background-repeat": "no-repeat"
    });
    $(".lang").hide();    
}

$(function() {
    localStorage.setItem("language", "en");

    $("#langs").click(function() {
        if (display_lang)
            hideLangPanel();
        else
            showLangPanel();
    });

    $(".lang").click(function() {        
        localStorage.setItem("language", this.id);
        refreshFS();
        hideLangPanel();        
    });
});
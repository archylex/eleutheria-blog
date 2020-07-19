var last_tree = 0;

function updateFS(id) {
    $("ul#content_menu_folders").html('');

    if (id == 0) 
        getFolders(id);
    else
        getParent(id); 

    getFiles(id);
}

function getParent(child_id) {
    $.post(
        'php/getData.php',         
        { 
            input: [ "get_parent", child_id ] 
        },
        function(data) {                               
            $.each(data, function(i) {
                $.each(data[i], function(key, val) {                    
                    $("#content_menu_folders").append('<li class="menu_folder" id="' + val + '">..</li>'); 
                    getFolders(child_id);
                });
            });
        }, 
        'json'
    );
}

function getFolders(child_id) {
    $.post(
        'php/getData.php',         
        { 
            input: [ "get_folders", child_id, localStorage.getItem("language") ] 
        },
        function(data) {
            $.each(data, function(i) {
                $.each(data[i], function(key, val) {
                    $("#content_menu_folders").append('<li class="menu_folder" id="' + key + '">' + val + '</li>');                    
                });
            });
            clickListner();
        }, 
        'json'
    );
}

function getFiles(child_id) {
    $.post(
        'php/getData.php',         
        { 
            input: [ "get_files", child_id, localStorage.getItem("language") ] 
        },
        function(data) { 
            $("ul#content_menu_files").html('');
            $.each(data, function(i) {
                $.each(data[i], function(key, val) {
                    $("#content_menu_files").append('<li class="menu_file" id="' + key + '">' + val + '</li>');                    
                });
            });            
        }, 
        'json'
    );
}

function getContent(id) {
    $.post(
        'php/getData.php',         
        { 
            input: [ "get_content", id, localStorage.getItem("language") ] 
        },
        function(data) {                               
            $.each(data, function(i) {
                $.each(data[i], function(key, val) {                    
                    $("#window_content").append(val); 
                });
            });

            openModalWindow("file_viewer");
        }, 
        'json'
    );
}

function clickListner() {
    $(".menu_folder").click(function() {  	
        last_tree = this.id;
        updateFS(this.id);        
  	});

    $(".menu_file").click(function() {  	
        if (display_modal) {
            closeModalWindow("file_viewer");

            setTimeout(() => {  
                $("#window_content").html(''); 
                getContent(this.id);        
            }, 700);            
        } else {
            $("#window_content").html(''); 
            getContent(this.id);        
        }
  	});
}

function refreshFS() {
    updateFS(last_tree);
}

$(document).ready(function() {  
    refreshFS();
    clickListner();
});

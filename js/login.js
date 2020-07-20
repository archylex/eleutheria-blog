function showForm() {
    var form = "<center><form action=\"\" method=\"post\"> \
	<p><input type=\"text\" name=\"user\" value=\"\" placeholder=\"user\" /></p> \
	<p><input type=\"password\" name=\"password\" value=\"\" placeholder=\"password\" /></p> \
	<p><input type=\"submit\" name=\"submit\" value=\"Log In\" /></p> \
	</form></center>";
    $("#window_content").append(form); 
    openModalWindow("file_viewer");
}

$("#login").click(function() {  	
    if (display_modal) {
        closeModalWindow("file_viewer");

        setTimeout(() => {  
            $("#window_content").html(''); 
            showForm();
        }, 700);            
    } else {
        $("#window_content").html(''); 
        showForm();       
    }
});
$(document).ready(function(){
    $('#myfile').on('change',function(){
        if(this.files && this.files[0]) {
        var reader = new FileReader();  
        reader.onload = function(e){
                console.log(e.target.result)
                $('.preview').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    })
})
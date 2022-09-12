    
$(document).ready(function () {
    $("#submit").submit(function (e) {
     e.preventDefault()
     var formData = new FormData();
     formData.append('title',$('#title').val())
     formData.append('des',$('#des').val())
     formData.append('mypic', $('#myfile')[0].files[0]);
     
         $.ajax({
             type:'POST',
             url:'/store',
             data:formData,
             cache:false,
             contentType: false,
             processData: false,
             success:function(data){
                 var { data } = data
                 if(data == 'success'){
                     $("#submit").trigger("reset")
                 }                 
 
             },
             error: function(data){
                 console.log("error");
                 console.log(data);
                 
             }
         });
     });
 });
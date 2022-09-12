function pagination(){
  $('.pagination-container').empty()
   const setLimit = Math.ceil(parseInt($("#source").val())/3)
   const currentButton = parseInt($("#index").val())
   $('.pagination-container').append(`
   <span class="page-item" id="CaretLeftFill">
    <button class="page-link"  onclick="page(${currentButton-1})">Previous</button>
   </span>`)
  $('.pagination-container').append(`<div id="pagination" class="d-flex"></div>`)
 
   const pagedot = $('#pagination')
   const page = setLimit
   if(currentButton === 1){
    $('#CaretLeftFill').addClass("disabled")
   }else{
    $('#CaretLeftFill').removeClass("disabled")
   }
   
 
   
   const no_of_page = []
   var arr_of_cur_btn = []
   const element = []
   for(let i = 1; i <=page; i++) {
     no_of_page.push(i)
   }
   
   let temp_no_of_page = [...arr_of_cur_btn]
   let dotsInitial = '...'
   let dotsLeft = '...'
   let dotsRight = '...'
   if (no_of_page.length < 6) {
     temp_no_of_page = no_of_page
   }else if (currentButton >= 1 && currentButton <= 2) {
     temp_no_of_page = [1, 2, 3, dotsInitial, no_of_page.length]
   }else if (currentButton === 3) {
   const sliced = no_of_page.slice(0, 4)
    temp_no_of_page  = [...sliced, dotsInitial, no_of_page.length]
   } else if (currentButton > 3 && currentButton < no_of_page.length - 2) {               // from 5 to 8 -> (10 - 2)
   const sliced1 = no_of_page.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
   const sliced2 = no_of_page.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
   temp_no_of_page  = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, no_of_page.length]) // [1, '...', 4, 5, 6, '...', 10]
   }else if (currentButton > no_of_page.length - 3) {                 // > 7
   const sliced = no_of_page.slice(no_of_page.length - 4)       // slice(10-4) 
   temp_no_of_page = ([1, dotsLeft, ...sliced])                        
   }

   arr_of_cur_btn = temp_no_of_page
   arr_of_cur_btn.forEach(function(el,ind){
   let voteable = el === currentButton ? "active" : ""
   let dotinit = el === "..." ?"init":""
   pagedot.append($(`
     <span class="page-item ${voteable+dotinit}">
       <button  class="page-link" data-page="${el}" onclick="page(${el})">${el}</button>
     </span>
     `)[0])
  })

  $('.pagination-container').append(`
  <span class="page-item" id="CaretRightFill">
     <button class="page-link" onclick="page(${currentButton+1})">Next</button>
  </span>`)

if(currentButton === page){
$('#CaretRightFill').addClass("disabled")
}else{
$('#CaretRightFill').removeClass("disabled")
}
  
  //<a  href="/?page=${el}" class="page-link" id="CaretRightFill">${el}</a>
}
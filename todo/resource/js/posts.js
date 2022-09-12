$(function(){
    posts()
 })
 var check = 1;
 function posts(page=null){
  
  let search = null;
  const urlParams = new URLSearchParams(window.location.search);
  const url = new URL(window.location);
  //page param set
  if(urlParams.has('page')){
    url.searchParams.set('page', urlParams.get('page'));
  }
 

  $('.list-group').empty()
    $.post(`${url.href}`,
         {search:search},
       function (data, status) {
          var {data,limit,index} = data
          
          data.forEach(element => {
              $('.list-group').append(`
                <li class="list-group-item d-flex justify-content-center border-0">
                  <div class="card w-100" style="max-width: 28rem;">
                      <a href="/post/${element.id}">
                        <img class="card-img-top" src="/post/${element.image}" alt="Card image cap" />  
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">
                          ${element.des}
                        </p>
                        
                        <div class="d-flex">
                         
                          <a href="/edit/${element.id}" class="btn btn-info mr-2">Edit</a>
                          <button onclick="deletePost(${element.id})" class="btn btn-danger">Delete</button>
                        </div>
                      </div>
                  </div>
                </li>
               `)
          });
          $('#source').val(limit[0].total)
          $('#index').val(index)
          pagination()
          if(page){
             $(document).scrollTop($(document).height())
          }
      });

      return  new Promise(function(resolve) {
          resolve($(document).height())
     });
   
 }

 function deletePost(id){
  $.post("/delete",
        {
           id:id
        },
       function (data, status) {
          posts()
       });
 }


async function page(id){
  check = true
  if(history.pushState){
    const url = new URL(window.location);
    url.searchParams.set('page', id);
    window.history.pushState(null, '', url.toString());
    posts(check)
  }
}

//search 
const usePost = throttle((text)=>{
  console.log(text)
  posts(check)
  
},1000)

$('#search-box').on('input',(e)=>{
   //search param set
   const urlParams = new URLSearchParams(window.location.search);
   if(urlParams.has('page')){
    const url = new URL(window.location);
    url.searchParams.set('page',1);
    window.history.pushState(null, '', url.toString());
  }

  if(history.pushState){
    const url = new URL(window.location);
    url.searchParams.set('search', e.target.value);
    window.history.pushState(null, '', url.toString());
    //using throttling
     usePost(e.target.value)
    //posts(check)
  }
})

function throttle(cd,delay=1000){
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = ()=>{
    if(waitingArgs==null){
      shouldWait = false
    }else{
     
      cd(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc,delay)
    }
    
  }
   return (...args)=>{
  
    if(shouldWait){
      waitingArgs = args
      return
    }
    cd(...args)
    
    shouldWait = true
    setTimeout(timeoutFunc,delay)
   }
}


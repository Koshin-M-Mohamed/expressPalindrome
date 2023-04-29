console.log("hello")
document.querySelector('#button').addEventListener('click', validate)
function validate(){

const word = document.querySelector("#word").value; 
fetch('api', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'palindrome': word,
    })
  }).then(response => {
    window.location.reload()    
  })

}

let deletebtn = document.querySelectorAll("#deletebtn")

Array.from(deletebtn).forEach(function(element) {
    element.addEventListener('click', function(){
      fetch('delete', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': element.dataset.id
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
  });
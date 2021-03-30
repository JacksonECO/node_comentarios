(function readyJS(win,doc){

  let form1 = doc.querySelector('#form1');
  let name = doc.querySelector('#name');
  // let response = doc.querySelector('.response');

  function sendForm(event){
    console.log("sendForm");
    event.preventDefault();
    let ajax = new XMLHttpRequest();
    let params = 'name='+name.value;
    ajax.open("POST", 'http://localhost:3333/api/addComment');
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    ajax.onreadystatechange = function(){
      if(ajax.status === 200 && ajax.readyState === 4){
        let arr = JSON.parse(ajax.responseText);
        // response.innerHTML = "O usuário "+arr.name+" possui "+arr.age+" anos de idade";
        console.log(arr);
      }
    };
    ajax.send(params);
  }
  form1.addEventListener('submit', sendForm, false);
})(window, document);
(function readyJS(win,doc){
  let form1 = doc.querySelector('#form1');
  let name = doc.querySelector('#name');
  // let response = doc.querySelector('.response');

  function sendForm(event){
    event.preventDefault();
    let valid = false;
    for (x = 0; x < name.value.length; x++) {
      if (name.value[x] !== '\n' && name.value[x] !== ' '){
        valid = true;
        break;
      }
    }
    if (valid){
      console.log(name.value);
      let ajax = new XMLHttpRequest();
      ajax.open("POST", 'http://localhost:3333/api/addComment');
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
          // let arr = JSON.parse(ajax.responseText);
          // response.innerHTML = "O usuário "+arr.name+" possui "+arr.age+" anos de idade";
          console.log(ajax.responseText);

          let comment = ""
          let comment2 = ""

          for (x = 0; x < name.value.length; x++) {
            if (name.value[x] == '\n') {
              if (x != name.value.length - 1) {
                comment = comment + "<br>"
                comment2 = comment2 + " "
              }
            }
            else{
              comment = comment + name.value[x]
              comment2 = comment2 + name.value[x]
            }
          }
          const fun = "donwloadVoice('" + comment2 + "');";

          var list = document.querySelector('#listComments');
          var item = document.createElement('dt');
          item.innerHTML =
            "<table width='100%'>" +
            "<td width = '75%'>" +
            "<h6>" +
            comment +
            "<br><br>" +
            "</h6>" +
            "</td>" +

            "<td width='5%'></td>" +

            "<td width='20%'>" +
            '<button type="submit" class="btn btn-outline-success" onclick="' + fun + '">Ouvir</button>' +
            "</td>" +
            "</table>"


          list.appendChild(item);

          name.value = ""
        } else if (ajax.status === 503 && ajax.readyState === 4){
          alert("Exitem algum problema com o banco de dados, verifique a conexão!!!")
        }
      };
      ajax.send('name=' + name.value);

    }else {
      alert("Digite um comentário primeiro!")
    }
  }
  form1.addEventListener('submit', sendForm, false);
})(window, document);

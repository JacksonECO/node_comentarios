(function readyJS(win,doc){
  let form1 = doc.querySelector('#form1');
  let name = doc.querySelector('#name');
  // let response = doc.querySelector('.response');

  function sendForm(event){
    event.preventDefault();
    if (name.value !== ""){
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

          for (x = 0; x < name.value.length; x++) {
            if (name.value[x] == '\n')
              comment = comment + "<br>"
            else
              comment = comment + name.value[x]
          }
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
            "<button type='button' class='btn btn-outline-success'>Ouvir</button>" +
            "</td>" +
            "</table>"

          list.appendChild(item);

          name.value = ""
        }
      };
      ajax.send('name=' + name.value);

    }
  }
  form1.addEventListener('submit', sendForm, false);
})(window, document);

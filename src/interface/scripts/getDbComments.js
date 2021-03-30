(function getDocuments(win, doc) {
  let listComments = doc.querySelector('#listComments');

  let ajax = new XMLHttpRequest();
  ajax.open("GET", 'http://localhost:3333/api/comments');
  ajax.onreadystatechange = function () {
    if (ajax.status === 200 && ajax.readyState === 4) {
      let db = JSON.parse(ajax.responseText);
      // response.innerHTML = "O usuário "+arr.name+" possui "+arr.age+" anos de idade";
      console.log(db);

      for (y=0; y<db.length; y++) {
        // console.log(db[y].comment)
        const element = db[y].comment;
        let comment = ""
        // console.log(element.length)

        for (x = 0; x < element.length; x++) {
          if (element[x] == '\n')
            comment = comment + "<br>"
          else
            comment = comment + element[x]
        }
        console.log(comment)

        const list = document.querySelector('#listComments');

        const item = document.createElement('dt');
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
      };
      
    }
  };
  ajax.send();

})(window, document);





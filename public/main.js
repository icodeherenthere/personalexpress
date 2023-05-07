var resonate = document.getElementsByClassName("fa-arrow-up");
var trash = document.getElementsByClassName("gone").addEventListener('click', button);
const select = document.getElementById("feelingsDropDown").addEventListener('change', handleSelect)

// function colorChange(){
//   let
// }

Array.from(resonate).forEach(function(element) {
      element.addEventListener('click', function(){
        const emotion = this.parentNode.parentNode.childNodes[1].innerText
        const vent = this.parentNode.parentNode.childNodes[3].innerText
        fetch('feelings/resonate', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'emotion': emotion,
            'vent': vent,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const emotion = this.parentNode.parentNode.childNodes[1].innerText
        const vent = this.parentNode.parentNode.childNodes[3].innerText
        fetch('feelings', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'emotion': emotion,
            'vent': vent
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

function handleSelect(e) {
  const feelingsIndex = e.target.selectedIndex - 1
  console.log("feelings", events[eventIndex])

  for (let i = 0; i < feelings.length; i++) {
    
    if (feelings[i].classList.contains("hidden") !== true) {
    
      feelings[i].classList.add("hidden")
    }
  }
  feelings[feelingsIndex].classList.remove("hidden")
}

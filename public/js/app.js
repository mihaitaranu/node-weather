const form = document.querySelector('form');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    let search = document.querySelector('input').value
    fetch('http://localhost:3000/weather?address='+search).then((response) => {
    response.json().then((data) => {
       if(data.error){
            console.log(data)
       }else{
            console.log(data.message)
            console.log(data.location)
       }
    })
})
})


console.log(`Client side JS`)

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const errorMessage = document.querySelector('#message-1')
const forcastMessage =  document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const address = weatherInput.value 

    fetch(`http://localhost:3000/weather?address=${address}`).then( (response) => {

        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent =  data.error
                forcastMessage.textContent = ``
                return
            }

            errorMessage.textContent = ``
            forcastMessage.textContent = `${data.forecast}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out!`;
        })

    })
})






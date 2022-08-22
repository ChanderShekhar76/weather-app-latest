const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const txt1 = document.getElementById('msg1')
const txt2 = document.getElementById('msg2')
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            console.log(data)
            txt1.innerText= `Location is ${data.location}`
            txt2.innerText=`Location is ${data.temperature}`
        })
    })
})
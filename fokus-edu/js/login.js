//---AJAX for signup---------------
const form = document.querySelector(".signup-section form"),
continueBtn = form.querySelector(".form-group button"),
errorText = form.querySelector(".error-txt");

form.onsubmit = (e) => {
    e.preventDefault();//preventing form from submit
}

continueBtn.onclick = () => {
    //starting AJAX
    let xhr = new XMLHttpRequest();//creating xml object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(data == "success"){
                    location.href = "index.html";
                }
                else{
                    errorText.textContent = data;
                    errorText.style.display = "block"; 
               }
            }
        }
    }

    //we have to send the form data through ajax to php
    let formData = new FormData(form);  //creating new formData object
    xhr.send(formData);  //sending the form data to php
    
}
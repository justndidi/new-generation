// const btn = document.querySelectorAll(".button");
// // const content = document.querySelectorAll(".hidden");


// btn.forEach(button =>{
//     button.addEventListener("click", ()=>{
//         const header = button.closest(".header");
//         const content = header.querySelector(".hidden");
//         hidden.classList.toggle("show"); 
//         if(hidden.classList.contains("show")){
//             // content.style.display = "block";
//             button.textContent = "Close x";
//         } else{
//             // content.style.display = "none";
//             button.textContent = "READ MORE";
//         }
//     });
// });

const btn = document.querySelector(".button");
const content = document.querySelector(".alte-hidden");


btn.addEventListener("click", ()=>{
    if(content.style.display == "none"){
        content.style.display = "block";
        btn.textContent = "close x";
    }else{
        content.style.display = "none"
        btn.textContent = "read more"
    }
});

//second genre type
const btn_2 = document.querySelector(".button_2");
const content_2 = document.querySelector(".naija-hidden");
btn_2.addEventListener("click", ()=>{
    if(content_2.style.display == "none"){
        content_2.style.display = "block";
        btn_2.textContent = "close x";
    } else{
        content_2.style.display = "none"
        btn_2.textContent = "read more"
    }
});

//third genre type
const btn_3 = document.querySelector(".button_3");
const content_3 = document.querySelector(".hidden");
btn_3.addEventListener("click", ()=>{
    if(content_3.style.display == "none"){
        content_3.style.display = "block";
        btn_3.textContent = "close x";
    } else{
        content_3.style.display = "none";
        btn_3.textContent = "read more";
    }
});

//fourth genre type
const btn_4 = document.querySelector(".button_4");
const content_4 = document.querySelector(".hidden-1");
btn_4.addEventListener("click", ()=>{
    if(content_4.style.display == "none"){
        content_4.style.display = "block";
        btn_4.textContent = "close x";
    } else{
        content_4.style.display = "none";
        btn_4.textContent = "read more"
    }
});

//fifth genre type
const btn_5 = document.querySelector(".button_5");
const content_5 = document.querySelector(".hidden-2");
btn_5.addEventListener("click", ()=>{
    if(content_5.style.display == "none"){
        content_5.style.display = "block";
        btn_5.textContent = "close x";
    }else{
       content_5.style.display = "none";
       btn_5.textContent = "read more";
    }
});

//sixth genre type
const btn_6 = document.querySelector(".button_6");
const content_6 = document.querySelector(".hidden-3");
btn_6.addEventListener("click", ()=>{
    if(content_6.style.display == "none"){
        content_6.style.display = "block";
        btn_6.textContent = "close x";
    } else{
        content_6.style.display = "none";
        btn_6.textContent = "read more";
    }
});

const form = document.getElementById("form");
const successMessage = document.getElementById("successMessage");
const welcomeText = document.getElementById("welcomeText");

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    form.style.display = "none";
    successMessage.classList.add("show");
    welcomeText.textContent = `Welcome to the wave, ${name}. First drop lands in your inbox soon.`;

    setTimeout(()=>{
        successMessage.classList.remove("show");
        form.style.display = "flex";
        form.reset();
    }, 5000);
});


const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".close-btn");
const list = document.querySelector(".list");
menuBtn.addEventListener("click", ()=>{
    list.classList.add("active");
});
closeBtn.addEventListener("click", ()=>{
    list.classList.remove("active");
});

// localStorage.getItem({"usr"})
const container =  document.querySelector(".container")
let start_button = document.querySelector("#start")
let difficulty_button = document.querySelector("#difficulty")
let difficulty_button_clicked
let sound_button = document.querySelector("#sound")
let sound_container = document.querySelector("#sound_container")
let sound_button_clicked
let exit_container = document.getElementById("exit_container")
let exit_button = document.getElementById("exit")
let difficulty = "Easy"
let sound = "On"


start_button.addEventListener("click",()=>{
    location.href = 'game.html'
})


difficulty_button.addEventListener("click",()=>{
    let difficulty_options = ["Easy","Medium","Hard"]
    difficulty_button_clicked = !difficulty_button_clicked
    if (difficulty_button_clicked) {
        if (sound_button_clicked) {
            sound_button_clicked = !sound_button_clicked
            option_remover(["On", "Off"])
        }
        opton_adder(difficulty_options,sound_container,difficulty)
    }else{
        option_remover(difficulty_options)
    }
})


sound_button.addEventListener("click", () => {
    sound_button_clicked = !sound_button_clicked
    let sound_options = ["On", "Off"]
    if (sound_button_clicked) {
        if (difficulty_button_clicked) {
            difficulty_button_clicked = !difficulty_button_clicked
            option_remover(["Easy", "Medium", "Hard"])
        }
        opton_adder(sound_options, exit_container,sound)
    } else {
        option_remover(sound_options)
    }
})


exit_button.addEventListener("click", ()=>{
    window.history.go(-1)
})

function opton_adder(options,append_before,status) {
    options.forEach(option => {
        let div = document.createElement("div")
        let blur = document.createElement("div")
        let mode = document.createElement("button")
        div.className = "options"
        div.id = `${option}_container`
        blur.className = "blur"
        mode.className = "option_button"
        mode.id = option
        mode.innerHTML = option
        mode.value = option
        mode.onclick = coming_soon
        div.appendChild(blur)
        div.appendChild(mode)
        container.insertBefore(div, append_before)
    });
    
    let buttons = document.querySelectorAll(".option_button")
    for (let i = 0; i < Object.keys(buttons).length; i++) {
        buttons[i].addEventListener("click", () => {
            status = buttons[i].value
        })
    }
    
}
function option_remover(options) {
    options.forEach(option => {
        container.removeChild(document.querySelector(`#${option}_container`))
    });
}

function coming_soon() {
    alert("This feature will come soon. Stay tuned !!! 😊")
}
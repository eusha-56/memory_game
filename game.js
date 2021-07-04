let cards_flipped = 0
let moves_left = grid() ** 2
let moves_left_text = document.getElementById("moves_left")
let cards_clicked = []
let cards_left = grid() ** 2

function grid() {
    return 6
}

function image_values() {
    let imges = []
    for (let i = 1; i <= grid() ** 2 / 2; i++) {
        imges.push(`${i}_fruit`)
        imges.push(`${i}_fruit`)
    }
    return shuffle(imges)
}

function shuffle(arr) {
    let shuffled_arr = []
    while (arr.length > 0) {
        let random_index = Math.floor(Math.random() * arr.length)
        shuffled_arr.push(arr[random_index])
        arr.splice(random_index,1)
    }
    return shuffled_arr
}


function grid_maker() {
    moves_left = grid() ** 2
    moves_left_text.innerHTML = `Moves left: ${moves_left}`
    let game_container = document.querySelector(".game_container")
    game_container.innerHTML = ""
    let grid_template_columns = ""
    
    for (let i = 0; i < grid(); i++) {
        grid_template_columns += " auto"
    }
    game_container.style.gridTemplateColumns = grid_template_columns
    let imges = image_values()
    for (let i = 0; i < grid() * grid(); i++) {
        var card_flipper = document.createElement("div")
        var card_container = document.createElement("div")
        var card_front = document.createElement("img")
        var card_back = document.createElement("img")
        
        card_flipper.className = "card_flipper"
        card_container.className ="card_container"
        card_container.value = imges[i]
        card_front.className = "card_front"
        card_back.className = "card_back"
        card_front.src = "images/card_front.jpg"
        card_back.src = `fruits/${imges[i]}.jpg`
        card_container.appendChild(card_front)
        card_container.appendChild(card_back)
        card_flipper.appendChild(card_container)
        game_container.appendChild(card_flipper)
    }
    show_cards()
    flip()
}

function show_cards() {
    let cards = document.querySelectorAll(".card_container")
    setTimeout(() => {        
        for (let i = 0; i < Object.keys(cards).length; i++) {
            cards[i].style.transform = "rotateY(180deg)"
        }
    }, 1500);
    setTimeout(() => {
        for (let i = 0; i < Object.keys(cards).length; i++) {
            cards[i].style.transform = "rotateY(0deg)"
        }
    }, 4500);
}


//adding flip to cards
function flip() {
    var cards = document.querySelectorAll(".card_container")
    for (let i = 0; i < Object.keys(cards).length; i++) {
        cards[i].addEventListener("click", flip_enable)
    }
}


function flip_enable() {
    this.style.transform = "rotateY(180deg)"
    cards_clicked.push(this)
    cards_flipped++
    if (cards_flipped > 1) {
        flip_disable()
        if (cards_clicked[0].value === cards_clicked[1].value) {
            cards_left = cards_left - 2
            setTimeout(() => {
                cards_clicked.forEach(element => {
                    element.classList.remove("card_container")
                    element.className = "completed_card_container"
                    element.innerHTML = ""
                });
            }, 1000);
        }
        setTimeout(() => {
            reverse_flip()
            if (moves_left > 0) {
                flip()
            }else{
                moves_finished()
            }
            if (cards_left === 0) {
                game_finished()
            }
        }, 1000);
    }
}


function game_finished() {
    if (confirm(`Wow that's great!! You have finished the game with ${grid() ** 2 - moves_left} moves only. Wanna play again?`)) {
        grid_closer()
        grid_maker()
    }
}


function moves_finished() {
    if(confirm("Ops! You have run out of moves. Restart?")){
        grid_closer()
        grid_maker()
    }
}


function flip_disable() {
    var cards = document.querySelectorAll(".card_container")
    for (let i = 0; i < Object.keys(cards).length; i++){
        cards[i].removeEventListener("click",flip_enable)
    }
}


function reverse_flip() {
    cards_clicked.forEach(element => {
        element.style.transform = "rotateY(0deg)"
    })
    cards_clicked = []
    card_values = []
    cards_flipped = 0
    moves_left--
    moves_left_text.innerHTML = `Moves left: ${moves_left}`
}


function grid_closer() {
    moves_left = 0 
    cards_flipped = 0
    moves_left_text.innerHTML = `Moves left: ${moves_left}`
    document.querySelector(".game_container").innerHTML = ""
}

function reset() {
    if (confirm("Confirm reset?")) {
        grid_closer()
        grid_maker()
    }
}

function back() {
    if (confirm("Confirm Close?")) {
        window.history.back()
    }
}

grid_maker()

// defines all the buttons as javascript variables
//key word  //Var name  //

//----------------------------------------------------------- BROWSER SIZE
//idea from gpt, used mdm resize
//resize seems to only work on windows opened with window.open - gpt suggests that window.resizeTo is often ignored by browswer
//for secuirty reasons.

//see notes.txt - NOTE 3 ************
window.addEventListener("resize", () => {
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    if (ww < 700 || wh < 500) { //need to research what this || means exactly but I think its a logical OR.
        document.body.style.overflow = "auto"; // Show scrollbars
    } else {
        document.body.style.overflow = "hidden"; // Hide scrollbars
    }
});


//----------------------------------------------------------- VARIABLES
let number_1 = document.getElementById("num1"); //whatever is inside the <p> for numberbox 1
let number_2 = document.getElementById("num2"); //whatever is inside the <p> for numberbox 2
let n1b = document.getElementById("n1b"); //numberbox 1 div - lights up from selector
let n2b = document.getElementById("n2b"); //numberbox 2 div - lights up from selector
let op_display = document.getElementById("op_display"); //whatever is inside the <p> for the operator box
let display_screen = document.getElementById("display_screen"); //whatever is inside the <p> for the display screen
let z_screen = document.getElementById("z_display");
//let n1s = 0;
//let n2s = 0;
let getp = document.getElementById("testP"); //the dispaly <p> inside the display window - green box 
let index_screen = document.getElementById("index_display");
let pointer = n1b; //sets default pointer to first number box
let ri = document.getElementById("RI"); //light indicator on the R - green
let li = document.getElementById("LI"); //light indicator on the L - red
const clr = document.getElementById("clr");
const equal_button = document.getElementById("equal");
const plus_button = document.getElementById("plus");
const minus_button = document.getElementById("minus");
const mult_button = document.getElementById("mult");
const divide_button = document.getElementById("divide");
const zero = document.getElementById("0");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const z = document.getElementById("z");
const decimal = document.getElementById("decimal");
const selector_button = document.getElementById("selector");
const bck = document.getElementById("bcksp");
const L = document.getElementById("L");
const R = document.getElementById("R");



//
const calc_log = []; //used to store all the results from the user

//----------------------------------------------------------- FUNCTIONS 

//see notes.txt - NOTE 3 ************
// i don't think this actually does anything!!

getp.addEventListener('resize', () => { //gpt assist with object dimensions 
    let vw = getp.offsetWidth;
    let vh = getp.offsetHeight;

    //parentElement looks at the parent of the the variable getp, which is a div. Then we look at the dimensions through
    //offsetW | offsetH
    let parentWidth = getp.parentElement.offsetWidth;
    let parentHeight = getp.parentElement.offsetHeight;
    if (vw > parentWidth || vh > parentHeight) {
        document.getp.style.overflow = "auto";
    } else {
        document.getp.style.overflow = "hidden";
    }
});
// ultimately just set the overflow to auto in the css - i don't know if ^^ is necessary but a good learning experience. 




//console.log(typeof (index_screen));


//see notes.txt - NOTE 1 for the below info ************


// syntax help utilizing gpt as a teaching tool 
// isNAN = is not a number, and will return false if empty or a string
// could also use IF num1 = null, empty, undefined --- not sure the exact differences between these yet

//NOTES - without the .value, you are not referencing what is made in the HTML, just the variable itself. Ammend with variable_name.value
// if (isNaN(number_1.value)) {
//     number_1.value = 0 // converts any false answers into 0
// }
// if (isNaN(number_2.value)) {
//     number_2.value = 1
// }

// ^^^the above code is no longer useful as I swapped the numberbox away from an input to a <p>. I will simply convert the string into 
//text as I do calculations --> parseFloat

//sets the initialization of numberbox 1
if (pointer === n1b) {
    n1b.style.border = ""
    n2b.style.border = "none";
}
//this part doesn't seem to work - it looks like once this is passed, it will not be evaluated again 
//this is why we need to do it in a function (selector())

// if (pointer === n2b) {
//     n2b.style.border = ""
//     n1b.style.border = "none";
// }

li.style.backgroundColor = "rgb(255, 0, 0)";
// ri.style.backgroundColor = "rgb(0,255,0)";

//assignment functions ------------------------------------------------ assignment functions
let position; //this will always represent the current index in index_screen | assigned in trasnport function
let temp2; //length of either number_1 or number_2

function indicate() {
    // checks where the index is - if at the beginning, the li is red, if at the very end, the ri is green
    if (parseFloat(index_screen.textContent) === 0) {
        li.style.backgroundColor = "rgb(255, 0, 0)";
        ri.style.backgroundColor = "#a2abab";
    } else if (parseFloat(index_screen.textContent) === temp2) {
        ri.style.backgroundColor = "rgb(0, 255, 0)";
        li.style.backgroundColor = "#a2abab";
    } else {
        li.style.backgroundColor = "#a2abab";
        ri.style.backgroundColor = "#a2abab";
    }
}

function index_adjust() {
    position = parseFloat(index_screen.textContent);
    //console.log("init position is: " + position);
    //console.log("index screen is: " + index_screen.textContent);
    if (pointer === n1b) {
        if (number_1.textContent === "--") {
            index_screen.textContent = "0";
        } else {
            index_screen.textContent = number_1.textContent.length;
            temp2 = number_1.textContent.length;
            //console.log("temp2 is: " + temp2);
            //console.log("position is: " + position);
            //console.log("length of index = " + index_screen.length)
            if (number_1.textContent === "") {
                number_1.textContent = "--"
            }
        }
    } else if (pointer === n2b) {
        if (number_2.textContent === "--") {
            index_screen.textContent = "0";
        } else {
            index_screen.textContent = number_2.textContent.length;
            temp2 = number_2.textContent.length;
            if (number_2.textContent === "") {
                number_2.textContent = "--"
            }
        }
        //console.log("length of index = " + index_screen.length)
    }
    //checksthe index position after each addition (resetting to maximum length)
    indicate();
};

function input_numbers(button_number) { // will need to split number_1 at the indexed position, and add the number, then join 
    let splitter = parseFloat(index_screen.textContent);
    if (pointer === n1b) {
        if (number_1.textContent === "--") {
            number_1.textContent = button_number;
            index_adjust();
        } else {
            //number_1.textContent += button_number;
            if (index_screen.textContent < number_1.textContent.length) {
                //console.log("CL current place: " + index_screen.textContent + " || type is: " + typeof (index_screen.textContent));
                //console.log("CL maxlen: " + number_1.textContent.length + " || type is: " + typeof (number_1.textContent.length));

                //see notes.txt - NOTE 2 ************
                //let newstr = number_1.textContent.split("");
                let newstr = number_1.textContent.slice(0, splitter).concat(button_number, number_1.textContent.slice(splitter));
                number_1.textContent = newstr; // why no join?

            } else {
                number_1.textContent += button_number;
            }
            index_adjust();
        }
    } else if (pointer === n2b) {
        if (number_2.textContent === "--") {
            number_2.textContent = button_number;
            index_adjust();
        } else { //this uses split... but actually slice is on number_2.textContent - so its manipulating a string. No join needed 
            if (index_screen.textContent < number_2.textContent.length) {
                let newstr = number_2.textContent.split("");
                console.log("newstr after split is: " + newstr);
                newstr = number_2.textContent.slice(0, splitter).concat(button_number, number_2.textContent.slice(splitter)); // no join
                console.log("newstr after splitter with concat is: " + newstr);
                number_2.textContent = newstr;

            } else {
                number_2.textContent += button_number;
            }
            index_adjust();
        }
    }
};


function selector() {
    if (pointer === n1b) {
        pointer = n2b;
        n2b.style.border = "";
        n1b.style.border = "none";
        index_adjust();
        //console.log(pointer);
    }
    else if (pointer === n2b) {
        pointer = n1b;
        n1b.style.border = "";
        n2b.style.border = "none";
        index_adjust();
        //console.log(pointer);
    }
}

function del() { //this works on an array from split - continues as an array from newstr.slice
    let splitter = parseFloat(index_screen.textContent);
    if (pointer === n1b) {
        //see notes.txt - NOTE 2 ************
        let newstr = number_1.textContent.split("");
        newstr = newstr.slice(0, splitter - 1).concat(newstr.slice(splitter)).join('');
        console.log(newstr);
        number_1.textContent = newstr;
        index_adjust();
    } else if (pointer === n2b) {
        let newstr = number_2.textContent.split("");
        console.log("newstr after split is: " + newstr)
        newstr = newstr.slice(0, splitter - 1).concat(newstr.slice(splitter));//.join('');
        console.log("newstr after splitter with concat is: " + newstr);
        newstr = newstr.join('');
        console.log("newstr after join is: " + newstr);
        number_2.textContent = newstr;
        index_adjust();
    }
}

function transport(direction) {
    //console.log(direction);
    position = parseFloat(index_screen.textContent);
    let maxl;
    if (pointer === n1b) {
        if (number_1.textContent === "--") {
            maxl = 0;
        } else {
            maxl = number_1.textContent.length;
        }
        //console.log(maxl);
    } else {
        if (number_2.textContent === "--") {
            maxl = 0;
        } else {
            maxl = number_2.textContent.length;
        }
        //console.log(maxl);
    }
    if (direction === 'left') {
        if (position > 0) {
            position = position - 1;
            index_screen.textContent = position;
        }
    }
    if (direction === 'right') {
        if (position < maxl) {
            position += 1;
            index_screen.textContent = position;
        }
    }
    //here
    indicate();
};

//math functions ------------------------------------------------------------------- math functions
function add() {
    // takes whatever is set in the number fields
    const n1 = parseFloat(number_1.textContent);
    const n2 = parseFloat(number_2.textContent);
    // the ? is for a terinary statement, the : functions as the else. SO:
    // num1 = 0 if n1 == Nan, otherwise num1 == n1

    // isNaN is not really usefull here but it was a reminant from the previous method of input boxes - i'm leaving it for notes
    const num1 = isNaN(n1) ? 0 : n1; //because we use parseFloat, it will never be isNaN...
    const num2 = isNaN(n2) ? 0 : n2;
    const add_result = num1 + num2;

    display_screen.textContent = add_result.toFixed(2);
    z_screen.textContent = add_result.toFixed(2);
}

function subtract() {
    //takes value of number_1, converts it to a float, and if NaN, =0, else is the existing value
    //isNaN is from input fields, not neccessary but left for learning 
    const n1 = isNaN(parseFloat(number_1.textContent)) ? 0 : parseFloat(number_1.textContent);
    const n2 = isNaN(parseFloat(number_2.textContent)) ? 0 : parseFloat(number_2.textContent);
    const subtract_result = n1 - n2;

    display_screen.textContent = subtract_result.toFixed(2);
    z_screen.textContent = subtract_result.toFixed(2);
}

function mult() {
    const n1 = isNaN(parseFloat(number_1.textContent)) ? 0 : parseFloat(number_1.textContent);
    const n2 = isNaN(parseFloat(number_2.textContent)) ? 0 : parseFloat(number_2.textContent);
    const mult_result = n1 * n2;

    display_screen.textContent = mult_result.toFixed(2);
    z_screen.textContent = mult_result.toFixed(2);
}

function divide() {
    const n1 = isNaN(parseFloat(number_1.textContent)) ? 0 : parseFloat(number_1.textContent);
    const n2 = isNaN(parseFloat(number_2.textContent)) ? 0 : parseFloat(number_2.textContent);
    let divide_result;
    if (n2 == 0) {
        divide_result = "error"
    } else {
        divide_result = (n1 / n2).toFixed(2) //doing this here allows for the error in the if statement
    }

    display_screen.textContent = divide_result;
    z_screen.textContent = divide_result;
}

function operations() {
    const opd = op_display.textContent;
    if (opd === "+") {
        add();
    } else if (opd === "-") {
        subtract();
    } else if (opd === "X") {
        mult();
    } else if (opd === "/") {
        divide();
    }



    //this format of {} means, "creating an object literal"
    //short hand for property value syntax --> opd here (because the value is within scope) is like saying opd:opd 
    calc_log.push({ itr: calc_log.length + 1 + ":", n1: number_1.textContent, opd, n2: number_2.textContent, eq: "=", result: display_screen.textContent });
    //learn reducers -- a reducer is a function where you iterate over the value of an array and create a new value!!!
    // STUDY THIS//
    // ALSO MAP - Map and Reduce and Filter | map - is like reduce but for arrays and returns a new array
    //acc = accumulator
    getp.innerHTML = calc_log.reduce((acc, obj_value) => {
        acc += Object.values(obj_value).join(" ") + "<br>";
        return acc;

    }, "");
}

plus_button.addEventListener("click", function () {
    op_display.textContent = "+"
}
);
minus_button.addEventListener('click', function () {
    op_display.textContent = "-"
}
);
mult_button.addEventListener('click', function () {
    op_display.textContent = "X"
}
);
divide_button.addEventListener('click', function () {
    op_display.textContent = "/"
}
);
equal_button.addEventListener('click', operations);

selector_button.addEventListener("click", selector);

// ----------------------------------------------------------- number buttons 
// still need to enter input at correct index - do later  - 8/23/24 - same idea as backspace

zero.addEventListener("click", () => input_numbers("0"));
one.addEventListener("click", () => input_numbers("1"));
two.addEventListener("click", () => input_numbers("2"));
three.addEventListener("click", () => input_numbers("3"));
four.addEventListener("click", () => input_numbers("4"));
five.addEventListener("click", () => input_numbers("5"));
six.addEventListener("click", () => input_numbers("6"));
seven.addEventListener("click", () => input_numbers("7"));
eight.addEventListener("click", () => input_numbers("8"));
nine.addEventListener("click", () => input_numbers("9"));
z.addEventListener("click", () => {
    if (z_screen.textContent === "Z") {
        null
    } else {
        if (pointer === n1b) {
            number_1.textContent = z_screen.textContent;
            index_adjust();
        } else if (pointer === n2b) {
            number_2.textContent = z_screen.textContent;
            index_adjust();
        }

    }
});
decimal.addEventListener("click", () => {
    if (pointer === n1b) {
        if (number_1.textContent.includes(".")) {
            null
        } else {
            input_numbers(".")
        }
    } else if (pointer === n2b) {
        if (number_2.textContent.includes(".")) {
            null
        } else {
            input_numbers(".")
        }
    }
});
clr.addEventListener("click", () => {
    if (pointer === n1b) {
        number_1.textContent = "--";
        index_adjust();
    } else if (pointer === n2b) {
        number_2.textContent = "--";
        index_adjust();
    }
});
bck.addEventListener("click", del);
//-----//
L.addEventListener("click", () => {
    transport('left');
});
R.addEventListener("click", () => {
    transport('right');
});
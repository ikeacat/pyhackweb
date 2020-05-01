function newGame() {
    localStorage.clear()
    resetLocalStorage()
    startup('start')
}

async function terminalAppInit() {
    document.getElementById("bodytag").classList.add("terminalAppRoot");
    document.getElementById("rootDIV").innerHTML = "<div class='flexRoot' id='fr'><div class='rb' id='resultBox'></div><input id='commandInput' class='ci' placeholder='Enter command here...'></input></div>";
    await sleepNowSecs(2)
    outputToTerminal("Reticulting splines...");
    await sleepNowSecs(2);
    outputToTerminal("Processing command outputs...");
    await sleepNowSecs(2)
    outputToTerminal("Done! Use 'help' to see a list of commands.");
    resetTAListener();
}

function resetTAListener() {
    document.getElementById("commandInput").addEventListener("keydown", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            processTerminalCommand()
        }
    })
}

function outputToTerminal(msg) {
    document.getElementById("resultBox").innerHTML += "<p id='output'>" + msg + "</p>"
    document.getElementById("output").scrollIntoView(true);
    document.getElementById("output").removeAttribute('id');
}

function processTerminalCommand() {
    var usrInp = document.getElementById("commandInput").value;
    document.getElementById('commandInput').value = "";
    outputToTerminal("> " + usrInp);
    var usrinArray = usrInp.split(/[ ]+/);
    // switch things.
    if(usrinArray[0] == "help") {
        outputToTerminal("=== HELP ===");
        outputToTerminal("help: View this list.");
    } else {
        outputToTerminal("Whoops! That command doesnt exist! Use help to view a list of commands.")
    }
}

function sleepNow(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sleepNowSecs(secs) {
    var passSecs = secs * 1000;
    return sleepNow(passSecs);
}

function resetLocalStorage() {
    localStorage.setItem("name", "Unset");
    localStorage.setItem("pw", "alpine");
    localStorage.setItem("version", "Tabby 1.0");
}

async function startup(from) {
    document.getElementById("bodytag").classList.add("startupRoot");
    document.getElementById("rootDIV").innerHTML = "<h1 class='title white dos437'>Smackard Bell</h1>";
    await sleepNowSecs(1);
    document.getElementById("rootDIV").innerHTML += "<p class='white dos437'>Checking RAM...</p>";
    await sleepNowSecs(2);
    document.getElementById("rootDIV").innerHTML += "<p class='white dos437'>Checking Keyboard and Mouse...</p>";
    await sleepNowSecs(5);
    document.getElementById("rootDIV").innerHTML += "<p class='white dos437'>Getting list of boot devices...</p>";
    await sleepNowSecs(2);
    document.getElementById("rootDIV").innerHTML += "<p class='white dos437'>Booting into PyOS Tabby 1.0...</p>";
    await sleepNowSecs(3);
    document.getElementById("bodytag").classList.remove("startupRoot");
    terminalAppInit();
}
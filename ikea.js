var missionarray = new Array;

function newGame() {
    localStorage.clear();
    resetMissionDictionary();
    resetLocalStorage();
    startup('start');
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

function resetMissionDictionary() { // Should only be called at new game.
    // 0: Not Avaliable
    // 1: Avaliable, not Started
    // 2: In Progress
    // 3: Completed.
    missionarray[0] = {"name": "Introduction", "status": 1, "source": "NNID", "description": "The introduction to PyOS and your duties."};
    saveMissionArrayToLS();
}

function saveMissionArrayToLS() {
    var msstring = JSON.stringify(missionarray);
    var msstringlz = LZString.compress(msstring); // We really need to make this small for LS.
    localStorage.setItem("missionarray", msstringlz);
}

function debug(key) {
    if(key == "dcma") {
        var imported = localStorage.getItem("missionarray");
        console.log(imported)
        var dc = LZString.decompress(imported);
        maparsed = JSON.parse(dc);
        console.log(maparsed);
    }
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
        outputToTerminal("missions: Access the Missions App GUI.");
    } else if(usrinArray[0] == "missions") {
        missionApp();
    } 
    else {
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
    localStorage.setItem("missionarray", missionarray);
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

async function missionApp() {
    
    document.getElementById("bodytag").classList.remove("terminalAppRoot")
    document.getElementById("bodytag").classList.add("missionAppRoot");
    document.getElementById("rootDIV").innerHTML = `<div id='missionRows'>
    <div id='missionLeft' class='missionColumns'></div>
    <div id='missionRight'class='missionColumns columnFlex'></div>
    </div>`;
    document.getElementById("missionLeft").innerHTML = "<button class='backdark' onclick='missionApp.toTerm()'></button><h1 id='missionTitle'>Missions</h1><br><h1>Current Mission: None</h1>"
    fitText(document.getElementById("missionTitle"), 0.5);
    document.getElementById("missionRight").innerHTML = "<div class='missionViewItem' id='mslButton'><h1 class='mviText'>Missions List</h1></div><div class='missionViewItem'><h1 class='mviText'>Current Mission</h1></div>";
    document.getElementById("mslButton").addEventListener("click", function() {
        document.getElementById("missionRight").innerHTML = `<table class='missiontableroot'>
        <thead>
            <tr>
                <th colspan="4">Mission List</th>
            </tr>
        </thead>
        <tbody>
            <tr class='missiontableitems'>
                <th>Name</th>
                <th>Source</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
        </tbody>
        </table>`
    });
    fitText(document.getElementsByClassName("missionViewItem")[0], 5);
    fitText(document.getElementsByClassName("missionViewItem")[1], 5);

    function toTerm() {
        document.getElementById("bodytag").classList.remove("missionAppRoot");
        terminalAppInit();
    }

    function viewMissionTable() {
        document.getElementById("missionRight").innerHTML = `<table>
        <thead>
        <tr>
        <th colspan="4">Mission List</th>
        </tr>
        </thead>
        <tbody>
        <tr><td></td></tr>
        </tbody>
        </table>`
    }

    async function initApp() {
        outputToTerminal("> $MISSIONAPP/init.sh")
        await sleepNowSecs(2)
        outputToTerminal("> $TERMINAL/deinit.sh")
        await sleepNowSecs(3)
        outputToTerminal("Terminal app deinited.")
        await sleepNowSecs(1)
    }
    missionApp.toTerm = toTerm;
    missionApp.viewMissionTable = viewMissionTable;
    missionApp.initApp = initApp;
}
class Console {
    constructor() {
        console.log = this.handleLog.bind(this);
        console.error = this.handleError.bind(this);

        let conInput = document.getElementById('input');
        let self = this;
        self.consoleBackbuffer = [];
        conInput.addEventListener('keydown', function(e) {
            if (13 === e.keyCode) {
                let input = conInput.value;
                self.consoleBackbuffer.push(input);
                conInput.value = "";
                if (input.toLowerCase() === 'clear') {
                    self.clear();
                    return;
                }
                self.addConsoleLine(input, 'input');
                try {
                    let returnVal = eval.apply(this, [input]);
                    self.addConsoleLine(returnVal, 'return');
                } catch (e) {
                    self.handleError(e);
                }
            }
        });
        conInput.focus();
    }

    clear() {
        while(document.getElementById('output').hasChildNodes) {
            let blah = document.getElementById('output').lastChild;
            if (blah === null) {
                break;
            }
            document.getElementById('output').removeChild(blah);
        }
    }

    addConsoleLine(msg, type) {
        let output = document.getElementById('output');
        let newLine = document.createElement('div');
        newLine.classList.add(type);
        newLine.innerText = msg;
        output.appendChild(newLine);
    }

    handleLog(msg) {
        this.addConsoleLine(msg, 'log');
    }

    handleError(msg) {
        this.addConsoleLine(msg, 'error');
    }
}

const con = new Console();
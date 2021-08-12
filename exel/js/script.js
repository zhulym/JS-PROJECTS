const table = document.querySelector('.table');
const char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

document.addEventListener("DOMContentLoaded", createTable(30, 10));

const cells = document.querySelectorAll('.table__col');
const innerCells = document.querySelectorAll('.cell__value');
document.addEventListener('keydown', changeCellOnEnter);

table.addEventListener('click', selectCell);
table.addEventListener('dblclick', editCell);
innerCells.forEach(cell => cell.addEventListener('blur', markEditedCell));


function createTable(rowNum, colNum) {
    for (let i = 0; i < rowNum + 1; i++) {
        const row = document.createElement('tr');
        row.classList.add('table__row');
        row.setAttribute('id', `row_${i + 1}`);
        table.append(row);

        for (let j = 0; j < colNum + 1; j++) {
            const col = document.createElement('td');
            col.classList.add('table__col');
            col.setAttribute('class', 'table__col');

            if (i === 0 && j === 0 || i !== 0) {
                col.innerHTML = `<input id="${i}-${j}" type="text" class="cell__value" readonly value="" size="10" />`;
            } else {
                col.classList.add('table__col_head');
                col.innerHTML = char[j - 1];
            }

            if (i !== 0 && j === 0) {
                col.classList.add('table__col_head');
                col.innerHTML = i;
            }
            row.append(col);
        }
    }
}

function selectCell(e) {
    if (e.target.parentNode.parentNode.id === 'row_1') {
        return;
    }
    cells.forEach(cell => cell.classList.remove('table__selected'));

    if (e.target.parentNode.classList.contains('table__col') && !e.target.classList.contains('table__col_head')) {
        e.target.parentNode.classList.add('table__selected');
    }
}

function editCell(e) {
    const currentCell = document.getElementById(`${e.target.id}`);
    const fieldLength = currentCell.value.length;
    const startSizeValue = 13;

    cells.forEach(cell => cell.classList.remove('cell__selected'));
    e.target.classList.add('cell__selected');
    e.target.removeAttribute('readonly');

    if (fieldLength > startSizeValue) {
        const flag = Math.round(fieldLength / startSizeValue);
        currentCell.setAttribute('size', `${startSizeValue * flag}`);
    }
}

function markEditedCell(e) {
    const currentCell = document.getElementById(`${e.target.id}`);
    const fieldLength = currentCell.value.length;
    if (fieldLength === 0) {
        currentCell.setAttribute('size', '10');
    }

    if (this.parentNode.parentNode.id === 'row_1' || this.value === '') {
        return;
    }

    const getValue = localStorage.getItem(this.id);
    if (this.value !== getValue) {
        localStorage.setItem(this.id, this.value);
        this.classList.add("cell__marked");
        this.parentNode.classList.add("cell__marked_full");
    }

    setTimeout(() => {
        this.classList.remove('cell__marked');
        this.parentNode.classList.remove("cell__marked_full");
    }, 10000);

    this.classList.remove("cell__selected");
    this.setAttribute('readonly', '');
}

function changeCellOnEnter(event) {
    if (event.code === 'Enter') {
        const currentId = event.target.id;
        const nextCell = document.getElementById(`${++currentId[0]}${currentId.substr(1)}`);

        cells.forEach(cell => cell.classList.remove('table__selected'));
        nextCell.parentNode.classList.add('table__selected');
        event.target.blur();
    }
}


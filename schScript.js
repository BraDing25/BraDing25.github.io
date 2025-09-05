window.onload = function run() {
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    let class1 = {"name": "Intro to C", "code": "COP3203", "section": "0001", "days": "MWF", "time": "10:00-10:50"};
    let class2 = {"name": "Calculus 2", "code": "MAC2312", "section": "0021", "days": "MTWR", "time": "11:30-12:20"};
    let class3 = {"name": "Calculus 2", "code": "MAC2312", "section": "0015", "days": "MTWR", "time": "12:00-12:50"};
    let class4 = {"name": "Physics 1", "code": "PHY2048", "section": "0001", "days": "TR", "time": "13:00-14:20"};
    let class5 = {"name": "Physics 1", "code": "PHY2048", "section": "0007", "days": "MWF", "time": "09:30-10:50"};
    let class6 = {"name": "Physics Lab", "code": "PHY2048L", "section": "0008", "days": "M", "time": "17:30-19:20"};
    let class7 = {"name": "English", "code": "ENC1102", "section": "0002", "days": "MWF", "time": "08:30-09:20"};
    let class8 = {"name": "Geography", "code": "GLY1030", "section": "0001", "days": "TR", "time": "09:30-10:20"};
    let class9 = {"name": "US History", "code": "AMH2020", "section": "0W60", "days": "TBA", "time": "TBA"};
    let class10 = {"name": "Philosophy", "code": "PHI2010", "section": "0V60", "days": "TBA", "time": "TBA"};

    items = [class1, class2, class3, class4, class5, class6, class7, class8, class9, class10];



    const clist = document.getElementById('classlist');

    let classRow;
    let classCount = 0; // count only in-person courses

    for (let i = 0; i < items.length; i++) {
        if (isNumber(items[i].section)) {
            if (classCount % 3 === 0) {
                classRow = document.createElement('div');
                classRow.classList.add('row');
                clist.appendChild(classRow);
            }

            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            const inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.id = `check${i}`;
            inputElement.classList.add('check')
            inputElement.checked = true;
            const labelElement = document.createElement('label');
            labelElement.htmlFor = `check${i}`;
            labelElement.textContent = `${items[i].code} - ${items[i].name} (${items[i].days} ${items[i].time}) Sec: ${items[i].section}`;
            itemElement.appendChild(inputElement);
            itemElement.appendChild(labelElement);
            classRow.appendChild(itemElement);

            classCount++; // increment only for in-person courses
        }
    }



    const wlist = document.getElementById('weblist');

    let webRow;
    let webCount = 0; // count only online courses

    for (let i = 0; i < items.length; i++) {
        if (items[i].section.toString().includes('W') || items[i].section.toString().includes('V')) {
            if (webCount % 3 === 0) {
                webRow = document.createElement('div');
                webRow.classList.add('row');
                webList = document.createElement('ul');
                webRow.appendChild(webList);
                wlist.appendChild(webRow);
            }

            const itemElement = document.createElement('li');
            itemElement.textContent = `${items[i].code} - ${items[i].name} Sec: ${items[i].section}`;
            webList.appendChild(itemElement);

            webCount++; // increment only for online courses
        }
    }

    timeTable(); // Initial call to populate the timetable on load
}

function timeTable() {
    // Rebuild fresh table every time
    buildTable();

    let boxes = document.querySelectorAll('.check:checked');

    boxes.forEach(box => {
        let index = parseInt(box.id.replace('check', ''));
        let item = items[index];
        let code = item.code;
        let section = item.section;
        let dayArray = item.days.split('');  // e.g. "MWF"
        let timeArray = item.time.split('-'); // e.g. "10:00-11:15"
        let startTime = timeArray[0];
        let endTime = timeArray[1];

        // Parse times
        function toDate(timeStr) {
            let [h, m] = timeStr.split(':').map(Number);
            return new Date(1970, 0, 1, h, m);
        }
        let start = toDate(startTime);
        let end = toDate(endTime);
        let diff = (end - start) / (1000 * 60 * 10);

        dayArray.forEach(day => {
            let hh = String(start.getHours()).padStart(2, "0");
            let mm = String(start.getMinutes()).padStart(2, "0");
            let startId = `${day}-${hh}:${mm}`;

            let startCell = document.getElementById(startId);
            if (startCell) {
                startCell.rowSpan = diff;
                startCell.style.backgroundColor = "rgba(88, 191, 20, 0.6)";
                startCell.style.border = "2px solid #333";
                startCell.style.verticalAlign = "middle";
                startCell.innerHTML = `<b>${code}</b><br>Sec: ${section}`;

                // Remove covered cells
                let minutes = start.getHours() * 60 + start.getMinutes();
                for (let k = 1; k < diff; k++) {
                    let total = minutes + k * 10;
                    let hh2 = String(Math.floor(total / 60)).padStart(2, "0");
                    let mm2 = String(total % 60).padStart(2, "0");
                    let cellId = `${day}-${hh2}:${mm2}`;
                    let cell = document.getElementById(cellId);
                    if (cell) cell.remove();
                }
            }
        });
    });
}

window.addEventListener('change', timeTable);


function info() {
    window.alert("Select the classes you want to include in your schedule by checking the boxes next to them. The timetable will update automatically based on your selections.");
}
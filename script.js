let database = [];

function showSection(id) {
    ['reserve', 'equipment', 'tracking'].forEach(sec => {
        document.getElementById(sec).style.display = (sec === id) ? 'block' : 'none';
    });
}

function processRequest(type) {
    const org = (type === 'Facility') ? document.getElementById('resOrg').value : document.getElementById('eqOrg').value;
    const item = (type === 'Facility') ? document.getElementById('resItem').value : document.getElementById('eqItem').value;
    const date = (type === 'Facility') ? document.getElementById('resDate').value : document.getElementById('eqDate').value;

    if (!org || !date) return alert("Please fill in all details!");

    // Requirement: Schedule Conflict Checker
    const hasConflict = database.some(entry => entry.item === item && entry.date === date);

    if (hasConflict) {
        alert("⚠️ CONFLICT: This slot is already reserved. Please choose another time.");
    } else {
        database.push({ org, type, item, date, status: 'Approved' });
        updateTable();
        alert("✅ Request Successfully Recorded!");
        clearInputs();
    }
}

function updateTable() {
    const tbody = document.getElementById('statusTable');
    tbody.innerHTML = database.map(entry => `
        <tr>
            <td>${entry.org}</td>
            <td>${entry.type}</td>
            <td>${entry.item}</td>
            <td>${entry.date.replace('T', ' ')}</td>
            <td><span class="status-badge">${entry.status}</span></td>
        </tr>
    `).join('');
}

function clearInputs() {
    document.querySelectorAll('input').forEach(i => i.value = '');
}
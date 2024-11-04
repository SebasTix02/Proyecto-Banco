// Función para abrir el modal
function openModal() {
    document.getElementById("amortizationModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("amortizationModal").style.display = "none";
}

// Función para generar la tabla de amortización
function generateAmortizationTable() {
    let amount = parseFloat(document.getElementById('amount').value);
    const years = parseInt(document.getElementById('years').value);
    const rate = parseFloat(document.getElementById('creditType').value);
    const system = document.getElementById('system').value;

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    const months = years * 12;
    const monthlyRate = rate / 12;
    let amortizationTable = [];

    if (system === "frances") {
        const annuity = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        for (let i = 0; i < months; i++) {
            let interest = amount * monthlyRate;
            let principal = annuity - interest;
            amount -= principal;
            amortizationTable.push({ month: i + 1, payment: annuity, principal, interest, balance: amount });
        }
    } else if (system === "aleman") {
        const principalPayment = amount / months;
        for (let i = 0; i < months; i++) {
            let interest = amount * monthlyRate;
            let payment = principalPayment + interest;
            amount -= principalPayment;
            amortizationTable.push({ month: i + 1, payment, principal: principalPayment, interest, balance: amount });
        }
    }

    displayTable(amortizationTable, system);
    openModal();  // Abre el modal después de generar la tabla
}

// Función para mostrar la tabla en el modal
function displayTable(amortizationTable, system) {
    const tableType = system === "frances" ? "Tabla de Amortización Francés" : "Tabla de Amortización Alemán";
    let tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = `
    <h3>${tableType}</h3>
        <table>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Pago</th>
                    <th>Capital</th>
                    <th>Interés</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
                ${amortizationTable.map(row => `
                    <tr>
                        <td>${row.month}</td>
                        <td>${row.payment.toFixed(2)}</td>
                        <td>${row.principal.toFixed(2)}</td>
                        <td>${row.interest.toFixed(2)}</td>
                        <td>${row.balance.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Función para descargar la tabla como PDF
function downloadPDF() {
    const element = document.getElementById('tableContainer');
    const opt = {
        margin: 1,
        filename: 'tabla_amortizacion.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
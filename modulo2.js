// Función para calcular el interés simple
function calculateSimpleInterest() {
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const years = parseInt(document.getElementById('investmentYears').value);
    const rate = parseFloat(document.getElementById('interestRate').value) / 100; // Convertir a decimal
    
    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
      alert("Por favor ingrese valores válidos.");
      return;
    }
  
    // Fórmula del interés simple
    const interest = amount * rate * years;
    const totalAmount = amount + interest;
  
    // Mostrar el resultado
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `
    <div style="background-color: #f1f1f1; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);">
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Resultado de la Inversión</h2>
        <div style="margin-bottom: 10px;">
            <strong style="color: #555;">Monto Inicial:</strong> 
            <span style="font-size: 18px; color: #28a745;">$${amount.toFixed(2)}</span>
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #555;">Interés Ganado:</strong> 
            <span style="font-size: 18px; color: #28a745;">$${interest.toFixed(2)}</span>
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #555;">Total Final:</strong> 
            <span style="font-size: 18px; color: #28a745; font-weight: bold;">$${totalAmount.toFixed(2)}</span>
        </div>
    </div>
  `;
  
  }
  
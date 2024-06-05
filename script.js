document.getElementById('trackingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let trackingNumber = document.getElementById('trackingNumber').value;
    
    fetch('/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trackingNumber: trackingNumber })
    })
    .then(response => response.json())
    .then(data => {
      let resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';
  
      if(data.shipments && data.shipments.length > 0) {
        let shipment = data.shipments[0];
        resultDiv.innerHTML = `
          <h2>Tracking Information</h2>
          <p><strong>Tracking Number:</strong> ${shipment.id}</p>
          <p><strong>Status:</strong> ${shipment.status.status}</p>
          <p><strong>Estimated Delivery:</strong> ${shipment.estimatedTimeOfDelivery}</p>
        `;
      } else {
        resultDiv.innerHTML = '<p>No shipment information found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching tracking information:', error);
    });
  });
  
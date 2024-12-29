    let form = document.getElementById('paymentForm');
    let alertBox = document.getElementById('alertBox');
    let successBox = document.getElementById('successBox');
    // تخزين البيانات في localStorage
    let paymentData = {
      cardholderName,
      cardNumber,
      expiryDate,
      cvv,
      phoneNumber
    };
    localStorage.setItem('PaymentMethod', JSON.stringify(paymentData));
    
    let errors = [];  // نجمع فيها الاخطاء
    // Preventdeafult علشان اريح دماغي 
    form.onsubmit = function (event) {
      event.preventDefault();


      // هخفي الزراير بتاعة الAlert
      alertBox.classList.add('d-none');
      successBox.classList.add('d-none');

      // هقرا القيم وا شيل المسافات اللي بينهم و التابات علشان الناس اللي بتعك
      let cardholderName = document.getElementById('cardholderName').value.trim();
      let cardNumber = document.getElementById('cardNumber').value.trim();
      let expiryDate = document.getElementById('expiryDate').value.trim();
      let cvv = document.getElementById('cvv').value.trim();
      let phoneNumber = document.getElementById('phoneNumber').value.trim();



      // Validation
      if (cardholderName == '') errors.push('Cardholder name is required.');
      if (!/^\d{16}$/.test(cardNumber)) errors.push('Card number must be 16 digits.');
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) errors.push('Expiry date must be in MM/YY format.');
      if (!/^\d{3}$/.test(cvv)) errors.push('CVV must be 3 digits.');
      if (phoneNumber == '') errors.push('Phone number is required.');
      if (errors.length > 0) {
        alertBox.innerHTML = errors.join('<br>'); // علشان ما يطلعوش سايحين علي بعض 
        alertBox.classList.remove('d-none'); 
        return; // علشان اوقفها     // علشان لو فيه errors ما يطلعهاش 
      }

      // إذا كانت القيم صحيحة
      alertBox.classList.add('d-none'); 


      // عرض رسالة النجاح
      successBox.textContent = 'Your Order Successfully Have Been Sent';
      successBox.classList.remove('d-none'); 
      form.reset(); //  الدنيا تمام رجعلي الدنيا فاضية تاني 
    };


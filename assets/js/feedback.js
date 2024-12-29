let feedbackMessages = JSON.parse(localStorage.getItem('feedbackMessages')) || [];

// مرجع للنموذج
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');

feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();   

    // التحقق من صحة الحقل
    if (!feedbackMessage.value.trim()) {
        feedbackMessage.classList.add('is-invalid');
        return;
    } else {
        feedbackMessage.classList.remove('is-invalid');
    }

    // إضافة الرسالة إلى المصفوفة
    feedbackMessages.push(feedbackMessage.value.trim());

    // تخزين الرسائل في localStorage
    localStorage.setItem('feedbackMessages', JSON.stringify(feedbackMessages));

    // تفريغ النص وإظهار رسالة نجاح
    feedbackMessage.value = '';
    showAlert("Feedback saved successfully!","primary");
});


// =============== ALERT ====================

function showAlert(message, type = "success", timeout = 3000) {

    const alertBox = document.querySelector("#alert-box");
    const alertElement = document.createElement("div");
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.setAttribute("role", "alert");
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="X"></button>
    `;
    alertBox.appendChild(alertElement);
  
    if (timeout > 0) {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }, timeout);
    }
  }
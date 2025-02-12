document.addEventListener('DOMContentLoaded', function () {
    // Dropdown Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-listss');
    const changePasswordOption = document.getElementById('change-password-option');
    const changePasswordModal = document.getElementById('change-password');
    const closePasswordIcon = document.getElementById('close-password-icon');

    // Toggle dropdown menu visibility
    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click from bubbling up to the window
        menuList.classList.toggle('hidden');
    });

    // Close dropdown menu when clicking outside of it
    window.addEventListener('click', function () {
        if (!menuList.classList.contains('hidden')) {
            menuList.classList.add('hidden');
        }
    });

    // Prevent the dropdown menu from closing when clicking inside it
    menuList.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Open the Change Password modal when the option is clicked
    changePasswordOption.addEventListener('click', function () {
        changePasswordModal.classList.remove('hidden');
        menuList.classList.add('hidden'); // Close the dropdown menu
    });

    // Close the Change Password modal
    closePasswordIcon.addEventListener('click', function () {
        changePasswordModal.classList.add('hidden');
    });

    // Optional: Close the Change Password modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === changePasswordModal) {
            changePasswordModal.classList.add('hidden');
        }
    });

    // Toggle password visibility for Old Password
    const toggleOldPassword = document.getElementById('toggle-old-password');
    const oldPasswordInput = document.getElementById('old-password');
    const oldEyeIcon = document.getElementById('old-eye-icon');

    toggleOldPassword.addEventListener('click', function () {
        const type = oldPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        oldPasswordInput.setAttribute('type', type);
        oldEyeIcon.classList.toggle('ri-eye-line');
        oldEyeIcon.classList.toggle('ri-eye-off-line');
    });

    // Toggle password visibility for New Password
    const toggleNewPassword = document.getElementById('toggle-new-password');
    const newPasswordInput = document.getElementById('new-password');
    const newEyeIcon = document.getElementById('new-eye-icon');

    toggleNewPassword.addEventListener('click', function () {
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);
        newEyeIcon.classList.toggle('ri-eye-line');
        newEyeIcon.classList.toggle('ri-eye-off-line');
    });

    // Toggle password visibility for Confirm Password
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmEyeIcon = document.getElementById('confirm-eye-icon');

    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        confirmEyeIcon.classList.toggle('ri-eye-line');
        confirmEyeIcon.classList.toggle('ri-eye-off-line');
    });
});


const name = "John Doe";  // Example name
const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
document.getElementById('user-initials').textContent = initials;



document.addEventListener('DOMContentLoaded', function () {
    // ... (existing code)

    // Logout functionality
    const logoutOption = document.getElementById('logout-option');

    logoutOption.addEventListener('click', function () {
        // Redirect to the landing page
        window.location.href = './index.html'; // Replace with your landing page URL
    });

    
});










async function fetchDashboardData() {
    try {
        const response = await fetch('https://api.example.com/dashboard'); // Replace with real API
        const data = await response.json();
        document.getElementById('totalBalance').textContent = `$${data.totalBalance.toFixed(2)}`;
        document.getElementById('income').textContent = `$${data.income.toFixed(2)}`;
        document.getElementById('outcome').textContent = `$${data.outcome.toFixed(2)}`;
        document.getElementById('totalDeposits').textContent = `$${data.totalDeposits}`;
        document.getElementById('totalProfits').textContent = `$${data.totalProfits}`;
        document.getElementById('referrals').textContent = data.referrals;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}

fetchDashboardData();
setInterval(fetchDashboardData, 30000); // Refresh data every 30 seconds
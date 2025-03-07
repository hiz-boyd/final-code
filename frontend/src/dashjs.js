// document.addEventListener('DOMContentLoaded', function () {

//     const menuToggle = document.getElementById('menu-toggle');
//     const menuList = document.getElementById('menu-listss');
//     const changePasswordOption = document.getElementById('change-password-option');
//     const changePasswordModal = document.getElementById('change-password');
//     const closePasswordIcon = document.getElementById('close-password-icon');


//     menuToggle.addEventListener('click', function (event) {
//         event.stopPropagation(); 
//         menuList.classList.toggle('hidden');
//     });


//     window.addEventListener('click', function () {
//         if (!menuList.classList.contains('hidden')) {
//             menuList.classList.add('hidden');
//         }
//     });


//     menuList.addEventListener('click', function (event) {
//         event.stopPropagation();
//     });


//     changePasswordOption.addEventListener('click', function () {
//         changePasswordModal.classList.remove('hidden');
//         menuList.classList.add('hidden'); 
//     });

//     closePasswordIcon.addEventListener('click', function () {
//         changePasswordModal.classList.add('hidden');
//     });


//     window.addEventListener('click', function (event) {
//         if (event.target === changePasswordModal) {
//             changePasswordModal.classList.add('hidden');
//         }
//     });


//     const toggleOldPassword = document.getElementById('toggle-old-password');
//     const oldPasswordInput = document.getElementById('old-password');
//     const oldEyeIcon = document.getElementById('old-eye-icon');

//     toggleOldPassword.addEventListener('click', function () {
//         const type = oldPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//         oldPasswordInput.setAttribute('type', type);
//         oldEyeIcon.classList.toggle('ri-eye-line');
//         oldEyeIcon.classList.toggle('ri-eye-off-line');
//     });


//     const toggleNewPassword = document.getElementById('toggle-new-password');
//     const newPasswordInput = document.getElementById('new-password');
//     const newEyeIcon = document.getElementById('new-eye-icon');

//     toggleNewPassword.addEventListener('click', function () {
//         const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//         newPasswordInput.setAttribute('type', type);
//         newEyeIcon.classList.toggle('ri-eye-line');
//         newEyeIcon.classList.toggle('ri-eye-off-line');
//     });


//     const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
//     const confirmPasswordInput = document.getElementById('confirm-password');
//     const confirmEyeIcon = document.getElementById('confirm-eye-icon');

//     toggleConfirmPassword.addEventListener('click', function () {
//         const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//         confirmPasswordInput.setAttribute('type', type);
//         confirmEyeIcon.classList.toggle('ri-eye-line');
//         confirmEyeIcon.classList.toggle('ri-eye-off-line');
//     });
// });


// const name = "John Doe"; 
// const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
// document.getElementById('user-initials').textContent = initials;



// document.addEventListener('DOMContentLoaded', function () {

//     const logoutOption = document.getElementById('logout-option');

//     logoutOption.addEventListener('click', function () {

//         window.location.href = './index.html'; 

    
// });


// async function fetchDashboardData() {
//     try {
//         const response = await fetch('https://api.example.com/dashboard'); 
//         const data = await response.json();
//         document.getElementById('totalBalance').textContent = `$${data.totalBalance.toFixed(2)}`;
//         document.getElementById('income').textContent = `$${data.income.toFixed(2)}`;
//         document.getElementById('outcome').textContent = `$${data.outcome.toFixed(2)}`;
//         document.getElementById('totalDeposits').textContent = `$${data.totalDeposits}`;
//         document.getElementById('totalProfits').textContent = `$${data.totalProfits}`;
//         document.getElementById('referrals').textContent = data.referrals;
//     } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//     }
// }

// fetchDashboardData();
//     setInterval(fetchDashboardData, 30000);
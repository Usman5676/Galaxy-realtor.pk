// Conversion factors (relative to square feet)
        const conversionFactors = {
            sqft: 1,
            sqm: 0.092903,
            sqyd: 0.111111,
            marla: 0.00367309,
            kanal: 0.000183655,
            acre: 0.0000229568,
            hectare: 0.0000092903
        };
        
        // Initialize the converter
        document.addEventListener('DOMContentLoaded', function() {
            const convertBtn = document.getElementById('convertBtn');
            const convertText = document.getElementById('convertText');
            const convertSpinner = document.getElementById('convertSpinner');
            const inputValue = document.getElementById('inputValue');
            const inputUnit = document.getElementById('inputUnit');
            const outputUnit = document.getElementById('outputUnit');
            const resultElements = {
                sqft: document.getElementById('sqftResult'),
                sqm: document.getElementById('sqmResult'),
                sqyd: document.getElementById('sqydResult'),
                marla: document.getElementById('marlaResult'),
                kanal: document.getElementById('kanalResult'),
                acre: document.getElementById('acreResult'),
                hectare: document.getElementById('hectareResult')
            };
            
            // Notification system
            function showNotification(message, type = 'success') {
                const notificationContainer = document.getElementById('notificationContainer');
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.textContent = message;
                
                notificationContainer.appendChild(notification);
                
                // Trigger animation
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 5000);
            }
            
            // Handle conversion
            convertBtn.addEventListener('click', function() {
                const value = parseFloat(inputValue.value);
                
                if (isNaN(value) || value <= 0) {
                    showNotification('Please enter a valid positive number', 'error');
                    return;
                }
                
                // Show loading state
                convertBtn.classList.add('btn-loading');
                convertText.textContent = 'Converting...';
                convertSpinner.style.display = 'block';
                
                // Simulate processing time
                setTimeout(() => {
                    // Convert to square feet first
                    const sqftValue = value / conversionFactors[inputUnit.value];
                    
                    // Convert to all units
                    for (const unit in conversionFactors) {
                        const convertedValue = sqftValue * conversionFactors[unit];
                        resultElements[unit].textContent = convertedValue.toFixed(4);
                    }
                    
                    // Show success notification
                    showNotification('Conversion completed successfully!', 'success');
                    
                    // Save to history if user is logged in
                    if (isUserLoggedIn()) {
                        saveToHistory(value, inputUnit.value, sqftValue);
                        loadHistory();
                        showNotification('Conversion saved to your history', 'success');
                    }
                    
                    // Reset loading state
                    convertBtn.classList.remove('btn-loading');
                    convertText.textContent = 'Convert';
                    convertSpinner.style.display = 'none';
                }, 1500); // 1.5 second delay to simulate processing
            });
            
            // Show login modal from converter
            document.getElementById('showLoginFromConverter').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('loginModal').style.display = 'flex';
            });
            
            // Modal close functionality
            const closeButtons = [
                document.getElementById('closeLoginModal'),
                document.getElementById('closeSignupModal'),
                document.getElementById('closeVerificationModal'),
                document.getElementById('closeResendVerificationModal')
            ];
            
            closeButtons.forEach(button => {
                if (button) {
                    button.addEventListener('click', function() {
                        this.closest('.modal').style.display = 'none';
                    });
                }
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            });
            
            // Check if user is logged in and update UI accordingly
            function checkAuthStatus() {
                const isLoggedIn = isUserLoggedIn(); // This function should be defined in auth.js
                
                if (isLoggedIn) {
                    document.getElementById('historySection').style.display = 'block';
                    document.getElementById('loginPrompt').style.display = 'none';
                    loadHistory();
                } else {
                    document.getElementById('historySection').style.display = 'none';
                    document.getElementById('loginPrompt').style.display = 'block';
                }
            }
            
            // Save conversion to history (localStorage for demo, would use Firebase in production)
            function saveToHistory(value, fromUnit, sqftValue) {
                const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
                
                history.unshift({
                    value: value,
                    fromUnit: fromUnit,
                    sqftValue: sqftValue,
                    timestamp: new Date().toISOString()
                });
                
                // Keep only last 10 conversions
                if (history.length > 10) {
                    history.pop();
                }
                
                localStorage.setItem('conversionHistory', JSON.stringify(history));
            }
            
            // Load conversion history
            function loadHistory() {
                const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
                const historyList = document.getElementById('historyList');
                
                historyList.innerHTML = '';
                
                if (history.length === 0) {
                    historyList.innerHTML = '<p class="text-gray-500 text-center py-4">No conversion history yet</p>';
                    return;
                }
                
                history.forEach(item => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    
                    const date = new Date(item.timestamp);
                    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    
                    historyItem.innerHTML = `
                        <div class="history-value">${item.value} ${item.fromUnit} = ${(item.sqftValue).toFixed(2)} sq ft</div>
                        <div class="history-date">${formattedDate}</div>
                    `;
                    
                    historyList.appendChild(historyItem);
                });
            }
            
            // Check auth status on page load
            checkAuthStatus();
            
            // For demo purposes, simulate auth check
            function isUserLoggedIn() {
                // This would normally check Firebase auth state
                // For demo, we'll check localStorage
                return localStorage.getItem('userLoggedIn') === 'true';
            }
            
            // Simulate login/logout for demo
            document.getElementById('loginBtn')?.addEventListener('click', function() {
                // In a real app, this would open the login modal
                // For demo, we'll just set the logged in state
                localStorage.setItem('userLoggedIn', 'true');
                checkAuthStatus();
                showNotification('Successfully logged in!', 'success');
                document.getElementById('loginModal').style.display = 'none';
            });
            
            document.getElementById('logoutBtn')?.addEventListener('click', function() {
                localStorage.setItem('userLoggedIn', 'false');
                checkAuthStatus();
                showNotification('Successfully logged out!', 'success');
            });
        });
// Array of CSV file URLs
const csvUrls = ['https://docs.google.com/spreadsheets/d/1NvPenZaXWmo7dfEBa69Sp3eMQy2R0d719XBBfObXdrU/export?format=csv','https://docs.google.com/spreadsheets/d/1TNKLA20WcmQ7mqa-98sftjS3ug1Tp83umW_Eoc428i4/export?format=csv'];

// Usage
const scanBtn = document.getElementById('scan_btn');
const ulContainer = document.getElementById('email_list');
const maliciousContainer = document.querySelector('.malicious_container');
const maliciousList = document.getElementById('malicious_found');
const maliciousCounter = document.getElementById('malicious_counter');
const alertContainer = document.querySelector('.alert');

scanBtn.addEventListener('click', async () => {
    console.log('Scan button clicked.');
    try {
        const csvContent = await readCSVFromUrls(csvUrls);
        const commonEmails = findCommonItems(uniqueEmails, csvContent);
        const commonUrls = findCommonItems(uniqueUrls, csvContent);
        const commonItems = [...commonEmails, ...commonUrls];

        if (uniqueEmails.size === 0 && uniqueUrls.size === 0) {
            showAlert('No items parsed. Please parse before scanning.');
            return;
        }

        displayCommonItems(commonItems);
    } catch (error) {
        console.error('Error reading CSV files:', error);
    }
});

// Function to read CSV content from multiple URLs
async function readCSVFromUrls(urls) {
    try {
        const csvContent = [];
        for (const url of urls) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch CSV file: ${url}`);
            }
            const csvData = await response.text();
            const csvArray = csvData.split(/\r?\n/).map(row => row.replace(/['"\r]/g, '').trim()).filter(row => row);
            csvContent.push(...csvArray);
        }
        return csvContent;
    } catch (error) {
        console.error('Error reading CSV files:', error);
        return null;
    }
}

// Function to find common items between an array and CSV content
function findCommonItems(array, csvContent) {
    return array ? Array.from(array).filter(item => csvContent.includes(item)) : [];
}

// Function to display common items and update counter
function displayCommonItems(commonItems) {
    maliciousList.innerHTML = ''; // Clear previous items

    if (commonItems.length === 0) {
        updateMaliciousCounter(0); // Update counter if no common items found
        maliciousContainer.style.display = 'block'; // Display malicious container
        return;
    }

    commonItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        maliciousList.appendChild(li);
    });

    updateMaliciousCounter(commonItems.length);
    maliciousContainer.style.display = 'block'; // Display malicious container
}

// Function to update malicious counter
function updateMaliciousCounter(count) {
    maliciousCounter.textContent = count === 0 ? '0 phishes detected' : `${count} ${count === 1 ? 'phish' : 'phishes'} detected`;
}

// Function to show an alert message
function showAlert(message) {
    alertContainer.textContent = message;
}

scanBtn.addEventListener('click', async () => {
    try {
        const loadingDialog = document.getElementById('loadingDialog');
        loadingDialog.style.display = 'flex'; // Show the loading dialog

        const csvContent = await readCSVFromUrls(csvUrls);

        const commonEmails = findCommonItems(uniqueEmails, csvContent);
        const commonUrls = findCommonItems(uniqueUrls, csvContent);
        const commonItems = [...commonEmails, ...commonUrls];

        if (uniqueEmails.size === 0 && uniqueUrls.size === 0) {
            showAlert('No items parsed. Please parse before scanning.');
            loadingDialog.style.display = 'none'; // Hide the loading dialog
            return;
        }

        displayCommonItems(commonItems);
        loadingDialog.style.display = 'none'; // Hide the loading dialog
    } catch (error) {
        console.error('Error reading CSV files:', error);
        loadingDialog.style.display = 'none'; // Hide the loading dialog
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const downloadTxtBtn = document.getElementById('download_txt_btn');
    const emailScrapeBtn = document.getElementById('emailscrape_btn');
    const urlScrapeBtn = document.getElementById('urlscrape_btn');

    // Hide the download button initially
    downloadTxtBtn.style.display = 'none';

    emailScrapeBtn.addEventListener('click', () => {
        // Show the download button when Parse Emails button is clicked
        downloadTxtBtn.style.display = 'inline-block';
    });

    urlScrapeBtn.addEventListener('click', () => {
        // Show the download button when Parse URLs button is clicked
        downloadTxtBtn.style.display = 'inline-block';
    });

    downloadTxtBtn.addEventListener('click', () => {
        const emailList = document.getElementById('email_list');
        const urlsList = document.getElementById('urls_list');

        let contentToDownload = '';

        // Check which list is visible and get its content
        if (emailList.style.display !== 'none') {
            // Get content of email list
            contentToDownload = getEmailListContent(emailList);
        } else if (urlsList.style.display !== 'none') {
            // Get content of URLs list
            contentToDownload = getUrlsListContent(urlsList);
        }

        // Generate timestamp
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getDate()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}`;

        // Trigger download with timestamp in the title
        downloadTxtFile(contentToDownload, timestamp);
    });

    function getEmailListContent(emailList) {
        return Array.from(emailList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    }

    function getUrlsListContent(urlsList) {
        return Array.from(urlsList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    }

    function downloadTxtFile(content, timestamp) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `download_${timestamp}.txt`; // Include timestamp in the title
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

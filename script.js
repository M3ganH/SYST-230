document.addEventListener("DOMContentLoaded", function() {
    const emailScrapeBtn = document.getElementById('emailscrape_btn');
    const urlScrapeBtn = document.getElementById('urlscrape_btn');
    const emailList = document.getElementById('email_list');
    const urlsList = document.getElementById('urls_list');
    const emailCounter = document.getElementById('email_counter');
    const urlCounter = document.getElementById('url_counter');
    const currentText = document.getElementById('currentText'); // Added this line

    let emailsScraped = false;
    let urlsScraped = false;

    // Initialize the currentText span with "Found 0 Emails"
    currentText.textContent = "Found 0 Emails";

    emailScrapeBtn.addEventListener('click', () => {
        // Show email list and hide URL list
        emailList.style.display = 'block';
        urlsList.style.display = 'none';

        // Show email counter and hide URL counter
        emailCounter.style.display = 'inline-block';
        urlCounter.style.display = 'none';

        // Update scraped status
        emailsScraped = true;
        urlsScraped = false;

        // Update scraped text
        updateScrapedText();
    });

    urlScrapeBtn.addEventListener('click', () => {
        // Show URL list and hide email list
        emailList.style.display = 'none';
        urlsList.style.display = 'block';

        // Show URL counter and hide email counter
        emailCounter.style.display = 'none';
        urlCounter.style.display = 'inline-block';

        // Update scraped status
        emailsScraped = false;
        urlsScraped = true;

        // Update scraped text
        updateScrapedText();
    });

    // Function to update scraped text based on counters
    function updateScrapedText() {
        if (emailsScraped) {
            emailCounter.textContent = getEmailsCountText(emailCounter.textContent);
        }
        if (urlsScraped) {
            urlCounter.textContent = getUrlsCountText(urlCounter.textContent);
        }
    }

    // Function to format emails count text
    function getEmailsCountText(currentText) {
        const count = emailList.querySelectorAll('li').length;
        return count === 1 ? `${count} email found` : `${count} emails found`;
    }

    // Function to format URLs count text
    function getUrlsCountText(currentText) {
        const count = urlsList.querySelectorAll('li').length;
        return count === 1 ? `${count} URL found` : `${count} URLs found`;
    }
});

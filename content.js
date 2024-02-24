console.log("><(((*> Welcome to Phish Hook! <*)))><");

let scrapeEmails = document.getElementById('emailscrape_btn');
let scrapeUrls = document.getElementById('urlscrape_btn');
let emailList = document.getElementById("email_list");
let urlsList = document.getElementById("urls_list");
let uniqueEmails = new Set(); // Set to store unique emails
let uniqueUrls = new Set(); // Set to store unique URLs

// Handler to receive emails or URLs from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.emails) {
        // Get emails
        let emails = request.emails;
        
        // Clear previous emails
        emailList.innerHTML = "";
        uniqueEmails.clear();

        // Display unique emails on popup
        if(emails == null || emails.length == 0) {
            // No emails
            let li = document.createElement('li');
            li.innerText = "No emails found";
            emailList.appendChild(li);
        } else {
            emails.forEach((email) => {
                if (!uniqueEmails.has(email)) {
                    uniqueEmails.add(email);
                    let li = document.createElement('li');
                    li.innerText = email;
                    emailList.appendChild(li);
                }
            });
        }
    }

    if (request.urls) {
        // Get URLs
        let urls = request.urls;
        
        // Clear previous URLs
        urlsList.innerHTML = "";
        uniqueUrls.clear();

        // Display unique URLs on popup
        if(urls == null || urls.length == 0) {
            // No URLs
            let li = document.createElement('li');
            li.innerText = "No URLs found";
            urlsList.appendChild(li);
        } else {
            urls.forEach((url) => {
                if (!uniqueUrls.has(url)) {
                    uniqueUrls.add(url);
                    let li = document.createElement('li');
                    li.innerText = url;
                    urlsList.appendChild(li);
                }
            });
        }
    }
});

// Button's click event listener for scraping emails
scrapeEmails.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,
    });
});

// Button's click event listener for scraping URLs
scrapeUrls.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeUrlsFromPage,
    });
});

// function to scrape emails
function scrapeEmailsFromPage() {
    // RegEx to parse emails from HTML code
    const emailRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/g; // Added 'g' for global flag

    // Parse emails from the HTML of the page
    let emails = document.body.innerHTML.match(emailRegex);

    // Send emails to popup container
    chrome.runtime.sendMessage({emails});
}

// function to scrape URLs
function scrapeUrlsFromPage() {
    // RegEx to parse URLs from HTML code
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Match URLs starting with http:// or https://

    // Parse URLs from the HTML of the page
    let urls = document.body.innerHTML.match(urlRegex);

    // Send URLs to popup container
    chrome.runtime.sendMessage({urls});
}

document.addEventListener("DOMContentLoaded", function() {
    const emailScrapeBtn = document.getElementById('emailscrape_btn');
    const urlScrapeBtn = document.getElementById('urlscrape_btn');
    const emailList = document.getElementById('email_list');
    const urlsList = document.getElementById('urls_list');
    const emailCounter = document.getElementById('email_counter');
    const urlCounter = document.getElementById('url_counter');

    let uniqueEmails = new Set(); // Using a Set to store unique email addresses
    let uniqueUrls = new Set(); // Using a Set to store unique URLs

    emailScrapeBtn.addEventListener('click', () => {
        // Show email list and hide URL list
        emailList.style.display = 'block';
        urlsList.style.display = 'none';
        emailCounter.innerText = uniqueEmails.size === 1 ? '1 Address Found' : `${uniqueEmails.size} Addresses Found`; // Update email counter with unique email count
        urlCounter.innerText = ''; // Clear URL counter
    });

    urlScrapeBtn.addEventListener('click', () => {
        // Show URL list and hide email list
        emailList.style.display = 'none';
        urlsList.style.display = 'block';
        emailCounter.innerText = ''; // Clear email counter
        urlCounter.innerText = uniqueUrls.size === 1 ? '1 External Link Found' : `${uniqueUrls.size} External Links Found`; // Update URL counter with unique URL count
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.emails) {
            // Iterate over received emails and add them to the uniqueEmails set
            request.emails.forEach(email => {
                uniqueEmails.add(email);
            });
            emailCounter.innerText = uniqueEmails.size === 1 ? '1 Address Found' : `${uniqueEmails.size} Addresses Found`; // Update email counter with unique email count
        }
        if (request.urls) {
            // Iterate over received URLs and add them to the uniqueUrls set
            request.urls.forEach(url => {
                uniqueUrls.add(url);
            });
            urlCounter.innerText = uniqueUrls.size === 1 ? '1 External Link Found' : `${uniqueUrls.size} External Links Found`; // Update URL counter with unique URL count
        }
    });
});

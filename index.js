const searchBar = document.querySelector('input[type="search"]');
const searchResults = document.getElementById('searchResults');

document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');
    

    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const company = document.getElementById('company').value;
        const position = document.getElementById('position').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;
        const stages = document.getElementById('stages').value;
        const notes = document.getElementById('notes').value;

        addJob(company, position, date, status, stages, notes);

        jobForm.reset();
    });

    function addJob(company, position, date, status, stages, notes) {
        const row = document.createElement('tr');


        row.innerHTML = `
            <td>${company}</td>
            <td>${position}</td>
            <td>${date}</td>
            <td>${status}</td>
            <td>${stages}</td>
            <td>${notes}</td>
        `;

        jobList.appendChild(row);
    }


    
});

const jobUrl = "https://jobicy.com/api/v2/remote-jobs"

async function receiveInput() {
    let jobListings = []

    fetch(jobUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        jobListings = data.jobs
        console.log(jobListings)

        for (let i = 0; i < jobListings.length; i++) {
            const jobPost = jobListings[i];
            let jobDiv = document.createElement('div')

            jobDiv.value = jobPost.id
            jobDiv.innerHTML = `${jobPost.companyName}`
            searchResults.appendChild(jobDiv)
            
        }
    })
    .catch(function (error) {
        console.log(error)
    })

    const searchInput = searchBar.value
    // searchResults.innerHTML = ""
    console.log(searchInput)

    if (searchInput === 0) return

    const results = await fetchCompanyInfo(searchInput)
}
// receiveInput()

async function fetchCompanyInfo(info) {
    try {
        const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?&tag=${info}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // filter?? COME BACK TO THIS
        const jobs = data.jobs
        // jobs = jobs.filter(data => data.areas.includes(info))


        
        for (let i = 0; i < jobs.length; i++) {
            const jobPost = jobs[i];
            let jobDiv = document.createElement('div')
            // let jobPostUrl = document.

            jobDiv.value = jobPost.id
            jobDiv.innerHTML = `<br>${jobPost.companyName}: ${jobPost.jobDescription} To apply, click the link - <a href=${jobPost.url}>${jobPost.url}</a>` 
            searchResults.appendChild(jobDiv)
            console.log(jobPost.jobDescription)
        }
        console.log(jobs)
        return data.jobs;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
    
}

searchBar.addEventListener("search", () => {
    console.log(searchBar.value)
    fetchCompanyInfo(searchBar.value)
})


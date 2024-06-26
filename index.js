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


async function fetchCompanyInfo(info) {
    try {
        const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?&tag=${info}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const jobs = data.jobs
        
        for (let i = 0; i < jobs.length; i++) {
            const jobPost = jobs[i];
            let jobDiv = document.createElement('div')
            jobDiv.value = jobPost.id

            jobDiv.innerHTML = `<br>${jobPost.companyName}: ${jobPost.jobDescription} To apply, click the link - <a href=${jobPost.url}>${jobPost.url}</a>` 
            searchResults.appendChild(jobDiv)
        }
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


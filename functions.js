import { searchResults } from "./index.js";

export default async function fetchCompanyInfo(info) {
    searchResults.innerHTML = ""
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

            jobDiv.innerHTML = `<h1 style="color: #024950"><u>${jobPost.companyName}:</u></h1> ${jobPost.jobDescription}<br> To apply, click the link - <a href=${jobPost.url}>${jobPost.url}</a>`

            searchResults.appendChild(jobDiv)
        }
        return data.jobs;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


const searchBar = document.getElementById('search');
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
        console.log(data)
        data = data.filter(job => job.id !== null)
        jobListings = data

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
    searchResults.innerHTML = ""
    console.log(searchInput)

    if (searchInput === 0) return

    const results = await fetchCompanyInfo(searchInput)
    
    // results.forEach(item => {
    //     const div = document.createElement('div')
    //     div.textContent = item.id
    //     searchResults.appendChild(div)
        
    // })
}
receiveInput()

async function fetchCompanyInfo(info) {
    try {
        const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?&tag=${info}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
    
}




searchBar.addEventListener("input", receiveInput)


// searchBar.addEventListener("keydown", (e) => {
//     e.preventDefault();

//     if (e.key === "Enter" && searchBar.value !== "") {
//         fetchCompanyInfo(e.value)
//     }
// }
// )



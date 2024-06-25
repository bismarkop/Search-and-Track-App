const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('search');
const search = document.querySelector('.search')


document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');
    

    jobForm.addEventListener('submit', async (e) => {
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



let eventList = ['keydown', 'click']
for (let event of eventList) {
    search.addEventListener(event, (e) => {

    })
}

async function fetchCompanyInfo() {
    try {
        const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?&tag=${e.value}`);
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
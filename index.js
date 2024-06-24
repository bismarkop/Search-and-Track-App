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

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("click", (e) => {
    if (searchBar.value !== "") {
        fetchCompanyInfo()
    }
}
)

const searchBar = document.getElementById('search')
searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchBar.value !== "") {
        fetchCompanyInfo()
    }
}
)


async function fetchCompanyInfo() {
    try {
        const response = await fetch("https://jobicy.com/api/v2/remote-jobs");
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
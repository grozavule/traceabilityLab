//require(dotenv).config();
//let {BASE_URL, SERVER_PORT} = process.env;
const BASE_URL = 'http://localhost';
const SERVER_PORT = 4050;

const warningBtn = document.querySelector('#warning');
const criticalBtn = document.querySelector('#critical');

warningBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    axios.get(`${BASE_URL}:${SERVER_PORT}/warning`)
    .then(res => {
        alert('Rollback should have received a warning!');
    }).catch(error => {
        alert('A problem occurred when sending a warning to Rollback');
    });
});

criticalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    axios.get(`${BASE_URL}:${SERVER_PORT}/critical`)
    .then(res => {
        alert('Rollback should have received a critical event!');
    }).catch(error => {
        alert('A problem occurred when sending a critical event to Rollback');
    });
});
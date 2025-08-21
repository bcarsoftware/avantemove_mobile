// Para testar no navegador, remova o comentário da próxima linha
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const q1 = document.getElementById('QuestionOne').value;
    const q2 = document.getElementById('QuestionTwo').value;
    const q3 = document.getElementById('QuestionThree').value;

    const r1 = document.getElementById('firstResponse').value;
    const r2 = document.getElementById('secondResponse').value;
    const r3 = document.getElementById('thirdResponse').value;

    const security = {
        questions: [q1, q2, q3],
        responses: [r1, r2, r3]
    };

    const finalData = {
        username,
        password,
        security
    };
}

// Para testar no navegador, remova o comentário da próxima linha
// onDeviceReady();

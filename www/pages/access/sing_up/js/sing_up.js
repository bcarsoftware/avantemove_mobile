// Para testar no navegador, remova o comentário da próxima linha
document.addEventListener('deviceready', onDeviceReady, false);

function addMobileMask(numero) {
    let numeroLimpo = numero.replace(/\D/g, '');

    if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2.$3-$4');
    } else if (numeroLimpo.length === 10) {
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return numeroLimpo;
}

function removeMobileMask(maskedNumber) {
    // É melhor retornar uma string vazia do que "null" para evitar erros.
    if (!maskedNumber) return '';
    return maskedNumber.replace(/\D/g, '');
}

function onDeviceReady() {
    let firstFormData = {};

    nextStepBtn.addEventListener('click', () => {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;

    const inputMobile = contentDiv.querySelector('#mobile');
    inputMobile.addEventListener('input', (event) => {
        event.target.value = addMobileMask(event.target.value);
    });

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = removeMobileMask(
        document.getElementById('mobile').value
    );

    const q1 = document.getElementById('QuestionsOne').value;
    const q2 = document.getElementById('QuestionsTwo').value;
    const q3 = document.getElementById('QuestionsThree').value;

    const r1 = document.getElementById('firstResponse').value;
    const r2 = document.getElementById('secondResponse').value;
    const r3 = document.getElementById('thirdResponse').value;

    const security = {
        questions: [q1, q2, q3],
        responses: [r1, r2, r3]
    };

    const finalData = {
        firstName,
        lastName,
        birthDate,
        gender,
        username,
        email,
        password,
        mobile,
        security,
        experience: 10,
        active: true,
    };

    console.log(finalData);
    });
}

// Para testar no navegador, remova o comentário da próxima linha
// onDeviceReady();

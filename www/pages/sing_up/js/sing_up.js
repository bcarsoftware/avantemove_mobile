// To test at browser add a comment at the following line and remove from the last line at this file
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
    if (maskedNumber == null || maskedNumber.length === 0) return null;
    return maskedNumber.replace(/\D/g, '');
}

function onDeviceReady() {
    const nextStepBtn = document.getElementById('next-step-btn');
    const contentDiv = document.getElementById('Content');
    let firstFormData = {};

    nextStepBtn.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const birthDate = document.getElementById('birthDate').value;
        const gender = document.getElementById('gender').value;

        firstFormData = { firstName, lastName, birthDate, gender };

        contentDiv.innerHTML = `
            <h4>Acesso</h4>
            <div class="form-group">
                <label>Nome de Usuário:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label>Celular:</label>
                <input type="text" id="mobile" name="mobile">
            </div>
        `;

        const inputMobile = contentDiv.querySelector('#mobile');

        inputMobile.addEventListener('input', (event) => {
            event.target.value = addMobileMask(event.target.value);
        });

        nextStepBtn.innerText = 'Criar Conta';
        nextStepBtn.id = 'submit-btn';
    });

    document.addEventListener('click', (event) => {
        if (event.target.id === 'submit-btn') {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const mobile = removeMobileMask(
                document.getElementById('mobile').value
            );

            const finalData = {
                ...firstFormData,
                username,
                email,
                password,
                mobile,
                experience: 10,
                active: true,
            };

            console.log(finalData);
        }
    });
}

// to test at browser, remove the // at following line
// onDeviceReady();

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
    const nextStepBtn = document.getElementById('next-step-btn');
    const contentDiv = document.getElementById('Content');
    let firstFormData = {};

    // Variável para controlar em qual tela o usuário está
    let currentStep = 1;

    // Apenas um único ouvinte de evento para o botão
    nextStepBtn.addEventListener('click', () => {
        if (currentStep === 1) {
            // Lógica para a transição da Tela 1 para a Tela 2
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

            // Adiciona o evento de input para a máscara do celular
            const inputMobile = contentDiv.querySelector('#mobile');
            inputMobile.addEventListener('input', (event) => {
                event.target.value = addMobileMask(event.target.value);
            });

            nextStepBtn.innerText = 'Avançar';
            currentStep = 2;
        } else if (currentStep === 2) {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const mobile = removeMobileMask(
                document.getElementById('mobile').value
            );

            firstFormData = {
                ...firstFormData,
                username,
                email,
                password,
                mobile
            };

            contentDiv.innerHTML = `
                <h4>Segurança</h4>
                <div class="form-group">
                    <label>Primeira Pergunta:</label>
                    <select id="QuestionsOne" name="QuestionsOne" class="enum" required>
                        <option value="" disabled selected>Selecione uma Pergunta</option>
                        <option value="Qual o nome do seu primeiro animal de estimação?">Qual o nome do seu primeiro animal de estimação?</option>
                        <option value="Em que cidade seus pais se conheceram?">Em que cidade seus pais se conheceram?</option>
                        <option value="Qual o nome da sua rua na infância?">Qual o nome da sua rua na infância?</option>
                        <option value="Qual a sua comida favorita?">Qual a sua comida favorita?</option>
                        <option value="Qual o nome da sua professora do primário?">Qual o nome da sua professora do primário?</option>
                    </select>
                    <input type="text" id="firstResponse" name="firstReponse" required>
                </div>
                <div class="form-group">
                    <label>Segunda Pergunta:</label>
                    <select id="QuestionsTwo" name="QuestionsTwo" class="enum" required>
                        <option value="" disabled selected>Selecione uma Pergunta</option>
                        <option value="Qual o nome do seu primeiro animal de estimação?">Qual o nome do seu primeiro animal de estimação?</option>
                        <option value="Em que cidade seus pais se conheceram?">Em que cidade seus pais se conheceram?</option>
                        <option value="Qual o nome da sua rua na infância?">Qual o nome da sua rua na infância?</option>
                        <option value="Qual a sua comida favorita?">Qual a sua comida favorita?</option>
                        <option value="Qual o nome da sua professora do primário?">Qual o nome da sua professora do primário?</option>
                    </select>
                    <input type="text" id="secondResponse" name="secondResponse" required>
                </div>
                <div class="form-group">
                    <label>Terceira Pergunta:</label>
                    <select id="QuestionsThree" name="QuestionsThree" class="enum" required>
                        <option value="" disabled selected>Selecione uma Pergunta</option>
                        <option value="Qual o nome do seu primeiro animal de estimação?">Qual o nome do seu primeiro animal de estimação?</option>
                        <option value="Em que cidade seus pais se conheceram?">Em que cidade seus pais se conheceram?</option>
                        <option value="Qual o nome da sua rua na infância?">Qual o nome da sua rua na infância?</option>
                        <option value="Qual a sua comida favorita?">Qual a sua comida favorita?</option>
                        <option value="Qual o nome da sua professora do primário?">Qual o nome da sua professora do primário?</option>
                    </select>
                    <input type="text" id="thirdResponse" name="thirdResponse" required>
                </div>
            `;

            nextStepBtn.innerText = 'Criar Conta';
            currentStep = 3;

        } else if (currentStep === 3) {
            // Lógica para a Tela 3 e envio dos dados
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
                ...firstFormData,
                security,
                experience: 10,
                active: true,
            };

            console.log(finalData);

            nextStepBtn.disabled = true;
            nextStepBtn.innerText = 'Conta Criada!';
        }
    });
}

// Para testar no navegador, remova o comentário da próxima linha
// onDeviceReady();

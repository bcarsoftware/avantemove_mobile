document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("O dispositivo está pronto! Aguardando o toque do usuário...");
    document.body.addEventListener('click', verificarToken);
}

async function verificarToken() {
    console.log("Tela tocada! Buscando o token...");
    const caminhoDoArquivo = 'data/token.json';

    document.body.removeEventListener('click', verificarToken);

    try {
        const response = await fetch(caminhoDoArquivo);
        let token = null;

        if (response.ok) {
            const dados = await response.json();
            token = dados.token;
        }

        if (token) {
            await checkTokenSetUser(token);
            window.location.href = "pages/dashboard/index.html";
        } else {
            window.location.href = "pages/access/login/index.html";
        }
    } catch (error) {
        console.error("Erro ao verificar token local:", error);
        window.location.href = "pages/access/login/index.html";
    }
}

async function checkTokenSetUser(token) {
    const baseUrl = "https://sua-api.com";
    const url = `${baseUrl}/user/token`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ token: token })
    });

    if (!response.ok) {
        throw new Error("Token inválido na API");
    }

    const userDataFromApi = await response.json();
    await setUser(userDataFromApi);
}

async function setUser(userFromApi) {
    const userFileName = "data/user.json";
    let localUser = {};

    try {
        const userString = await readFile(userFileName);
        localUser = JSON.parse(userString);
    } catch (error) {
        console.warn("Arquivo user.json não encontrado ou inválido. Criando um novo.");
    }

    Object.assign(localUser, userFromApi);

    await saveJson(userFileName, JSON.stringify(localUser, null, 2));
}

async function saveJson(filePath, content) {
    return new Promise((resolve, reject) => {
        const parts = filePath.split('/');
        const fileName = parts.pop();
        const dirPath = parts.join('/');

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
            dirEntry.getDirectory(dirPath, { create: true }, (targetDirEntry) => {
                targetDirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
                    fileEntry.createWriter((fileWriter) => {
                        fileWriter.onwriteend = () => resolve();
                        fileWriter.onerror = (e) => reject(e);
                        const dataObj = new Blob([content], { type: 'application/json' });
                        fileWriter.write(dataObj);
                    }, reject);
                }, reject);
            }, reject);
        }, reject);
    });
}

async function readFile(filePath) {
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory + filePath, (fileEntry) => {
            fileEntry.file((file) => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    resolve(this.result);
                };
                reader.onerror = (e) => reject(e);
                reader.readAsText(file);
            }, reject);
        }, reject);
    });
}

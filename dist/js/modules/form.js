//! forms
function forms() {
    const textShorter = require('./textShorter');

    const file = document.querySelector('input[type="file"]');
    const remover = document.createElement('div');
    const label = file.nextElementSibling;

    function inputFile() {

        file.addEventListener('change', (e) => {

            if (file.files.length != 0) {
                if (file.files.length == 1) {
                    let indexOfName = 1;
                    for (let i in file.value) {
                        if (file.value[i] == '\\') {
                            indexOfName = i;
                        }
                    }
                    indexOfName++;
                    label.lastChild.textContent = file.value.slice(indexOfName);
                    textShorter(label.lastChild);

                } else if (file.files.length > 1 && file.files.length < 5) {
                    label.lastChild.textContent = `${file.files.length} - файла выбрано`;

                } else {
                    label.lastChild.textContent = `${file.files.length} - файлов выбрано`;
                }
                remover.className = 'remover';
                remover.innerHTML = '<div>X</div>';
                label.parentElement.append(remover);
                remover.addEventListener('click', () => {
                    file.value = '';
                    label.lastChild.textContent = 'Добавить файлы';
                    remover.remove();
                });
            }
            if (file.files.length == 0) {
                remover.className = 'remover';
                remover.innerHTML = '<div>X</div>';
                label.parentElement.append(remover);
                remover.addEventListener('click', () => {
                    file.value = '';
                    label.textContent = 'Добавить файлы';
                    remover.remove();
                });
            }
        });
    }
    inputFile();

    function resetFileInput() {
        file.value = '';
        label.lastChild.textContent = 'Добавить файлы';
        remover.remove();
    }


    const validate = new window.JustValidate('#form', {
        errorLabelStyle: {
        }
    });
    validate
        .addField('#name', [
            {
                rule: 'minLength',
                value: 3,
            },
            {
                rule: 'maxLength',
                value: 30,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Укажите Email',
            },
            {
                rule: 'email',
                errorMessage: 'Возможно вы допустили ошибку!',
            },
        ])
        .addField('#message', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста напишите хотя бы пару слов!',
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Сообщение должно быть более 5 символов',
            },
        ])
        .addField('#policy', [
            {
                rule: 'required',
                errorMessage: 'Обязательно поставьте галочку, после ознакомления с политикой конфиденциальности',
            }
        ]).onSuccess((event) => {
            let data = new FormData(event.target);
            let xhr = new XMLHttpRequest();
            const submBtn = event.target.querySelector('#submit-btn');
            submBtn.textContent = 'Отправляется...';
            submBtn.style.background = 'green';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('Validation passes and form submitted');
                        submBtn.textContent = 'Спасибо!';
                        submBtn.style.background = 'green';
                        remover.remove();

                    }
                }
            };

            xhr.open('POST', 'phpMailer.php', true);
            xhr.send(data);
            resetFileInput();
            event.target.reset();
        });
}

module.exports = forms;
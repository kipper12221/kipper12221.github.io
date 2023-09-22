//доступаюсь к элементам через DOM
const imageInput = document.getElementById('imageInput');
const targetElement = document.getElementById('targetElement');
const panelBottom = document.querySelector('.box__panelBottom');
const postText = document.querySelector('.box__post__postText');
const textArea = document.querySelector('#textarea');
const imageText = document.querySelector('.box__target-element__imageText')

//функция ,что бы менять display у элементов
function noneBlock(element,valueDisplay){
    element.style.display = valueDisplay;
}
//убираем второй блок с самим постом(он откроеться после добовления нашего поста);
noneBlock(document.querySelector('.element2'),'none');

//делаю display =>none для panellBottom,что бы оно появилось ,только после добовления поста
noneBlock(panelBottom,'none');
//куда будет сохраняться загруженое изображение
let imageURL;
// создаю функцию-обработчику ,которая запуститься при изменении файла
imageInput.addEventListener('change', function (event) {
    // document.querySelector('.box__target-element__imageText').classList.add('none');
    noneBlock(imageText,'none');
    //получаю доступ к самому изображению
    const selectedFile = event.target.files[0];
    //проверка на существования картинки
    if (selectedFile) {
        // переобразование картинки в url
        imageURL = URL.createObjectURL(selectedFile);

        // установка картнки как фон targetElement
        targetElement.style.backgroundImage = `url(${imageURL})`;
    }
});
const submit = document.querySelector('#submit').addEventListener('click', () => {
    //делаю element2 видимым
    noneBlock(document.querySelector('.element2'),'block');
    noneBlock(imageText,'block');
    //очищаю текст с предыдущего описния поста (если он имееться)
    postText.textContent = '';
    //что бы для опубликовоного текста к посту ,содержались все абзаци ,как мы и вводили для публикации
    let textInpost = textArea.value.split('\n');
    //перебераю все абзаци полученые из textarea и создаю <p>какой-то из абзацев</p> ,и добовляю в postText
    textInpost.forEach(element => {
        let p = document.createElement('p');
        p.textContent = element;
        postText.appendChild(p);
    });
    //после опубликования ,у нас появляеться  panelBottom c кнопками для изменения текста к фото
    noneBlock(panelBottom,'flex');

    //устонавливаю картнику(url) в элемент на "страницу публикаций"
    document.querySelector('.box__post__postImg').style.backgroundImage = `url(${imageURL})`;
    //удоляю картинку с первой страници 
    targetElement.style.backgroundImage = `none`;
    //очищяю textarea 
    textArea.value = '';
    //появление контура элемента на странице публикаций ,с коментарием к картинке
    postText.style.border = '1px solid black';
})

//изменение текста к добавленрму посту через нажатие на определеные кнопку
const deleteBtn =document.querySelector('.box__panelBottom__delete');
const changeBtn =document.querySelector('.box__panelBottom__change');
const saveBtn =document.querySelector('.box__panelBottom__save');
const textPostChenge =document.querySelector('.box__post__changePostText')
//function запуститься при нажатии на  deleteBtn,и так дальше с каждой кнопкой
deleteBtn.addEventListener('click',(event)=>{
    postText.textContent ="";
    noneBlock(event.target,'none')
})
changeBtn.addEventListener('click',()=>{
    //достаем текст(вместе с текстовіми узлами) ,убираем не нужные кнопки на даную ситуацию и добовляем textarea ,что бы можно было изменть текст поста
    let textFromPostText =postText.innerText;
    noneBlock(postText,'none');
    noneBlock(textPostChenge,'block');
    textPostChenge.value = textFromPostText;
    noneBlock(deleteBtn,'none');
    noneBlock(saveBtn,'block');
})
let textFromChengeText;
//при сохранении изменений
saveBtn.addEventListener('click',(event)=>{
    noneBlock(deleteBtn,'block');
    noneBlock(event.target,'none');
    textFromChengeText = textPostChenge.value.split('\n');
    noneBlock(textPostChenge,'none');
    noneBlock(postText,'block');
    postText.textContent = '';
    textFromChengeText.forEach(element => {
        let p =document.createElement('p');
        p.textContent = element;
        postText.appendChild(p);
    });
    textFromChengeText = '';
})

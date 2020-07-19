'use strict';


var USER_NAMES = ['Джон', 'Ежи', 'Иен', 'Чарльз', 'Батон', 'Макс', 'Лолита', 'Шанти', 'Комета', 'Моника'];

var USER_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;

///////  Функция создания рандомного числа

var getRandomValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};


////// Функция генерации комментария  data.js

var posts = [];
var usersComments = [];

var COMMENTS_NUMBER = 5;

var createComment = function (number) {
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomValue(1, number + 1) + '.svg',
      message: USER_MESSAGES[getRandomValue(0, number)],
      name: USER_NAMES[getRandomValue(0, number)]
    };
     usersComments.push(comment);
  }
   return usersComments
};
createComment(COMMENTS_NUMBER);

////// Функция генерации массива фотографий пользователей data.js
var POSTS_NUMBER = 25;

var createPost = function (number) {

  for (var i = 0; i < number; i++) {
    var post = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomValue(15, 200),
      comments: usersComments[getRandomValue(0, 4)]
    };
    posts.push(post);
  }
};
createPost(POSTS_NUMBER);

// Функция создания дом элемента, соттветствующая фотографиям, заполненным данными из массива

window.createNewPost = function (items) {
  var template = document.querySelector('#picture').content.querySelector('a');
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = items.url;
  element.querySelector('.picture__comments').textContent = 1;
  element.querySelector('.picture__likes').textContent = items.likes;
  element.addEventListener('click' , function(){
    makeBigPicture(items);
  })
  return element;
};

 // Функция отрисовки дом элементов в блок .pictures

var renderPosts = function (newPosts) {
  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

    newPosts.forEach(function (item) {
    fragment.appendChild(createNewPost(item));
    postList.appendChild(fragment);
  });
};

renderPosts(posts);

////////Функция открытия модального окна с большой фотографией. preview.js

var makeBigPicture = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  var comments = createComment()
  for (var i = 0; i < comments.length;i++) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');
    li.classList.add('social__comment');
     img.classList.add('social__picture');
     p.classList.add('social__text');
     img.src = comments[i].avatar;
     p.innerText = comments[i].message;
     li.appendChild(img);
     li.appendChild(p);
    bigPicture.querySelector('.social__comments').appendChild(li);
    };
  document.querySelector('body').classList.add('modal-open');
  makeCommentsHidden();
};

// Функция скрытия блоков комментариев preview.js
var makeCommentsHidden = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

makeBigPicture(posts[0]);

// Функция открытия большой фотографии для превью preview.js

// var pictureImg = document.querySelectorAll('.picture__img');
// var bigPictureImg = document.querySelector('.big-picture__img');

// var addThumbnailClickHandler = function (pictureImg, photo) {
//   pictureImg.addEventListener('click', function () {
//     // bigPictureImg.src = photo;
//     console.log('успех');
//   });
// };

// for (var i = 0; i < pictureImg.length; i++) {
//   addThumbnailClickHandler(pictureImg[i], photos[i]);
// }

////////Функция закрытия модального окна с большой фотографией. preview.js
var bigPicture = document.querySelector('.big-picture');
var clouseBigCancel = document.querySelector('.big-picture__cancel');

clouseBigCancel.addEventListener('click', function () {
  clouseBigPicture();
});

var clouseBigPicture = function () {
  bodyElement.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
};

////////Функция закрытия модального окна с большой фотографией при нажатии esс. preview.js
var BigPictureEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    clouseBigPicture();
  }
};

document.addEventListener('keydown', function (evt){
  BigPictureEscPress(evt);
})

//// Блок загрузки фотографий form.js

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var bodyElement = document.querySelector('body');
var sliderPin = document.querySelector('.effect-level__pin');
var line = document.querySelector('.effect-level__line');
var effect = document.querySelector('.effect-level__value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var imgUploadControl = document.querySelector('.img-upload__scale');
var imgControlBig = imgUploadControl.querySelector('.scale__control--bigger');
var imgcontrolSmall = imgUploadControl.querySelector('.scale__control--smaller');
var imgControlValue = document.querySelector('.scale__control--value');

///// Обработчик открытия окна загрузки фотографий form.js
uploadFile.addEventListener('change', function () {
  openPopup();
});

/////// Обработчик закрытия окна загрузки фотографий form.js
uploadCancel.addEventListener('click', function () {
  closePopup();
});


//// Функция открытия окна загрузки фотографий form.js
var openPopup = function () {
  bodyElement.classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

////Функция закрытия окна загрузки фотографий при клике form.js
var closePopup = function () {
  bodyElement.classList.remove('modal-open');
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

//// Функция закрытия окна загрузки фотографий при клике form.js
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && document.querySelector('.text__hashtags') !== document.activeElement && document.querySelector('.text__description') !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};



//// Обработчик уменьшения фотографии в окне загрузки фотографии form.js
imgcontrolSmall.addEventListener('click', function () {
  var scaleValue = Number(imgControlValue.value.slice(0, -1));
  scaleValue -= SCALE_STEP;

  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }

  changeImgScale(scaleValue);
});


////// Обработчик увеличения фотографии в окне загрузки фотографии form.js
imgControlBig.addEventListener('click', function () {
  var scaleValue = Number(imgControlValue.value.slice(0, -1));
  scaleValue += SCALE_STEP;

  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }

  changeImgScale(scaleValue);
});

//// Функция изменения масштаба фотографии в окне загрузки фотографии form.js

function changeImgScale(value) {
  imgControlValue.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
}

//// Функция наложения эффекта на изображение form.js

function onFilterChange(event) {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = null;
  imgUploadPreview.classList.add('effects__preview--' + event.target.value);

  if (event.target.value === 'none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }
}

//// Обработчик движения слайдера form.js

line.addEventListener('mousedown', function () {

  var offSet = sliderPin.offsetLeft;
  var lineWidth = line.offsetWidth;
  var effectValue = Math.round(offSet * 100 / lineWidth);
  effect.value = effectValue;
});

var imgEffectsContainer = document.querySelector('.img-upload__effects');
imgEffectsContainer.addEventListener('change', onFilterChange);

var effectLevelSlider = document.querySelector('.img-upload__effect-level');
// var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');

// function onEffectLevelChange() {
//   switch (imgUploadPreview.className) {
//     case 'effects__preview--chrome':
//       imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
//       break;
//     case 'effects__preview--sepia':
//       imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
//       break;
//     case 'effects__preview--marvin':
//       imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
//       break;
//     case 'effects__preview--phobos':
//       imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
//       break;
//     case 'effects__preview--heat':
//       imgUploadPreview.style.filter = 'brightness(' + (effectLevelInput.value * 3 / 100 + 1) + ')';
//       break;
//     default:
//       imgUploadPreview.style.filter = null;
//   }
// }


//////////////валидация формы form.js
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAG_NUMBER = 5;
var MAX_DESCRIPTION_TEXT_LENGTH = 140;
// var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;
var hashtagInput = document.querySelector('.text__hashtags');
var descriptionText = document.querySelector('.text__description');

descriptionText.addEventListener('input', function () {
  if (descriptionText.value.length > MAX_DESCRIPTION_TEXT_LENGTH) {
    descriptionText.setCustomValidity('длина комментария не может составлять больше 140 символов. Удалите ' + (descriptionText.value.length - MAX_DESCRIPTION_TEXT_LENGTH) + ' символа(ов).');
  } else {
    descriptionText.setCustomValidity('');
  }
});

hashtagInput.addEventListener('input', function () {
  var values = hashtagInput.value.toLowerCase().split(' ');
  var errors = [];

  values.forEach(function (hashtag, index, array) {
    var message = 'Хештег ' + hashtag + ' не соответствует данным критериям: ';
    var hashtagErrors = [];

    if (hashtag[0] !== '#') {
      hashtagErrors.push('хештег должен начинаться с #');
    }
    if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagErrors.push('длина хештега должна быть от 2 до 20 символов, включая #');
    }
    if (!hashtagSymbolsRegexp.test(hashtag)) {
      hashtagErrors.push('хештег должен состоять только из букв и цифр');
    }
    if (array.indexOf(hashtag) !== array.lastIndexOf(hashtag)) {
      hashtagErrors.push('повторяющиеся хештеги запрещены');
    }
    if (array.length > MAX_HASHTAG_NUMBER) {
      hashtagErrors.push('количество хештегов не должно быть больше 5');
    }
    message += hashtagErrors.join(', ');
    if (hashtagErrors.length > 0) {
      errors.push(message);
    }
  });
  if (errors.length > 0) {
    hashtagInput.setCustomValidity(errors.join('. '));
  } else {
    hashtagInput.setCustomValidity('');
  }
});

hashtagInput.addEventListener('focus', function(){

});

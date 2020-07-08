
'use strict';

var POSTS_NUMBER = 25;
var COMMENTS_NUMBER = 6;

var USER_NAMES = ['Джон', 'Ежи', 'Иен', 'Чарльз', 'Батон', 'Макс', 'Лолита', 'Новенькая', 'Комета', 'Моника'];

var USER_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var posts = [];
var usersComments = [];

var getRandomValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var createComment = function (number) {
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomValue(1, number + 1) + '.svg',
      message: USER_MESSAGES[getRandomValue(0, number)],
      name: USER_NAMES[getRandomValue(0, number)]
    };
    usersComments.push(comment);
  }
};
createComment(COMMENTS_NUMBER);

var createPost = function (number) {
  for (var i = 0; i < number; i++) {
    var post = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomValue(15, 200),
      comments: usersComments[getRandomValue(0, 6)]
    };
    posts.push(post);
  }
};
createPost(POSTS_NUMBER);

var createNewPost = function (items) {
  var template = document.querySelector('#picture').content.querySelector('a');
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = items.url;
  element.querySelector('.picture__comments').textContent = 1;
  element.querySelector('.picture__likes').textContent = items.likes;

  return element;

};

var renderPosts = function (newPosts) {
  var fragment = document.createDocumentFragment();
  var postList = document.querySelector('.pictures');

  newPosts.forEach(function (item) {
    fragment.appendChild(createNewPost(item));
    postList.appendChild(fragment);
  });
};

renderPosts(posts);

// var makeCommentsHidden = function () {
//   document.querySelector('.social__comment-count').classList.add('hidden');
//   document.querySelector('.comments-loader').classList.add('hidden');
// };

// var makeBigPicture = function (photo) {
//   var bigPicture = document.querySelector('.big-picture');
//   bigPicture.classList.remove('hidden');

//   bigPicture.querySelector('.big-picture__img ').src = posts[0].url;
//   bigPicture.querySelector('.likes-count').textContent = photos.likes;
//   bigPicture.querySelector('.comments-count').textContent = photos.comments.length;
//   bigPicture.querySelector('.social__caption').textContent = photos.description;

//   bigPicture.querySelector('.social__comments').appendChild(createComment());
//   document.querySelector('body').classList.add('modal-open');
//   makeBlocksHidden();
// };

// makeBigPicture();

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var bodyElement = document.querySelector('body');
var sliderPin = document.querySelector('.effect-level__pin');
var effectButton = document.querySelector('.effects__radio');

 uploadFile.addEventListener('change', function () {
    openPopup();
  });


var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  bodyElement.classList.remove('modal-open');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  bodyElement.classList.add('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);
};

sliderPin.addEventListener('mousedown', function (event) {
effectButton

})

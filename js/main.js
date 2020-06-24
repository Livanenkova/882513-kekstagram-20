
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



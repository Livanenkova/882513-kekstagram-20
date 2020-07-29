'use strict';

(function () {
  var USER_NAMES = ['Джон', 'Ежи', 'Иен', 'Чарльз', 'Батон', 'Макс', 'Лолита', 'Шанти', 'Комета', 'Моника'];

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

  var COMMENTS_NUMBER = 5;
  var POSTS_NUMBER = 25;

  // Функция генерации комментария

  var createComment = function (number) {
    for (var i = 0; i < number; i++) {
      var comment = {
        avatar: 'img/avatar-' + window.utils.getRandomValue(1, number + 1) + '.svg',
        message: USER_MESSAGES[window.utils.getRandomValue(0, number)],
        name: USER_NAMES[window.utils.getRandomValue(0, number)]
      };
      usersComments.push(comment);
    }
    return usersComments;
  };
  createComment(COMMENTS_NUMBER);

  // Функция генерации массива фотографий пользователей

  var createPost = function (number) {
    for (var i = 0; i < number; i++) {
      var post = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: '',
        likes: window.utils.getRandomValue(15, 200),
        comments: usersComments[window.utils.getRandomValue(0, 4)]
      };
      posts.push(post);
    }
  };
  createPost(POSTS_NUMBER);

  window.data = {
    posts: posts,
    createComment: createComment
  };

})();


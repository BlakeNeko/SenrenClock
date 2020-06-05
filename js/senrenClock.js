// 时钟
var nowDate = new Date();
var clockDate = document.getElementById('clockDate');
var clockWeedday = document.getElementById('clockWeekday');
var clockTime = document.getElementById('clockTime');
// 处理右侧单选框
var places = document.getElementsByName('place');
var characters = document.getElementsByName('character');
var poses = document.getElementsByName('pose');
var cloths = document.getElementsByName('cloth');
// 公用变量，存储已选择的选项
var selectedCharacter = 'mako';
var selectedPose = '1';
var selectedCloth = 'xf';
var selectedFace = '1.png'

function getWeekdayStr() {
  var nowWeekDay = nowDate.getDay();
  var weekDayStr = new Array('周日(Sun)', '周一(Mon)', '周二(Tue)', '周三(Wed)', '周四(Thr)', '周五(Fri)', '周六(Sat)');
  return weekDayStr[nowWeekDay];
}

function updateTime() {
  nowDate = new Date();
  clockDate.innerHTML = (nowDate.getMonth() + 1) + '月' + nowDate.getDate() + '日';
  clockWeedday.innerHTML = getWeekdayStr();
  if (nowDate.getMinutes() < 10) {
    clockTime.innerHTML = nowDate.getHours() + ':' + '0' + nowDate.getMinutes();
  } else {
    clockTime.innerHTML = nowDate.getHours() + ':' + nowDate.getMinutes();
  }
}

function init() {
  var clickMako = document.getElementById('mako');
  var character = document.getElementById('character');
  character.onclick = mouseClick;
  character.onmouseout = mouseOut;
  for (var a = 0; a <= 5; a++) {
    places[a].onchange = changeBackGround;
  }
  for (var b = 0; b <= 3; b++) {
    characters[b].onclick = changeCharacter;
  }
  for (var c = 0; c <= 2; c++) {
    poses[c].onchange = changePose;
  }
  for (var d = 0; d <= 5; d++) {
    cloths[d].onchange = changeCloth;
  }
  clickMako.click();
}

function changeBackGround() {
  var bg = document.getElementById('bg');
  var path = './images/places/' + this.value + '.jpg';
  bg.style.backgroundImage = 'url(\'' + path + '\')';
}

function changeCharacter() {
  var character = document.getElementById('character');
  var path;
  var cloths = document.getElementsByName('cloth');
  var poseOne = document.getElementsByName('pose')[0];
  var clothOne = document.getElementsByName('cloth')[0];
  selectedCharacter = this.value;
  selectedPose = '1';
  selectedCloth = 'xf';

  function reset() {
    poseOne.checked = true;
    clothOne.checked = true;
    for (var a = 0; a <= 5; a++) {
      cloths[a].disabled = false;
    }
  }

  function disable() {
    for (var a = 0; a < arguments.length; a++) {
      cloths[arguments[a]].disabled = true;
    }
  }

  if (selectedCharacter == 'yoshino') {
    reset();
    disable(3, 4, 5);
  } else if (selectedCharacter == 'mako') {
    reset();
    disable(2, 4, 5);
  } else if (selectedCharacter == 'murasame') {
    reset();
    disable(1, 2, 3, 5);
  } else if (selectedCharacter == 'lena') {
    reset();
    disable(2, 3, 4);
  }
  path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
  character.style.backgroundImage = 'url(\'' + path + '\')';
}

function changePose() {
  var character = document.getElementById('character');
  selectedPose = this.value;
  var path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
  character.style.backgroundImage = 'url(\'' + path + '\')';
}

function changeCloth() {
  var character = document.getElementById('character');
  selectedCloth = this.value;
  var path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
  character.style.backgroundImage = 'url(\'' + path + '\')';
}

function mouseClick() {
  var path;
  if (selectedCharacter == 'yoshino' || selectedCharacter == 'lena') {
    if (selectedPose == '1' || selectedPose == '2') {
      selectedFace = getRandomNumber(1, 7) + '.png';
      path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
      this.style.backgroundImage = 'url(\'' + path + '\')';
    } else if (selectedPose == '3') {
      selectedFace = getRandomNumber(1, 5) + '.png';
      path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
      this.style.backgroundImage = 'url(\'' + path + '\')';
    }
  } else if (selectedCharacter == 'mako' || selectedCharacter == 'murasame') {
    selectedFace = getRandomNumber(1, 6) + '.png';
    path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/' + selectedFace;
    this.style.backgroundImage = 'url(\'' + path + '\')';
  }
}

function mouseOut() {
  var path = './images/characters/' + selectedCharacter + '/' + selectedCloth + '/' + selectedPose + '/1.png';
  this.style.backgroundImage = 'url(\'' + path + '\')';
}

function getRandomNumber(min, max) {
  var Num = Math.floor(Math.random() * (max - min) + min);
  return Num;
}

window.onload = function () {
  this.init();
  this.updateTime();
};

setInterval(updateTime, 1000);
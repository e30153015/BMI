var resultBtn = document.querySelector('#resultBtn');
var bmiList = document.querySelector('.bmiList');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
var userHeightInput = document.querySelector('#userHeight');
var userWeightInput = document.querySelector('#userWeight');


//日期
var currentNow = new Date();
var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
var userFillDate = month[currentNow.getMonth()] + "-" + currentNow.getDate() + "-" + currentNow.getFullYear();

// 監聽與更新\
resultBtn.addEventListener('click', addList);
userHeightInput.addEventListener('blur', checkData);
userWeightInput.addEventListener('blur', checkData);
bmiList.addEventListener('click', toggleDone);
updateList(data);


function addList(e) {
    e.preventDefault();
    var userHeight = document.querySelector('#userHeight').value;
    var userWeight = document.querySelector('#userWeight').value;
    var userData = {
        BMI: (userWeight / ((userHeight / 100) * (userHeight / 100))).toFixed(2),
        height: userHeight,
        weight: userWeight
    }
    data.push(userData);
    updateList(data);
    localStorage.setItem('bmiData', JSON.stringify(data))
}

function updateList(items) {
    str = '';
    let bmiColor;
    let bmiStandard;
    for (var i = 0; i < items.length; i++) {
        if (items[i].BMI < 18.5) {
            bmiColor = 'bmiBlue';
            bmiStandard = '過輕';
            bmifont = 'blue';
        } else if (18.5 <= items[i].BMI && items[i].BMI < 24.0) {
            bmiColor = 'bmiGreen';
            bmiStandard = '理想';
            bmifont = 'green';
        } else if (24.0 <= items[i].BMI && items[i].BMI < 27.0) {
            bmiColor = 'bmiOrange';
            bmiStandard = '過重';
            bmifont = 'orange';
        } else if (27.0 <= items[i].BMI && items[i].BMI < 30.0) {
            bmiColor = 'bmiOrangedeep';
            bmiStandard = '輕度肥胖';
            bmifont = 'orangedeep';
        } else if (30.0 <= items[i].BMI && items[i].BMI < 35.0) {
            bmiColor = 'bmiOrangedeep';
            bmiStandard = '中度肥胖';
            bmifont = 'orangedeep';
        } else if (items[i].BMI >= 35) {
            bmiColor = 'bmiRed';
            bmiStandard = '過度肥胖';
            bmifont = 'red';
        }
        str += `<li id='${bmiColor}'>
<div id='${bmifont}'>${bmiStandard}</div>
<div><sup class='bmiclass'>BMI</sup>${items[i].BMI}</div>
<div><sup class='bmiclass'>Weight</sup>${items[i].weight}</div>
<div><sup class='bmiclass'>Height</sup>${items[i].height}</div>
<div><sup class='bmiclass'>${userFillDate}</sup></div>
<a href='#' data-index='${i}'>刪除</a></li>`
    }
    bmiList.innerHTML = str;
}

function toggleDone(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return
    };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('bmiData', JSON.stringify(data));
    updateList(data);
}


function checkData(e) {
    e.preventDefault();
    var str = e.target.value;
    var targetID = e.target.id;
    if (str == '') {
        var alertString = '';
        if (targetID == 'userHeight') {
            alertString = "您尚未輸入身高！";
        } else if (targetID == 'userWeight') {
            alertString = "您尚未輸入體重！";
        }
        alert(alertString);
    } else {
        //console.log(parseInt(str));
        if (isNaN(parseInt(str))) {
            alert("您輸入非數字的資料了！");
        }
    }
}

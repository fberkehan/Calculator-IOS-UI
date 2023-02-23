// Değişkenlerin tanımlanması
const hesapMakinesi = document.querySelector(".hesapMakinesi");
const burayaYaz = document.querySelector("#burayaYaz");
const AC = document.querySelector("#AC");
const plusMinus = document.querySelector("#+-");
const percent = document.querySelector("#/");
const divide = document.querySelector("#bolum");
const multiply = document.querySelector("#carpi");
const subtract = document.querySelector("#eksi");
const add = document.querySelector("#topla");
const equals = document.querySelector("#sonuc");
const decimal = document.querySelector("#nokta");
const numbers = document.querySelectorAll(".dot:not(#sonuc):not(#bolum):not(#carpi):not(#eksi):not(#topla):not(#nokta):not(#+-):not(#/)");
const displayLimit = 11;

// Değişken değerlerinin ayarlanması
let currentNumber = "0";
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

// Hesap makinesindeki her tuş için olay dinleyicisi ekleme
AC.addEventListener("click", clearAll);
plusMinus.addEventListener("click", toggleSign);
percent.addEventListener("click", calculatePercent);
divide.addEventListener("click", operate);
multiply.addEventListener("click", operate);
subtract.addEventListener("click", operate);
add.addEventListener("click", operate);
equals.addEventListener("click", calculateResult);
decimal.addEventListener("click", addDecimal);
numbers.forEach(number => {
number.addEventListener("click", inputNumber);
});

// Fonksiyonlar
function clearAll() {
currentNumber = "0";
firstOperand = null;
operator = null;
waitingForSecondOperand = false;
updateDisplay();
}

function toggleSign() {
currentNumber = currentNumber * -1;
updateDisplay();
}

function calculatePercent() {
currentNumber = currentNumber / 100;
updateDisplay();
}

function operate() {
if (firstOperand === null) {
firstOperand = currentNumber;
} else if (operator) {
calculateResult();
firstOperand = currentNumber;
}
operator = this.id;
waitingForSecondOperand = true;
}

function calculateResult() {
if (waitingForSecondOperand) {
return;
}
let result = null;
const secondOperand = currentNumber;
if (firstOperand !== null && operator) {
switch (operator) {
case "bolum":
result = parseFloat(firstOperand) / parseFloat(secondOperand);
break;
case "carpi":
result = parseFloat(firstOperand) * parseFloat(secondOperand);
break;
case "eksi":
result = parseFloat(firstOperand) - parseFloat(secondOperand);
break;
case "topla":
result = parseFloat(firstOperand) + parseFloat(secondOperand);
break;
default:
return;
}
currentNumber = result.toString().slice(0, displayLimit);
firstOperand = currentNumber;
operator = null;
waitingForSecondOperand = false;
updateDisplay();
}
}

function addDecimal() {
if (waitingForSecondOperand) {
currentNumber = "0";
waitingForSecondOperand = false;
}
if (!currentNumber.includes(".")) {
currentNumber += ".";
}
updateDisplay();
}

function inputNumber() {
const number = this.textContent;
if (currentNumber.length >= displayLimit) {
return;
}
if (currentNumber === "0" || waitingForSecondOperand) {
currentNumber = number;
waitingForSecondOperand = false;
} else {
currentNumber += number;
}
}

// Hesap makinesi işlemlerini tutacak değişkenler
let sayi1 = '';
let sayi2 = '';
let islem = '';

// HTML elementlerini seçme
const ustYanit = document.querySelector('#burayaYaz');
const dotlar = document.querySelectorAll('.dot');

// Butonlara tıklama event listener'ları ekleme
dotlar.forEach((dot) => {
dot.addEventListener('click', () => {
islemiAl(dot.id);
});
});

// AC (clear) butonuna tıklama event listener'ı ekleme
document.querySelector('#AC').addEventListener('click', () => {
sayi1 = '';
sayi2 = '';
islem = '';
guncelleYanit('0');
});

// = (eşittir) butonuna tıklama event listener'ı ekleme
document.querySelector('#sonuc').addEventListener('click', () => {
hesapla();
});

// İşlem almak için fonksiyon oluşturma
function islemiAl(id) {
if (!isNaN(id) || id === '.') {
// Rakam veya nokta butonuna tıklandı
if (islem === '') {
sayi1 += id;
guncelleYanit(sayi1);
} else {
sayi2 += id;
guncelleYanit(sayi2);
}
} else if (id === '+-' && sayi1 !== '') {
// Pozitif/negatif işaret butonuna tıklandı
if (islem === '') {
sayi1 = sayi1 * -1;
guncelleYanit(sayi1);
} else {
sayi2 = sayi2 * -1;
guncelleYanit(sayi2);
}
} else {
// İşlem butonlarına tıklandı
if (sayi1 !== '' && sayi2 !== '') {
hesapla();
}
islem = id;
}
}

// Hesaplama işlemini yapan fonksiyon
function hesapla() {
let sonuc = '';
const s1 = parseFloat(sayi1);
const s2 = parseFloat(sayi2);
if (isNaN(s1) || isNaN(s2)) return;
switch (islem) {
case '+':
sonuc = s1 + s2;
break;
case '-':
sonuc = s1 - s2;
break;
case 'x':
sonuc = s1 * s2;
break;
case '÷':
sonuc = s1 / s2;
break;
case '%':
sonuc = (s1 / 100) * s2;
break;
default:
return;
}
sayi1 = sonuc;
sayi2 = '';
islem = '';
guncelleYanit(sonuc);
}

// Yanıtı güncelleyen fonksiyon
function guncelleYanit(yeniYanit) {
ustYanit.innerText = yeniYanit;
}
// işlemleri yapacak fonksiyon
function hesapla() {
    // input ekranındaki değeri al
    let deger = document.getElementById("ekran").value;
    
    // eğer input boş ise veya sadece bir işlem sembolü varsa işlem yapma
    if (deger === "" || deger === "+" || deger === "-" || deger === "x" || deger === "÷") {
    return;
    }
    
    // inputtaki sembolü replace fonksiyonuyla işlem sembolüne çevir
    deger = deger.replace(/x/g, "*").replace(/÷/g, "/");
    
    // işlemi yap ve sonucu ekrana yazdır
    let sonuc = eval(deger);
    document.getElementById("ekran").value = sonuc;
    }
    
    // butonlara tıklanınca input ekranındaki değeri güncelle
    function islemeAl(deger) {
    let ekranDegeri = document.getElementById("ekran").value;
    
    // AC butonuna tıklanırsa input ekranını temizle
    if (deger === "AC") {
    document.getElementById("ekran").value = "";
    }
    // +/- butonuna tıklanırsa işaret değiştir
    else if (deger === "+-") {
    if (ekranDegeri[0] === "-") {
    document.getElementById("ekran").value = ekranDegeri.slice(1);
    } else {
    document.getElementById("ekran").value = "-" + ekranDegeri;
    }
    }
    // % butonuna tıklanırsa değerin yüzde birini al
    else if (deger === "%") {
    document.getElementById("ekran").value = eval(ekranDegeri) / 100;
    }
    // = butonuna tıklanırsa hesaplamayı yap
    else if (deger === "sonuc") {
    hesapla();
    }
    // diğer butonlara tıklanırsa input ekranına yazdır
    else {
    document.getElementById("ekran").value = ekranDegeri + deger;
    }
    }

    // Fonksiyonlar

// Sayı butonlarına tıklandığında çalışacak fonksiyon
function islemeAl(sayi) {
    let sonuc = document.getElementById("burayaYaz");
    let eskiDeger = sonuc.innerHTML;
    
    // AC butonuna tıklandığında
    if (sayi === "AC") {
    sonuc.innerHTML = "0";
    }
    // +/- butonuna tıklandığında
    else if (sayi === "+-") {
    sonuc.innerHTML = -1 * eskiDeger;
    }
    // % butonuna tıklandığında
    else if (sayi === "%") {
    sonuc.innerHTML = eskiDeger / 100;
    }
    // Bölme işlemi yaparken
    else if (sayi === "bolum") {
    sonuc.innerHTML += "/";
    }
    // Çarpma işlemi yaparken
    else if (sayi === "carpi") {
    sonuc.innerHTML += "*";
    }
    // Çıkarma işlemi yaparken
    else if (sayi === "eksi") {
    sonuc.innerHTML += "-";
    }
    // Toplama işlemi yaparken
    else if (sayi === "topla") {
    sonuc.innerHTML += "+";
    }
    // Sonucu hesapla
    else if (sayi === "sonuc") {
    sonuc.innerHTML = eval(eskiDeger);
    }
    // Rakamları yazdır
    else {
    if (eskiDeger === "0") {
    sonuc.innerHTML = sayi;
    } else {
    sonuc.innerHTML += sayi;
    }
    }
    }
    
    // HTML'deki hesap makinesi butonlarına event listener ekleyelim
    const butonlar = document.getElementsByClassName("dot");
    for (let i = 0; i < butonlar.length; i++) {
    butonlar[i].addEventListener("click", function() {
    islemeAl(this.id);
    });
    }

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Get elements
const billInput = $('.bill__input');
const tipBtns = $$('.tip .btn');
const tipCustom = $('.tip__input');
const peopleInput = $('.people__input');
const errorMsg = $('.error-msg');
const resetBtn = $('.btn--reset');
const results = $$('.output__value');

// Set default value
let billValue = 0;
let tipValue = 1;
let peopleValue = 1;

// Events
billInput.addEventListener('input', setBillValue);
tipBtns.forEach((btn) => {
	btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setCustomTipValue);
peopleInput.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

// Function
function setBillValue() {
	billValue = parseFloat(billInput.value);

	calculateTip();
	fixNaN();

	enableReset();
}

function handleClick(event) {
	tipBtns.forEach((btn) => {
		btn.classList.remove('active');

		if (event.target.innerHTML == btn.innerHTML) {
			btn.classList.add('active');
			tipValue = parseFloat(btn.innerHTML) / 100;
		}
	});

	// Clear custom tip
	tipCustom.value = '';

	calculateTip();
	fixNaN();

	enableReset();
}

function setCustomTipValue() {
	tipValue = parseFloat(tipCustom.value) / 100;

	// Remove active btn state
	tipBtns.forEach((btn) => {
		btn.classList.remove('active');
	});

	if (tipCustom.value !== '') {
		calculateTip();
		fixNaN();

		enableReset();
	}
}

function setPeopleValue() {
	peopleValue = parseInt(peopleInput.value);

	if (peopleValue <= 0) {
		errorMsg.classList.add('show-error-msg');
	} else {
		errorMsg.classList.remove('show-error-msg');
	}

	calculateTip();
	fixNaN();
	enableReset();
}

function calculateTip() {
	if (peopleValue >= 1) {
		let perPerson = billValue / peopleValue;
		let tipAmount = perPerson * tipValue;
		let total = perPerson + tipAmount;

		results[0].innerHTML = '$' + tipAmount.toFixed(2);
		results[1].innerHTML = '$' + total.toFixed(2);
	}
}

function enableReset() {
	resetBtn.removeAttribute('disabled');
}

function reset() {
	billInput.value = '';
	setBillValue();

	tipBtns.forEach((btn) => {
		btn.classList.remove('active');
	});

	tipCustom.value = '';
	setCustomTipValue();

	peopleInput.value = '';
	setPeopleValue();

	fixNaN();

	resetBtn.setAttribute('disabled', '');
}

function fixNaN() {
	results.forEach((result) => {
		if (result.innerHTML == '$' + NaN) {
			result.innerHTML = '$0.00';
		}
	});
}

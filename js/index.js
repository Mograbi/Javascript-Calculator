var index = 0;
var arr = [];
var flag = false;
var last_result = 0;
var last_res_sign = 1;

function add(x, y) {
	return x + y;
}

function sub(x, y) {
	return x - y;
}

function mul(x, y) {
	return x*y;
}

function div(x, y) {
	return parseFloat((x).toFixed(1)) / y;
}

function show(res) {
	if (! flag) {
		if (isDigit(res)) {
			document.getElementById("result").innerHTML += res;
		}
		document.getElementById("history").innerHTML += res;
	} else {
		document.getElementById("history").innerHTML += ('=' + res.toString());
		document.getElementById("result").innerHTML = res;
	}
}

function isDigit(d) {
	return ((d >= '0' && d <= '9') || (d === '.'));
}

function insert(element) {
	if (flag && (isDigit(element))) {
		index = 0;
		arr = [];
		arr.push(element);
		index++;
		flag = false;
		document.getElementById("result").innerHTML = element;
		document.getElementById("history").innerHTML = element;
	} else if (flag && (! isDigit(element))) {
		index = 0;
		arr = [];
		var lr;
		if (last_result < 0) {
			lr = last_result.toString().split("");
			arr.push('0');
			index += 2;
		} else {
			lr = last_result.toString().split("");
		}
		arr = arr.concat(lr);
		arr.push(element);
		index += (1 + lr.length);
		flag = false;
		document.getElementById("history").innerHTML = last_result + element;
	} else {
		if ((index == 0) && isDigit(element)) {
			arr.push(element);
			index++;
			document.getElementById("result").innerHTML = element;
			document.getElementById("history").innerHTML = element;
		} else {
			if ((index > 0 && ( ! isDigit(element))) && (! isDigit(arr[index - 1]))) {
				// we do replace sign
				arr[index - 1] = element;
				var old_history = document.getElementById("history").innerHTML;
				document.getElementById("history").innerHTML = old_history.slice(0, old_history.length - 1) + element;
			} else {
				if ( !((index == 0) && (! isDigit(element)))) {
					if (isDigit(element) && (! isDigit(arr[index - 1]))) {
						document.getElementById("result").innerHTML = element;
						document.getElementById("history").innerHTML += element;
					} else {
						show(element);
					}
					arr.push(element);
					index++;
				}
			}
		}
	}
}

function remove() {
	index--;
}

function calculate() {
	if (! flag) {
		var nums = [];
		var signs = [];
		var res = 0;
		for (var i = 0; i < index; i++) {
			var str = "";
			while((arr[i] >= '0' && arr[i] <= '9') || (arr[i] === '.')) {
				str += arr[i];
				i++;
			}
			if (str.indexOf('.') !== -1) {
				nums.push(parseFloat(str));
			} else {
				nums.push(parseInt(str));
			}
			if (i < index) {
				signs.push(arr[i]);
			}
		}
		var signs_index = 0;
		for (i = 0; i < nums.length - 1; i++) {
			switch (signs[signs_index]) {
				case '-':
					res = sub(nums[i], nums[i + 1]);break;
				case '+':
					res = add(nums[i], nums[i + 1]);break;
				case '/':
					res = div(nums[i], nums[i + 1]);break;
				case '*':
					res = mul(nums[i], nums[i + 1]);break;
			}
			if (i != (nums.length - 1)) {
				nums[ i + 1] = res;
			}
			signs_index++;
		}
		flag = true;
		last_result = res;
		if (index > 0)
			show(res);
	}
}

function clean_calc() {
	index = 0;
	arr = [];
	flag = false;
	document.getElementById("result").innerHTML = 0;
	document.getElementById("history").innerHTML = 0;
}
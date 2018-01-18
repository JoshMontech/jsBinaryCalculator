var zero = document.getElementById('btn0');
var one = document.getElementById('btn1');
var clr = document.getElementById('btnClr');
var sum = document.getElementById('btnSum');
var sub = document.getElementById('btnSub');
var mul = document.getElementById('btnMul');
var div = document.getElementById('btnDiv');
var eql = document.getElementById('btnEql');
var res = document.getElementById('res');

function addOperator (el, op) {
  el.addEventListener('click', function() {
    var elText = res.innerHTML;
    var lastChar = elText.length-1;

    if (
      lastChar > -1 &&
      elText[lastChar] != "+" &&
      elText[lastChar] != "-" &&
      elText[lastChar] != "*" &&
      elText[lastChar] != "/"
    ) {
      res.innerHTML += op;
    }
  });
}

addOperator(sum, "+");
addOperator(sub, "-");
addOperator(mul, "*");
addOperator(div, "/");


zero.addEventListener('click', function() {
    document.getElementById("res").innerHTML += "0";
});

one.addEventListener('click', function() {
    document.getElementById("res").innerHTML += "1";
});

clr.addEventListener('click', function() {
    document.getElementById("res").innerHTML = "";
});


eql.addEventListener('click', function() {
    var val = res.innerHTML;

    //remove extra operators
    if (
      val[val.length-1] == '*' ||
      val[val.length-1] == '/' ||
      val[val.length-1] == '+' ||
      val[val.length-1] == '-'
    ) {
      val = val.substring(0, val.length - 1);
    }

    //clear res
    res.innerHTML = "";

    var a;
    var b;

    console.log("loopStarted");
    //step 1, find multiplication and divisions first, left to right
    for (var i = 0; i < val.length; i++) {

      if (val[i] == '*') {
        // console.log("* found");
         var operands = getValuesForOp(val, i);
         var botIndex = i - operands[0].length;
         var topIndex = operands[1].length + i;

         var output = multiply(parseInt(operands[0],2), parseInt(operands[1],2));


         //find start by getting operand[0].length - i
         //find end by getting operand[1].length + i
         // console.log(operands);
         // console.log("op1 index: " + botIndex, "op2 index: " + topIndex);

        console.log("results after multiplying",val = val.slice(0, botIndex) + output + val.slice(topIndex+1, val.length));

         // console.log("what's left: " + val);
      }

       else if (val[i] == '/') {
        // console.log("* found");
        var operands = getValuesForOp(val, i);
        var botIndex = i - operands[0].length;
        var topIndex = operands[1].length + i;

         var output = divide(parseInt(operands[0],2), parseInt(operands[1],2));


         //find start by getting operand[0].length - i
         //find end by getting operand[1].length + i
         // console.log(operands);
         // console.log("op1 index: " + botIndex, "op2 index: " + topIndex);

        console.log("results after dividing",val = val.slice(0, botIndex) + output + val.slice(topIndex+1, val.length));

         // console.log("what's left: " + val);
      }
    }

    //step 2, do addition and subtraction next
    for (var i = 0; i < val.length; i++) {

      if (val[i] == '+') {
        // console.log("* found");
         var operands = getValuesForOp(val, i);
         var botIndex = i - operands[0].length;
         var topIndex = operands[1].length + i;

         var output = add(parseInt(operands[0],2), parseInt(operands[1],2));


         //find start by getting operand[0].length - i
         //find end by getting operand[1].length + i
         // console.log(operands);
         // console.log("op1 index: " + botIndex, "op2 index: " + topIndex);

        console.log("results after adding",val = val.slice(0, botIndex) + output + val.slice(topIndex+1, val.length));

         // console.log("what's left: " + val);
      }

      else if (val[i] == '-') {
        // console.log("* found");
         var operands = getValuesForOp(val, i);
         var botIndex = i - operands[0].length;
         var topIndex = operands[1].length + i;

         var output = subtract(parseInt(operands[0],2), parseInt(operands[1],2));


         //find start by getting operand[0].length - i
         //find end by getting operand[1].length + i
         // console.log(operands);
         // console.log("op1 index: " + botIndex, "op2 index: " + topIndex);

        console.log("total after subtracting",val = val.slice(0, botIndex) + output + val.slice(topIndex+1, val.length));

         // console.log("what's left: " + val);
      }
    }

    res.innerHTML = val;

});

function getValuesForOp(arr, i) {
  var a = "";
  var b = "";

  for (var j = i + 1; arr[j] == '0' || arr[j] == '1'; j++) {
    b += arr[j];
  }

  for (var k = i - 1; arr[k] == '0' || arr[k] == '1'; k--) {
    a = arr[k] + a;
  }
  return [a,b];


}

function multiply(a,b) {
  var result = a*b;
  console.log('multiplying ' +a+ ' * ' +b+ ' = ' + result);
  console.log('binary outcome: ' + result.toString(2))
  return result.toString(2);
}

function divide(a,b) {
  var result = a/b;
  console.log('dividing ' +a+ ' / ' +b+ ' = ' + result);
  console.log('binary outcome: ' + result.toString(2))
  return result.toString(2);
}

function add(a,b) {
  var result = Number(a)+Number(b);
  console.log('adding ' +a+ ' + ' +b+ ' = ' + result);
  console.log('binary outcome: ' + result.toString(2))
  return result.toString(2);
}

function subtract(a,b) {
  var result = a-b;
  console.log('subtracting ' +a+ ' - ' +b+ ' = ' + result);
  console.log('binary outcome: ' + result.toString(2))
  return result.toString(2);
}

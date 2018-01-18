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
      val = val.substring(0, str.length - 1);
    }

    //clear res
    res.innerHTML = "";

    var a;
    var b;

    console.log("loopStarted");
    //step 1, find multiplication and divisions first
    for (var i = 0; i < val.length; i++) {

      if (val[i] == '*') {
        // console.log("* found");
         var operands = getValuesForOp(val, i);

         var output = multiply(parseInt(operands[0],2), parseInt(operands[1],2));

         var botIndex = operands[0].length - i;
         var topIndex = operands[1].length + i;

         //find start by getting operand[0].length - i
         //find end by getting operand[1].length + i
         // console.log(operands);
         // console.log("op1 index: " + botIndex, "op2 index: " + topIndex);

        console.log("res after mult",val = val.slice(0, botIndex) + output + val.slice(topIndex+1, val.length));

         // console.log("what's left: " + val);
      }
    }

});

function getValuesForOp(arr, i) {
  var a = "";
  var b = "";

  for (var j = i + 1; arr[j] == '0' || arr[j] == '1'; j++) {
    b += arr[j];
  }

  for (var k = i - 1; arr[k] == '0' || arr[k] == '1'; k--) {
    a += arr[k];
  }

  return [a,b];

}

function multiply(a,b) {
  console.log("input", a, b);
  console.log("binary: " + (a*b).toString(2))
  return (a*b).toString(2);
}

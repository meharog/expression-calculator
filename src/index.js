function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprArr = [];
    let counterOpenBracket = 0;
    let counterCloseBracket = 0;
    let i = 0;
    while (i < expr.length) {
        let subExpr = expr.substring(i,)
        if (/\(|\)|\+|\-|\*|\//.test(subExpr[0])) {
            exprArr.push(subExpr[0]);
            i++;
            if (exprArr[exprArr.length-1]==='(') {counterOpenBracket++;};
            if (exprArr[exprArr.length-1]===')') {counterCloseBracket++;};
        } else if (/[0-9]/.test(subExpr[0])) {
            let num = /[0-9]+/.exec(subExpr)[0];
            exprArr.push(+num);
            i+=num.length;
        } else {
            i++;
        };
    };
    if (counterOpenBracket!==counterCloseBracket) {throw("ExpressionError: Brackets must be paired");}
    let stackNum = [];
    let stackOpr = [];
    const OPR = {
        '+': function(a, b) { return a + b; },
        '-': function(a, b) { return a - b; },
        '*': function(a, b) { return a * b; },
        '/': function(a, b) { return a / b; }
    };

    for (let i = 0; i < exprArr.length; i++) {
        if ((exprArr[i]==='+')||(exprArr[i]==='-')) {
            while ((stackOpr[stackOpr.length-1]==='+')||(stackOpr[stackOpr.length-1]==='-')||(stackOpr[stackOpr.length-1]==='*')||(stackOpr[stackOpr.length-1]==='/')) {
                let num = OPR[stackOpr.pop()](stackNum[stackNum.length-2], stackNum[stackNum.length-1]);
                stackNum.pop();
                stackNum.pop();
                stackNum.push(num);
                if (num===Infinity) {throw ("TypeError: Division by zero.")};
            };
            stackOpr.push(exprArr[i]);
        };
        if ((exprArr[i]==='*')||(exprArr[i]==='/')) {
            while ((stackOpr[stackOpr.length-1]==='*')||(stackOpr[stackOpr.length-1]==='/')) {
                let num = OPR[stackOpr.pop()](stackNum[stackNum.length-2], stackNum[stackNum.length-1]);
                stackNum.pop();
                stackNum.pop();
                stackNum.push(num);
                if (num===Infinity) {throw ("TypeError: Division by zero.")};
            };
            stackOpr.push(exprArr[i]);
        };
        if (exprArr[i]==='(') {
            stackOpr.push(exprArr[i]);
        };
        if (exprArr[i]===')') {
            while (stackOpr[stackOpr.length-1] !== '(') {
                let num = OPR[stackOpr.pop()](stackNum[stackNum.length-2], stackNum[stackNum.length-1]);
                stackNum.pop();
                stackNum.pop();
                stackNum.push(num);
                if (num===Infinity) {throw ("TypeError: Division by zero.")};
            };
            stackOpr.pop();
        };
        if (typeof(exprArr[i])==='number') {
            stackNum.push(exprArr[i]);
        };
    };
    while (stackOpr.length!==0) {
        let num = OPR[stackOpr.pop()](stackNum[stackNum.length-2], stackNum[stackNum.length-1]);
        stackNum.pop();
        stackNum.pop();
        stackNum.push(num);
        if (num===Infinity) {throw ("TypeError: Division by zero.")};
    };
    return stackNum[0];
};

module.exports = {
    expressionCalculator
};
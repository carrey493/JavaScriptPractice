//获取按钮注册事件
document.getElementById('btn').onclick = function () {
    var num1 = document.getElementById('num1').value;
    var num2 = document.getElementById('num2').value;
    var ysf = document.getElementById('ysf').value;

    var result = 'ERROR';
    var flag = true

    if (num1 === '') {
        result += '第一个运算符为空#'
        flag = false
    } else {
        num1 = parseFloat(num1)
        if (isNaN(num1)) {
            result += '第一个运算元不是有效的数字'
            flag = false
        }
    }

    if (num2 === '') {
        result += '第二个运算符为空#'
        flag = false
    } else {
        num2 = parseFloat(num2)
        if (isNaN(num2)) {
            result += '第二个运算元不是有效的数字'
            flag = false
        }
    }

    num1 = parseFloat(num1)
    num2 = parseFloat(num2)

    if (flag) {
        switch (ysf) {
            case '+':
                result = '运算结果' + num1 + '+' + num2 + '=' + (num1 + num2)
                break;
            case '-':
                result = '运算结果' + num1 + '-' + num2 + '=' + (num1 - num2)
                break;
            case '*':
                result = '运算结果' + num1 + '*' + num2 + '=' + (num1 * num2)
                break;
            case '/':
                if (num1 === 0) {
                    result = '除数不能为0'
                } else {
                    result = '运算结果' + num1 + '/' + num2 + '=' + (num1 / num2)
                }
                break;
            case '%':
                if (num2 === 0) {
                    result = '除数不能为0'
                } else {
                    result = '运算结果' + num1 + '%' + num2 + '=' + (num1 % num2)
                }

                break;
            default:
                break;
        }
    }


    document.getElementById('res').innerHTML = result

}  
const add = (num1, num2) => {
    let sum = [];
    let add1 = [];
    let add2 = [];
    const len1 = num1.length;
    const len2 = num2.length;
    for (let i = 0; i < len1; i++) {
        add1.push(+num1[len1 - i - 1]);
    }

    for(let i = 0; i< len2; i++) {
        add2.push(+num2[len2 - i - 1]);
    }
    let maxLen = len1 > len2 ? len1 : len2;
    let p = 0;
    for(let i = 0; i < maxLen; i++) {
        sum[i] = (add1[i] || 0) + (add2[i] || 0) + p;
        if(sum[i] > 9) {
            sum[i] %= 10;
            p = 1;
        } else {
            p = 0;
        }
    }

    if(p == 1) {
        sum[maxLen++] = 1;
    }

    const ans = sum.reverse().join('');
    console.log(ans);

    return ans;
}

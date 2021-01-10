const Foo = (n) => {
    let arr = []
    for(let i = 0; i < n; i++) {
        arr.push(i);
    }

    for(let i = 0; i < n; i++) {
        const ran = Math.floor(Math.random() * n);
        
        const temp = arr[i];
        arr[i] = arr[ran];
        arr[ran] = temp;
    }

    arr.forEach(v => console.log(v));
}

import React, { useState } from 'react'

let a = 0;

const Demo = () => {

    const [count, setCount] = useState(0)

    return (
        <div onClick={() => {
            a = a+1;
            // setCount(count + 1);
        }}>
            当前点击次数：{count}
        </div>
    )
}

export default Demo
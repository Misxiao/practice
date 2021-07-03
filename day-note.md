# HTML

### 1.get和post的区别

通常意义上的区别：
- Get参数在url上面，post在请求体中
- Get会被浏览器主动缓存，post不会
- Get参数只能使用url编码，post包体可以多种编码
- Get不会引起跨区
- Get参数又长度限制
- Get发送一个TCP包，post发送两个，分成header和body分别发送

实际上 get和Post都是tcp链接，无本质区别，长度限制也是由浏览器和web服务器限制，发送几个包体也是由框架及代码决定，chrome中的js框架基本都以一个包体发送。

-------

### 2.get请求限制

http协议未定义get/post请求体长度，请求长度是由浏览器或web服务器限制，
ie：2083byte		chrome：8182byte

---

# JS原理

### 1.闭包

闭包就是能读取其他函数内部变量的函数，如被返回的子函数，使用了父函数的内部变量，并且此时，父函数的作用域无法被释放。

作用： 缓存、私用变量、公共变量

```javascript
//缓存示例
const memorize = function(fn) {
const cache = {}       // 存储缓存数据的对象
return function(...args) {        // 这里用到数组的扩展运算符
        const _args = JSON.stringify(args)    // 将参数作为cache的key
        return cache[_args] || (cache[_args] = fn.apply(fn, args))  // 如果已经缓存过，直接取值。否则重新计算并且缓存
    }
}
```
---

### 2.事件流（事件模型）

事件模型分为三个阶段
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段
addEventListener: (eventName, eventFunction, mode = false)
函数第三个参数 false表示在冒泡阶段执行， true表示在捕获阶段执行

事件代理（事件委托）：  利用事件冒泡机制，在父节点上添加事件监听，可以减少事件监听绑定，可以对动态添加的子节点进行监听

---

### 3.图片优化方式

- 图片懒加载
减少图片的请求，只有在用户浏览到该页面时，发起图片请求。
- 图片预加载
提前发出图片请求, 当用户查看图片时，可以直接通过缓存读取。
- 渐进式加载图片
   - 在节点中嵌入一个和原图一样大小的canvas，和一个不显示的img，img用来加载一张很小的缩略图
   - 监听img的onload事件，因为小所以加载快速，再通过高斯模糊方式绘制到canvas中
   - 检测到元素出现在可视窗口中时，开始加载正常图片
   - 加载完成后放入img中，应用canvas的fadeOut效果逐渐露出原图
   - 结束后隐藏canvas

---

### 4.mouseover 和 mouseenter 的区别

- mouseover 在移入本元素和子元素都会触发，有冒泡过程，对应mouseout
- mouseenter 只有在移入本元素时会触发，对应mouseleave
---

### 5.JS 的各种位置

- clientHeight: 元素内部高度，元素content高度 + padding高度
- offsetHeight: 元素边线内部高度， 元素content高度 + padding高度 + border高度
- scrollHeight: 元素可滚动高度， 子元素高度之和 + 自身padding高度， 不包含border
- clientTop:    元素上边框border高度
- offsetTop:    元素content开始到父元素上边线的高度差，包含父元素border高度
- scrollTop:    元素内部滚动高度
- outerHeight:  windows属性，浏览器高度，包含浏览器菜单栏、工具栏等的高度总和
- innerHeight:  windows属性，浏览器内部窗口高度

---

### 6.异步加载js文件

在浏览器解析html文档时，如遇到未包含defer或async属性的script标签，会立刻下载对应文件，并解析执行该文件，同时会阻塞html的渲染。

defer/async

- 共同点：
    - 都会异步进行加载文件，不阻塞文档元素的渲染
- 不同点：
    - async 在加载完后立即执行，defer 会等待页面所有元素加载完毕，DOMContentLoaded事件触发前执行
    - defer 会按照加载顺序执行，async 会乱序执行，只要js加完就执行, 如有js文件依赖，有可能会有问题
    - async 是html5新的定义，defer由html4.0定义
    - async 和 defer 都存在时，会忽略defer，除非浏览器不支持async

除defer/async外 还可通过js代码，异步创建script标签，实现异步加载js

除上述两种外，还可通过html5标准属性：`type="module"` 实现文件异步加载，执行时机和defer类似，配合async可在加载完后立即执行。

所有方式的执行都依旧会阻塞页面元素的渲染进程。

---

### 7.防抖和节流

- 防抖： 当有多次连续的事件被触发时，只响应最后一次事件，如输入框输入内容时，只有在用户停止输入一段时间后才触发onchange事件
- 节流： 规定在某一段时间内，最多只能触发一次事件的响应，如监听用户滚动时，一段时间内只触发一次滚动响应，和防抖的区别是，不需要一定等户停止滚动后才响应

---

### 8.js中的垃圾回收机制





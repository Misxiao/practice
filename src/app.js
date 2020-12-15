import React from 'react';
import ReactDom from 'react-dom'
import A from './a';
import HookDemo from './hook-demo/myhook'


const App = () => {
    console.log('render app');
    return (
        <div>
            hello world
            <A/>
            <HookDemo />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept(() => {
        ReactDom.render(
            <App />,
            document.getElementById('app')
        )
    })
}
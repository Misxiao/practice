import React from 'react';
import ReactDOM from 'react-dom'


const App: React.FC<{}> = () => {
    return (
        <div>
            hello world11111
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));


if (module.hot) {
    module.hot.accept(() => {
        ReactDOM.render(
            <App />,
            document.getElementById('app')
        )
    })
}

console.log(2222)
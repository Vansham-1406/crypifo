import React from "react";
import ReactHtmlParser from "react-html-parser";

const html = `<h1>Transform Example</h1>

<span>span elements are banned and won't be included in the output</span>

<ul>
  <li>This unordered list has been transformed</li>
  <li>into an ordered list</li>
</ul>

<p>
  React components can be returned directly.
  <b>This bold tag will be replaced directly with manually specified React element</b>
</p>

<button type="button">this is button</button>

<p>
  Attributes can also be modified.
  All links like <a href="https://facebook.github.io/react/">this one</a>
  and <a href="https://github.com/wrakky/react-html-parser">this one</a>
  will automatically have the <code>target="_blank"</code> attribute added to them.
</p>

`;

const test = () => {
    return (
        <div className="App">{ReactHtmlParser(html)}</div>
    )
  }
  
  export default test


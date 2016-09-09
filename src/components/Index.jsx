import React from 'react';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';

const Index = ({children}) => {
  return (
    <div>
      {children}
      <a className="github-fork-ribbon" href="https://github.com/RyanFuentes/Peg-Game" title="Fork me on GitHub">Fork me on GitHub</a>
    </div>
  );
}

export default Index;

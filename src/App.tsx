import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./StructureApp/Header/Header";
import {SectionPreview} from "./StructureApp/MainContent/SectionPreviw/SectionPreview";
import {MainContent} from "./StructureApp/MainContent/SectionMain/MainContent";

function App() {
  return (
    <div className="App">
      <Header  />
      <MainContent />
    </div>
  )}

export default App;

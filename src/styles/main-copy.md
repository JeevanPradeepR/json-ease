/* @import './basicstyle.css';
@import './download.css';
@import './format.css';
@import './header.css';
@import './options.css';
@import './table.css';
@import './validate.css'; */

/* @import './io-layout/output-layout.css';
@import './io-layout/input-layout.css';
@import './io-layout/options-layout.css';

@import './body/main-layout.css';

@import './views/validate-view.css';
@import './views/format-view.css';
@import './views/table-view.css';
@import './views/singleline-view.css';
@import './views/tree-view.css'; */
@import './header/header.css';

/* Global Styles */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f0f0f0;
  }
  button, select {
    width:15vw;
  }
  /* Main Section Styles */
  
  .main-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    text-align: left;
    background-color: #6495ED;
    
  }
  
  .input-section {
    flex: 2;
    margin: 20px;
    padding: 20px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 80vh;

  }

  
  .output-section {
    flex: 3;
    margin: 20px;
    padding: 20px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 80vh;

  }
  
  .option-section {
    flex: 1;
    margin: 20px;
    padding: 20px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .option-section .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .option-section button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  .option-section> .buttons > button {
    display: flex;
  }
  
  /* Responsive Styles */
  
  @media (max-width: 1200px) {
    .main-section {
      flex-direction: row;
    }
    
    .input-section {
      flex: 1;
    }
    
    .output-section {
      flex: 2;
    }
    
    .option-section {
      flex: 1;
    }
  }
  
  @media (max-width: 900px) {
    .main-section {
      flex-direction: column;
    }
    
    .input-section {
      flex: 1;
      margin: 20px 0;
    }
    
    .output-section {
      flex: 1;
      margin: 20px 0;
    }
    
    .option-section {
      flex: 1;
      margin: 20px 0;
    }
  }
  
  @media (max-width: 600px) {
    .option-section .buttons {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .option-section button, select {
      margin: 10px 0;
      font-size: 10px;
      text-align: center;

    }

  }
  /* Input Area Styles */

.input-area {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    resize: none;
  }
  
  
  /* Responsive Styles */
  
  @media (max-width: 1200px) {
    .input-area {
      height: 150px;
    }
  }
  
  @media (max-width: 900px) {
    .input-area {
      height: 100px;
    }
  }
  
  @media (max-width: 600px) {
    .input-area {
      height: 80px;
    }
  }
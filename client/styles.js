import {css} from 'lit-element';

export default css`
  .app {
    background: linear-gradient(to bottom, #b7eaff 0%, #bff7ff 100%);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    padding: 0;
    width: 100%;
  }

  .activity, .value {
    background-color: #f6f6f6;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    border-radius: 4px;
  }

  .activity:hover {
    background-color: #eee;
  }

  .remove-button {
    color: darkred;
    border-radius: 50%;
    border: none;
    height: 30px;
    width: 30px;
  }

  .score {
    color: forestgreen;
    border-radius: 50%;
    border: none;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    transition: background-color 1s ease-in-out;
  }

  .score.increase {
    color: white;
    background-color: forestgreen;
  }

  .remove-button:hover, .remove-button:focus {
    background-color: darkred;
    color: white;
  }

  .activity-name {
    margin-left: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  .activity-name:hover .checkmark {
    background-color: forestgreen;
    color: white;
  }

  .checkmark {
    background-color: white;
    color: forestgreen;
    border-radius: 50%;
    border: 2px solid forestgreen;
    height: 20px;
    width: 20px;
    margin-right: 6px;
    text-align: center;
  }

  svg {
    visibility: hidden;
  }

  .tree {
    max-width: 400px;
    min-height: 400px;
    flex: 0 0 auto;
  }
`;
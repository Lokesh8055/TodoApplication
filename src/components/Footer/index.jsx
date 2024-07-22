import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import './footer.css';

const Footer = () => {
  const { itemsLeft, FILTER_LIST } = useTodoContext();
  const [activeItem, setActiveItem] = useState(null);
  const [activeCompleted, setActiveCompleted] = useState(false);

  // Function to set the active item
  const handleSetActiveTodo = (id) => {
    setActiveCompleted(false);
    setActiveItem(id);
  };

  const handleClearCompleted = () => {
    console.log('clear completed');
    setActiveItem(null);
    setActiveCompleted(true);
  };

  const showList = (className) => {
    return (
      <ul className={className}>
        {FILTER_LIST.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleSetActiveTodo(item.id);
              item.onClick();
            }}
            className={`listItem ${
              item.id === activeItem ? 'active' : ''
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="footer">
        <p>{itemsLeft} items left</p>
        {showList('listDesktop')}
        <p
          className={`clear ${activeCompleted ? 'active' : ''}`}
          onClick={handleClearCompleted}
        >
          Clear Completed
        </p>
      </div>
      {showList('listMobile')}
    </>
  );
};

export default Footer;

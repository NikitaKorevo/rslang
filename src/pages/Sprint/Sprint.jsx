import React from 'react';
import {useLocation} from 'react-router-dom';
import { SprintStart } from '../../components/Sprint/SprintStart';
import {Redirect} from 'react-router-dom';
import RootStore from '../../store/rootStore';
import './Sprint.css';

function Sprint(props) {
  let location = useLocation();
  let fromTextBook = false;
  let group;
  let page;

  if (location.hash === '#fromTextbook') {
      fromTextBook = true;
      group = localStorage.getItem('textbookGroup');
      page = localStorage.getItem('currentPage');
    }
console.log(group);
console.log(page);
return ( <div className="sprint">
          {
            fromTextBook ? <SprintStart page={page} group={group} /> :
            <SprintStart />
          }
           </div>
        );
}

export default Sprint;

import React from 'react';
import { Pagination } from 'react-bootstrap';
import s from '../../pages/Textbook/Textbook.module.scss';
import store from '../../store/store';
import CONSTANTS from '../../constants/constants';

const PaginationBar = ({ loadWords }) => (
  <div className={s.pagination}>
    <Pagination>
      <Pagination.First
        onClick={async () => {
          store.setFirstPage();
          await loadWords();
        }}
        className={store.currentTextbookPage === CONSTANTS.firstTextBookPage ? 'disabled' : null}
      />
      <Pagination.Prev
        onClick={async () => {
          store.setPrevPage();
          await loadWords();
        }}
        className={store.currentTextbookPage === CONSTANTS.firstTextBookPage ? 'disabled' : null}
      />
      <Pagination.Item>{store.currentTextbookPage + 1}</Pagination.Item>
      <Pagination.Next
        onClick={async () => {
          store.setNextPage();
          await loadWords();
        }}
        className={store.currentTextbookPage === CONSTANTS.textBookPagesAmount ? 'disabled' : null}
      />
      <Pagination.Last
        onClick={async () => {
          store.setLastPage();
          await loadWords();
        }}
        className={store.currentTextbookPage === CONSTANTS.textBookPagesAmount ? 'disabled' : null}
      />
    </Pagination>
  </div>
);
export default PaginationBar;

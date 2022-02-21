import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import s from './Paginationbar.module.scss';
import CONSTANTS from '../../../constants/constants';
import { Context } from '../../../index';

const PaginationBar = ({ loadWords }) => {
  const { rootStore } = useContext(Context);

  return (
    <div className={s.pagination}>
      <Pagination>
        <Pagination.First
          onClick={async () => {
            rootStore.textbookStore.setFirstPage();
            await loadWords();
          }}
          className={
            Number(localStorage.getItem('currentPage')) === CONSTANTS.firstTextBookPage
              ? 'disabled'
              : null
          }
        />
        <Pagination.Prev
          onClick={async () => {
            rootStore.textbookStore.setPrevPage();
            await loadWords();
          }}
          className={
            Number(localStorage.getItem('currentPage')) === CONSTANTS.firstTextBookPage
              ? 'disabled'
              : null
          }
        />
        <Pagination.Item className={s.currentPage}>
          {Number(localStorage.getItem('textbookGroup')) === 6
            ? 1
            : Number(localStorage.getItem('currentPage')) + 1}
        </Pagination.Item>
        <Pagination.Next
          onClick={async () => {
            rootStore.textbookStore.setNextPage();
            await loadWords();
          }}
          className={
            Number(localStorage.getItem('currentPage')) === CONSTANTS.textBookPagesAmount ||
            Number(localStorage.getItem('textbookGroup')) === 6
              ? 'disabled'
              : null
          }
        />
        <Pagination.Last
          onClick={async () => {
            rootStore.textbookStore.setLastPage();
            await loadWords();
          }}
          className={
            Number(localStorage.getItem('currentPage')) === CONSTANTS.textBookPagesAmount ||
            Number(localStorage.getItem('textbookGroup')) === 6
              ? 'disabled'
              : null
          }
        />
      </Pagination>
    </div>
  );
};
export default PaginationBar;

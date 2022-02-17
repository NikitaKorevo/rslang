import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import s from '../../pages/Textbook/Textbook.module.scss';
import CONSTANTS from '../../constants/constants';
import { Context } from '../../index';

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
            rootStore.textbookStore.currentTextbookPage === CONSTANTS.firstTextBookPage
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
            rootStore.textbookStore.currentTextbookPage === CONSTANTS.firstTextBookPage
              ? 'disabled'
              : null
          }
        />
        <Pagination.Item>{rootStore.textbookStore.currentTextbookPage + 1}</Pagination.Item>
        <Pagination.Next
          onClick={async () => {
            rootStore.textbookStore.setNextPage();
            await loadWords();
          }}
          className={
            rootStore.textbookStore.currentTextbookPage === CONSTANTS.textBookPagesAmount
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
            rootStore.textbookStore.currentTextbookPage === CONSTANTS.textBookPagesAmount
              ? 'disabled'
              : null
          }
        />
      </Pagination>
    </div>
  );
};
export default PaginationBar;

import React from 'react';
import { isMessageValid } from '../../helpers/message';
import { ORDER_BY } from '../../queries';
import '../../styles/chat/MessagesFilter.css';

function MessagesFilter(props) {
  function orderByHandler(event) {
    props.orderByHandler(event.target.value);
  }

  function filterHandler(event) {
    if (isMessageValid(event.target.value)) {
      props.filterHandler(event.target.value.trim());
    } else {
      props.filterHandler(ORDER_BY.createdAt_ASC);
    }
  }

  return (
    <div className="messages-filter">
      <input
        type="text"
        onChange={filterHandler}
        placeholder="Search"
        className="messages-filter__input"
      />
      <select
        defaultValue={ORDER_BY.createdAt_ASC}
        onChange={orderByHandler}
        className="messages-filter__select"
      >
        <option value={ORDER_BY.createdAt_ASC}>
          Sent time (Ascending)
        </option>
        <option value={ORDER_BY.createdAt_DESC}>
          Sent time (Decending)
        </option>
        <option value={ORDER_BY.likesNumber_ASC}>
          Likes (Ascending)
        </option>
        <option value={ORDER_BY.likesNumber_DESC}>
          Likes (Decending)
        </option>
        <option value={ORDER_BY.dislikesNumber_ASC}>
          Dislikes (Ascending)
        </option>
        <option value={ORDER_BY.dislikesNumber_DESC}>
          Dislikes (Decending)
        </option>
      </select>
    </div>
  );
}

export default MessagesFilter;

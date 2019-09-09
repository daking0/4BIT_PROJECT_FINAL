/**
 * Homework Action
 * @author: 영빈
 */

import { ActionTypes } from '../utils/ActionTypeList';

// Create Homework
// Endpoint: http://localhost:8080/class/assignment/write
const CreateHomework = (title, content, deadline, subject) => {
  return ({
    type: ActionTypes.CREATE_HOMEWORK,
    payload: {
      request: {
        method: 'POST',
        url: `/class/assignment/write`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ 
          hwName: title, 
          hwDescription: content,
          hwDeadLine: deadline,
          hwSubject: subject
         })
      }
    }
  });
};

// List Of Homework
// Endpoint: http://localhost:8080/class/assignment/list
const ListOfHomework = (page = 1, size = 10) => {
  return ({
    type: ActionTypes.LISTOF_HOMEWORK,
    payload: {
      request: {
        method: 'POST',
        url: `/class/assignment/list`
      }
    }
  });
};

// List Of Ended Homework
// Endpoint: http://localhost:8080/class/assignment/listended
const ListOfEndedHomework = (page = 1, size = 10) => {
  return ({
    type: ActionTypes.LISTOF_ENDEDHOMEWORK,
    payload: {
      request: {
        method: 'POST',
        url: `/class/assignment/listended`
      }
    }
  });
};


// Retrieve Homework
const RetrieveHomework = (hwId) => {
  return ({
    type: ActionTypes.RETRIEVE_HOMEWORK,
    payload: {
      request: {
        method: 'GET',
        url: `/class/assignment/view?hwno=${hwId}`
        // headers: {
        //   'Content-Type': 'application/json; charset: utf-8'
        // }
      }
    }
  });
};

// Update Homework
const UpdateHomework = (hwId, title, content) => {
  return ({
    type: ActionTypes.UPDATE_HOMEWORK,
    payload: {
      request: {
        method: 'PATCH',
        url: `/class/assignment/view?hwno=${hwId}`,
        headers: {
          'Content-Type': 'application/json; charset: utf-8'
        },
        data: JSON.stringify({ hwName: title, hwDescription: content })
      }
    }
  })
}

// Delete Homework
const DeleteHomework = (hwId) => {
  return ({
    type: ActionTypes.DELETE_HOMEWORK,
    payload: {
      request: {
        method: 'DELETE',
        url: `/class/assignment/view?hwno=${hwId}`
      }
    }
  });
};

export const HomeworkActions = {
  CreateHomework,
  ListOfHomework,
  ListOfEndedHomework,
  RetrieveHomework,
  UpdateHomework,
  DeleteHomework
};
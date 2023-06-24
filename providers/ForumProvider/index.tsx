import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { ForumsReducer } from './reducer';
import { INITIAL_STATE, IForums, ForumActionContext, ForumContext } from './context';
import { getForumsRequestAction, deleteForumRequestAction, createForumsRequestAction } from './actions';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';

const ForumsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(ForumsReducer, INITIAL_STATE);

  const { data: forumsData, refetch: getForumsHttp } = useGet({
    path: 'Forum/GetAll',
  });
  const { mutate: createForumHttp } = useMutate({
    path: '/Forum/Create',
    verb: 'POST',
  });

  useEffect(() => {
    if (forumsData) {
      dispatch(getForumsRequestAction(forumsData.result));
    }
  }, [forumsData]);

  const getForum = () => getForumsHttp();

  
  const createForum = async (payload: IForums) => {
    console.log("payload:", payload);
    try {
      const response = await createForumHttp(payload);
      console.log("response:", response);
      if (response.success) {
        message.success("Comment successfully created");
        dispatch(createForumsRequestAction(response.result));
        getForum();
      } else {
        message.error("Failed to create forum");
      }
    } catch (error) {
      console.error("Forum creation error:", error);
      message.error("An error occurred during forum creation");
    }
  };

  const deleteForum = async (forumId: string) => {
    await fetch(`https://localhost:44311/api/services/app/Forum/Delete?Id=${forumId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        dispatch(deleteForumRequestAction(forumId));
        getForum();
        message.success('Forum deleted successfully.');
      });
    });
  };


  return (
    <ForumContext.Provider value={state}>
      <ForumActionContext.Provider
        value={{
          getForum,
          createForum,
          deleteForum,
        }}
      >
        {children}
      </ForumActionContext.Provider>
    </ForumContext.Provider>
  );
};

function useForumsState() {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForumsState must be used within a ForumsProvider');
  }
  return context;
}

function useForumsActions() {
  const context = useContext(ForumActionContext);
  if (!context) {
    throw new Error('useForumsActions must be used within a ForumsProvider');
  }
  return context;
}

function useForums() {
  return {
    ...useForumsActions(),
    ...useForumsState(),
  };
}

export { ForumsProvider, useForums };

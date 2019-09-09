class StateLoader {

    loadState() {
      //로컬 영역에서 꺼낸다
       try {
        let state = localStorage.getItem("http://localhost:8080/state");
        if (state !== undefined && state !== null) {
          return JSON.parse(state);
        }
      } catch (error) {
        console.log('error', error)
      }
      return this.initialState();
    }
  
    saveState(state) {
      //로컬 영역에 저장한
      try {
        let json = JSON.stringify(state);
        localStorage.setItem("http://localhost:8080/state", json);
      } catch (error) {
        console.log('error', error)
      }
    }
  
    initialState() {
      return {
        auth: {
          retryCount: 0,
          token: null,
          userDetails: null
        },
        boardreducers : {
          items: [],
          page: 1,
          size: 10,
          totalCount: 0
        }
      };
    }
  }
  
  export default StateLoader;
  
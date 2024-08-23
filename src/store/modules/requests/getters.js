export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    const filteredRequests = state.requests.filter(
      (request) => request.coachId === coachId
    );
    // console.log(filteredRequests);
    return filteredRequests;
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};

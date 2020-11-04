import { useState } from "react";
import axios from "axios";

const useLazyFetch = ({
  url,
  method,
  headers = {},
  queries = {},
  onSuccess = () => {},
  onError = () => {}
}) => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null
  });
  const clearData = () => {
    setState({ ...state, data: null });
  };

  const fetch = body => {
    setState({ loading: true, data: null, error: null });
    if (method === "get") {
      axios
        .get(url, { params: queries, headers })
        .then(res => {
          setState({ loading: false, data: res.data, error: null });
          onSuccess();
        })
        .catch(err => {
          setState({ loading: false, data: null, error: err });
          onError();
        });
    } else {
      axios[method](url, { ...body }, { params: queries, headers })
        .then(res => {
          setState({ loading: false, data: res.data, error: null });
          onSuccess();
        })
        .catch(err => {
          setState({ loading: false, data: null, error: err });
          onError();
        });
    }
  };

  const { loading, data, error } = state;
  return { loading, data, error, fetch, clearData };
};

export default useLazyFetch;

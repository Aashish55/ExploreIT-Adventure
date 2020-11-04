import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ({
  url,
  method,
  headers = {},
  queries = {},
  body = {},
  onSuccess = () => {},
  onError = () => {}
}) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });
  useEffect(() => {
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
  }, []);

  const { data, loading, error } = state;

  return { loading, data, error };
};

export default useFetch;

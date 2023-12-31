import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data });
  
      router('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: AUTH, data });
  
      router('/');
    } catch (error) {
      console.log(error);
    }
  };
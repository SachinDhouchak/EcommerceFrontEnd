import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, getUserData, registerUser } from '../api/auth'; // Import your registerUser API function

interface User {
  id: string;
  email: string;
  username: string;
  role: string | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Create an async thunk to register a new user
export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string; username: string; password: string }) => {
    const response = await registerUser(userData);  // Call the register API
    return response.data;  // Assuming the API returns user data after successful registration
  }
);

// Create an async thunk to login a user
export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await loginUser(credentials);  // Call login API
    return response.data;  // Assuming the API returns user data
  }
);

// Create an async thunk to logout the user
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async () => {
  await logoutUser();  // Call logout API
  return {};  // Return an empty object after successful logout
});

// Create an async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'auth/getUserData',
  async (userId: string) => {
    const response = await getUserData(userId);  // Call API to fetch user data
    return response.data;  // Assuming the API returns user data
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Set user data after successful registration
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

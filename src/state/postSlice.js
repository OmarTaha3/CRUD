import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, post: [] };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json ; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json ; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPost : (state) =>{state.post = []}
  },
  extraReducers: (builder) => {
    //fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload; // state.records.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get a post
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.post = [];
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //create post
      .addCase(insertPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPost.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Edit post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearPost} = postSlice.actions
export default postSlice.reducer;

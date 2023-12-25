import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
    channels: [],
    currentChannelId: 1,
}

const channels = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        channelsFethced: (state, action) => {
            state.channels = action.payload;
        },
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload;
        },
        addChannel: (state, action) => {
            state.channels.push(action.payload);
        },
        removeChannel: (state, action) => {
            state.channels.filter((channel) => channel.id !== action.payload)
        },
        renameChannel: (state, action) => {
            const { id, name } = action.payload;
            state.channels = state.channels.map((channel) => {
                return channel.id === id ? ({ ...channel, name: name }) : channel
            })
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                const { channels, currentChannelId } = action.payload;
                state.channels = channels;
                state.currentChannelId = currentChannelId;
            })
    }
})

export default channels.reducer;
export const {
    channelsFethced,
    setCurrentChannelId,
    addChannel,
    removeChannel,
    renameChannel } = channels.actions;
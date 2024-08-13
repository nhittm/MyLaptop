import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: "cart",
    initialState: { listSP: [], },// cau truc listSP se nhu yeu cau o tren
    reducers: {
        themSP: (state, params) => {
            let sp = params.payload;// tham so la sp={'id':1, 'ten_sp'=>'A'}
            let index = state.listSP.findIndex(s => s.id === sp.id);
            if (index===-1) {// chua co sp trong gio hang
                sp['so_luong'] = 1;
                state.listSP.push(sp);
            }
            else state.listSP[index]['so_luong']++;
            console.log("Thêm sp thành công. Số SP=", state.listSP.length)
        },
        suaSL: (state, params) => {
            let id = params.payload[0];
            let so_luong = params.payload[1];
            let index = state.listSP.findIndex(s => s.id === id);
            if (index!==-1) state.listSP[index].so_luong = Number(so_luong);
        },
        xoaSP: (state, params) => {
            let id = params.payload;
            let index = state.listSP.findIndex(s => s.id === id);
            if (index!==-1) state.listSP.splice(index, 1);
        },
        xoaGH: (state) => { state.listSP = []; },
    },//reducers
});
export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;
export default cartSlice.reducer;
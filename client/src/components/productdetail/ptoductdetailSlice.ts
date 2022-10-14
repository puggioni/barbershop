import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import data from "../../mockdata"

export interface ProductdetailState {
    name: string;
    precio: number;
    rating: number;
    imagen?: string;
    description: string
}

const initialState: ProductdetailState = {
    name: "",
    precio: 0,
    rating: 0,
    imagen: "",
    description: ""
}

export const productdetailSlice = createSlice({
  name: 'productdetail',
  initialState,
  reducers: {
    getProductDetail:(state, action:PayloadAction<string>)=>{
        console.log('Acá se haría el fetch al back para conseguir el detalle del producto; '+action.payload)
        
        if(typeof(data.find(element=>element.name===action.payload))==="object"){
          console.log(typeof( data.find(element=>element.name===action.payload)))
          const aux = data.find(element=>element.name===action.payload)
          if(typeof aux==="object")Object.assign(state,aux)
          console.log(aux);
        }
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { getProductDetail} = productdetailSlice.actions

export default productdetailSlice.reducer
import { LoadMoreBtn } from "./Button.styled"

export const Button = ({onLoadMoreBtn}) =>{
    return <LoadMoreBtn onClick={()=>onLoadMoreBtn()}>Load more</LoadMoreBtn>
}
